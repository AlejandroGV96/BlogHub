import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    inject,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import {
    GlobalStateStore,
    NavBarComponent,
    PostCardComponent,
    PostCardDetailsComponent,
    PostCardListComponent,
    SecondaryButtonComponent,
} from "@web-app/shared/elements";
import { RouterModule } from "@angular/router";
import { DashboardStore } from "../data-access/dashboard.store";
import { Post } from "@web-app/shared/api";

@Component({
    standalone: true,
    imports: [
        CommonModule,
        NavBarComponent,
        RouterModule,
        PostCardComponent,
        PostCardListComponent,
        PostCardDetailsComponent,
        SecondaryButtonComponent,
    ],
    providers: [DashboardStore],
    templateUrl: "./app-dashboard.component.html",
    styleUrls: ["./app-dashboard.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppDashboardComponent implements AfterViewInit {
    private readonly dashboardStore = inject(DashboardStore);
    private readonly globalStore = inject(GlobalStateStore);

    readonly isUserLoggedIn$ = this.globalStore.status$;

    openedPost?: Post;

    readonly posts$ = this.dashboardStore.selectPost$;

    readonly style: string = `
        width: 100px;
        padding: 0 8px;
        font-size: 12px;
        text-transform: none;
    `;

    ngAfterViewInit(): void {
        this.dashboardStore.loadPosts(0);
    }

    loadMorePosts(count: number): void {
        this.dashboardStore.loadPosts(count);
    }

    onLiked({ liked, postId }: { liked: boolean; postId: string }): void {
        this.dashboardStore.changeLikePostStatus({ liked, postId });
    }
}
