import { Injectable, inject } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { ToastMessage } from "../../components";
import {
    AuthService,
    LoginResponse,
    LogoutResponse,
} from "@web-app/shared/api";
import { EMPTY, Observable, catchError, finalize, switchMap, tap } from "rxjs";

export interface GlobalState {
    toastMessage?: ToastMessage;
    loading: boolean;
    status: "login" | "logout" | "error";
}

@Injectable({
    providedIn: "root",
})
export class GlobalStateStore extends ComponentStore<GlobalState> {
    readonly status$ = this.select((state) => state.status);
    readonly loading$ = this.select((state) => state.loading);

    constructor(private readonly authService: AuthService) {
        super({
            status: inject(AuthService).isAuthenticated() ? "login" : "logout",
            loading: false,
        });
    }

    // update toast message
    updateToastMessage = this.updater((state, toastMessage?: ToastMessage) => ({
        ...state,
        toastMessage,
    }));

    // clear toast message
    clearToastMessage = this.updater((state) => ({
        ...state,
        toastMessage: undefined,
    }));

    // update toast message, and after 3 seconds, clear it
    updateToastMessageWithTimeout = this.updater(
        (state, toastMessage: ToastMessage) => {
            this.updateToastMessage(toastMessage);
            setTimeout(() => {
                this.clearToastMessage();
            }, 3000);
            return state;
        },
    );

    logout = this.effect((action: Observable<void>) => {
        return action.pipe(
            switchMap(() => {
                this.patchState({ loading: true });
                return this.authService.logout().pipe(
                    tap((LogoutResponse: LogoutResponse) => {
                        if (LogoutResponse.deletedCount === 0)
                            throw new Error("Logout failed");
                        const placeholder: LoginResponse = {
                            accessToken: "",
                            refreshToken: "",
                        };
                        Object.keys(placeholder).forEach((key: string) => {
                            localStorage.removeItem(key);
                        });
                        this.updateToastMessage({
                            message: "Logout successful!",
                            type: "success",
                        });
                        this.patchState({ status: "logout" });
                    }),
                    catchError((error) => {
                        this.updateToastMessage({
                            message: error.message || "Logout failed",
                            type: "error",
                        });
                        this.patchState({ status: "error" });
                        return EMPTY;
                    }),
                    finalize(() => {
                        this.patchState({ loading: false });
                    }),
                );
            }),
        );
    });
}
