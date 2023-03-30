import { Route } from "@angular/router";

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
    },
    {
        path: "dashboard",
        loadChildren: () =>
            import("@web-app/app-dashboard").then((m) => m.appDashboardRoutes),
    },
    {
        path: "editor",
        loadChildren: () =>
            import("@web-app/app-editor").then((m) => m.appEditorRoutes),
    },
    {
        path: "profile",
        loadChildren: () =>
            import("@web-app/app-profile").then((m) => m.appProfileRoutes),
    },
];
