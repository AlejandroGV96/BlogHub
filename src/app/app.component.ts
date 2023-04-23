import { Component } from "@angular/core";
import { Environment } from "@web-app/shared/environment";
@Component({
    selector: "web-app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"],
})
export class AppComponent {
    title = "web-app";
    constructor() {
        console.log({ Environment });
    }
}
