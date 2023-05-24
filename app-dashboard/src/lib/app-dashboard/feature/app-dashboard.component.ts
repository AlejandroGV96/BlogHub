import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    inject,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import {
    NavBarComponent,
    PostCardListComponent,
} from "@web-app/shared/elements";
import { RouterModule } from "@angular/router";
import { DashboardStore } from "../data-access/dashboard.store";

@Component({
    standalone: true,
    imports: [
        CommonModule,
        NavBarComponent,
        RouterModule,
        PostCardListComponent,
    ],
    providers: [DashboardStore],
    templateUrl: "./app-dashboard.component.html",
    styleUrls: ["./app-dashboard.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppDashboardComponent implements AfterViewInit {
    private readonly dashboardStore = inject(DashboardStore);

    readonly posts$ = this.dashboardStore.selectPost$;

    ngAfterViewInit(): void {
        this.dashboardStore.loadPosts(0);
    }

    loadMorePosts(count: number): void {
        this.dashboardStore.loadPosts(count);
    }
}
