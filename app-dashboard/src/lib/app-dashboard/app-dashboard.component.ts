import { ChangeDetectionStrategy, Component } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
    standalone: true,
    imports: [CommonModule],
    templateUrl: "./app-dashboard.component.html",
    styleUrls: ["./app-dashboard.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppDashboardComponent {}
