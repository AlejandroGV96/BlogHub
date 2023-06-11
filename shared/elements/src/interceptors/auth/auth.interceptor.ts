import {
    HTTP_INTERCEPTORS,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root",
})
export class AuthInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<unknown>, next: HttpHandler) {
        const token = localStorage.getItem("accessToken");
        let authRequest: HttpRequest<unknown>;
        if (!token) {
            authRequest = req.clone();
        } else {
            authRequest = req.clone({
                headers: req.headers.set("Authorization", `Bearer ${token}`),
            });
        }
        return next.handle(authRequest);
    }
}

export const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
];
