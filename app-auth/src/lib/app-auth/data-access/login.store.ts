import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { ComponentStore } from "@ngrx/component-store";
import {
    AuthService,
    LoginRequest,
    LoginResponse,
    RegisterRequest,
    UserProfile,
} from "@web-app/shared/api";
import { GlobalStateStore } from "@web-app/shared/elements";
import { EMPTY, Observable, catchError, finalize, switchMap, tap } from "rxjs";

export interface LoginState {
    loginParams: LoginRequest;
    registerParams: RegisterRequest;
}

@Injectable()
export class LoginStore extends ComponentStore<LoginState> {
    readonly selectLoginParams = this.select((state) => state.loginParams);
    readonly selectRegisterParams = this.select(
        (state) => state.registerParams,
    );

    constructor(
        private readonly authService: AuthService,
        private readonly globalStore: GlobalStateStore,
        private readonly router: Router,
    ) {
        super({
            loginParams: {
                email: "",
                password: "",
            },
            registerParams: {
                email: "",
                password: "",
                username: "",
            },
        });
    }

    readonly updateLoginParameters = this.updater(
        (state: LoginState, loginParams: LoginRequest) => {
            return {
                ...state,
                loginParams,
            };
        },
    );

    readonly updateRegisterParameters = this.updater(
        (state: LoginState, registerParams: RegisterRequest) => {
            return {
                ...state,
                registerParams,
            };
        },
    );

    readonly login = this.effect((loginParam$: Observable<LoginRequest>) => {
        return loginParam$.pipe(
            switchMap((loginParams) => {
                this.globalStore.patchState({ loading: true });
                return this.authService.login(loginParams).pipe(
                    tap((res: LoginResponse) => {
                        Object.keys(res.userProfile).forEach((key: string) => {
                            localStorage.setItem(
                                key,
                                res.userProfile[key as keyof UserProfile],
                            );
                        });
                        this.globalStore.updateUserProfile(res.userProfile);
                        localStorage.setItem("accessToken", res.accessToken);
                        this.globalStore.updateToastMessage({
                            message: "Login successful",
                            type: "success",
                        });
                        this.globalStore.patchState({ status: "login" });
                        this.router.navigate(["/"]);
                    }),
                    catchError((err) => {
                        this.globalStore.updateToastMessage({
                            message: err.error.message,
                            type: "error",
                        });
                        this.globalStore.patchState({ status: "logout" });
                        return EMPTY;
                    }),
                    finalize(() => {
                        this.globalStore.patchState({ loading: false });
                    }),
                );
            }),
        );
    });

    readonly register = this.effect(
        (registerParam$: Observable<RegisterRequest>) => {
            return registerParam$.pipe(
                switchMap((registerParams) => {
                    this.globalStore.patchState({ loading: true });
                    return this.authService.register(registerParams).pipe(
                        tap(() => {
                            this.globalStore.updateToastMessage({
                                message: "Register successful",
                                type: "success",
                            });
                            this.globalStore.patchState({ status: "logout" });
                        }),
                        catchError((err) => {
                            this.globalStore.updateToastMessage({
                                message: err.error.message,
                                type: "error",
                            });
                            this.globalStore.patchState({ status: "logout" });
                            return EMPTY;
                        }),
                        finalize(() => {
                            this.globalStore.patchState({ loading: false });
                        }),
                    );
                }),
            );
        },
    );
}
