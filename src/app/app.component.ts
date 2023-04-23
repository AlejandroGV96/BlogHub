import { Component } from "@angular/core";
import { environment } from "@web-app/shared/environment";
@Component({
    selector: "web-app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"],
})
export class AppComponent {
    title = "web-app";
    constructor() {
        console.log("API_URL: ", environment.apiUrl);
    }
}
