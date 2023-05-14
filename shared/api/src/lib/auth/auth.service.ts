import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, delay, map, of, switchMap } from "rxjs";
import {
    LoginRequest,
    LoginResponse,
    LogoutResponse,
    RegisterRequest,
    RegisterResponse,
} from "./models";
import { API_URL } from "../tokens";

@Injectable({
    providedIn: "root",
})
export class AuthService {
    private readonly http: HttpClient = inject(HttpClient);
    private readonly API_URL: string = inject(API_URL);

    public isAuthenticated(): boolean {
        const token = localStorage.getItem("accessToken");
        return token ? true : false;
    }

    public getToken(): Observable<string> {
        return of(localStorage.getItem("accessToken") ?? "");
    }

    public login(params: LoginRequest): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(`${this.API_URL}/login`, params);
    }

    public logout(): Observable<LogoutResponse> {
        return this.getToken().pipe(
            switchMap((token) => {
                return this.http.delete<LogoutResponse>(
                    `${this.API_URL}/logout`,
                    {
                        body: {
                            token,
                        },
                    },
                );
            }),
        );
    }

    public register(params: RegisterRequest): Observable<RegisterResponse> {
        return this.http.post<RegisterResponse>(
            `${this.API_URL}/register`,
            params,
        );
    }
}
