import { Route } from "@angular/router";
import { AppDashboardComponent } from "./app-dashboard/feature/app-dashboard.component";

export const appDashboardRoutes: Route[] = [
    { path: "", component: AppDashboardComponent },
    { path: "**", redirectTo: "" },
];
