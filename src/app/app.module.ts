/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { RouterModule, TitleStrategy } from "@angular/router";
import { appRoutes } from "./app.routes";
import { API_URL, ApiModule } from "@web-app/shared/api";
import { Environment } from "shared/environments/environment-variables";
import {
    PageTitleService,
    SpinnerComponent,
    ToastMessageComponent,
    appTitleToken,
} from "@web-app/shared/elements";

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        ToastMessageComponent,
        SpinnerComponent,
        ApiModule,
        RouterModule.forRoot(appRoutes, {
            initialNavigation: "enabledBlocking",
        }),
    ],
    providers: [
        {
            provide: API_URL,
            useValue: Environment["BLOG_API_URL"],
        },
        {
            provide: appTitleToken,
            useValue: "BlogHub",
        },
        {
            provide: TitleStrategy,
            useClass: PageTitleService,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
