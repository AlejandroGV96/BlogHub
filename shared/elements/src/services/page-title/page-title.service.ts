import { Injectable, inject } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { RouterStateSnapshot, TitleStrategy } from "@angular/router";
import { appTitleToken } from "../../tokens";

@Injectable({
    providedIn: "root",
})
export class PageTitleService extends TitleStrategy {
    private readonly title: Title = inject(Title);
    private readonly appTitle: string = inject(appTitleToken);

    override updateTitle(routerState: RouterStateSnapshot) {
        const title = this.buildTitle(routerState);
        if (title !== undefined) {
            this.title.setTitle(`${this.appTitle} | ${title}`);
        }
    }
}
