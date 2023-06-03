import { inject } from "@angular/core";
import {
    ActivatedRouteSnapshot,
    Route,
    createUrlTreeFromSnapshot,
} from "@angular/router";
import { AuthService } from "@web-app/shared/api";

export const authGuard = (
    next: ActivatedRouteSnapshot,
    redirectionRoute: string,
) => {
    const isAuth = inject(AuthService).isAuthenticated();
    const urlTree = createUrlTreeFromSnapshot(next, ["/", redirectionRoute]);
    console.log("isAuth", isAuth);
    console.log("next", next);
    console.log("urlTree", urlTree);
    return isAuth ? true : urlTree;
};

export const appRoutes: Route[] = [
    {
        path: "",
        pathMatch: "full",
        redirectTo: "dashboard",
    },
    {
        path: "auth",
        loadChildren: () =>
            import("@web-app/app-auth").then((m) => m.appAuthRoutes),
        title: "Authentication",
    },
    {
        path: "dashboard",
        loadChildren: () =>
            import("@web-app/app-dashboard").then((m) => m.appDashboardRoutes),
        title: "Dashboard",
    },
    {
        path: "editor",
        title: "Editor",
        loadChildren: () =>
            import("@web-app/app-editor").then((m) => m.appEditorRoutes),
        canActivate: [
            (next: ActivatedRouteSnapshot) => authGuard(next, "auth"),
        ],
    },
    {
        path: "profile",
        loadChildren: () =>
            import("@web-app/app-profile").then((m) => m.appProfileRoutes),
        canActivate: [
            (next: ActivatedRouteSnapshot) => authGuard(next, "auth"),
        ],
    },
    { path: "**", redirectTo: "dashboard" },
];
