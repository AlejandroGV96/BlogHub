/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Component, inject } from "@angular/core";
import { Router } from "@angular/router";
import { GlobalStateStore } from "@web-app/shared/elements";
import { Environment } from "@web-app/shared/environment";
@Component({
    selector: "web-app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"],
})
export class AppComponent {
    private readonly globalStore = inject(GlobalStateStore);
    readonly loading$ = this.globalStore.loading$;

    private readonly router = inject(Router);

    isLogged$ = this.globalStore.status$;

    home() {
        this.router.navigate(["/"]);
    }

    logout() {
        this.globalStore.logout();
    }

    login() {
        this.router.navigate(["/auth"]);
    }

    constructor() {
        console.log({ Environment });
    }
}
