import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { GlobalStateStore } from "@web-app/shared/elements";

@Component({
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: "./app-dashboard.component.html",
    styleUrls: ["./app-dashboard.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppDashboardComponent {
    private readonly globalStore = inject(GlobalStateStore);

    isLogged$ = this.globalStore.status$;

    logout() {
        this.globalStore.logout();
    }
}
