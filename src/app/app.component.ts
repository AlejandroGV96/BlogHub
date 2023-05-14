/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Component, inject } from "@angular/core";
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
    constructor() {
        console.log({ Environment });
    }
}
