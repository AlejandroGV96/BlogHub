/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { RouterModule, TitleStrategy } from "@angular/router";
import { appRoutes } from "./app.routes";
import { API_URL, ApiModule } from "@web-app/shared/api";
import { Environment } from "shared/environments/environment-variables";
import {
    NavBarComponent,
    PageTitleService,
    SpinnerComponent,
    ToastMessageComponent,
    appTitleToken,
    httpInterceptorProviders,
} from "@web-app/shared/elements";
import { MarkdownModule } from "ngx-markdown";
import { EditorStore } from "app-editor/src/lib/app-editor/data-access/editor.store";

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        ToastMessageComponent,
        SpinnerComponent,
        ApiModule,
        NavBarComponent,
        RouterModule.forRoot(appRoutes, {
            initialNavigation: "enabledBlocking",
        }),
        MarkdownModule.forRoot(),
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
        httpInterceptorProviders,
        EditorStore,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
