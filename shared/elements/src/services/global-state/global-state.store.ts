import { Injectable, inject } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { ToastMessage } from "../../components";
import {
    AuthService,
    LoginResponse,
    LogoutResponse,
    UserProfile,
} from "@web-app/shared/api";
import { EMPTY, Observable, catchError, finalize, switchMap, tap } from "rxjs";
import { Router } from "@angular/router";

export interface GlobalState {
    toastMessage?: ToastMessage;
    userProfile?: UserProfile;
    loading: boolean;
    status: "login" | "logout" | "error";
}

@Injectable({
    providedIn: "root",
})
export class GlobalStateStore extends ComponentStore<GlobalState> {
    readonly router: Router = inject(Router);
    readonly status$ = this.select((state) => state.status);
    readonly loading$ = this.select((state) => state.loading);
    readonly userProfile$ = this.select((state) => state.userProfile);

    constructor(private readonly authService: AuthService) {
        const userProfile = {
            _id: localStorage.getItem("_id") as string,
            email: localStorage.getItem("email") as string,
            username: localStorage.getItem("username") as string,
        };
        super({
            status: inject(AuthService).isAuthenticated() ? "login" : "logout",
            loading: false,
            userProfile:
                userProfile._id && userProfile.email && userProfile.username
                    ? userProfile
                    : undefined,
        });
    }

    // update toast message
    updateToastMessage = this.updater((state, toastMessage?: ToastMessage) => ({
        ...state,
        toastMessage,
    }));

    //update user profile
    updateUserProfile = this.updater(
        (state, userProfile?: UserProfile | undefined) => ({
            ...state,
            userProfile,
        }),
    );

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

                        localStorage.clear();
                        this.updateToastMessage({
                            message: "Logout successful!",
                            type: "success",
                        });
                        this.updateUserProfile(undefined);
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
                        this.router.navigate(["/dashboard"]);
                        this.patchState({ loading: false });
                    }),
                );
            }),
        );
    });
}
