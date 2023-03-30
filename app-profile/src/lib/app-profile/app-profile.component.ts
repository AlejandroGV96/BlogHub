import { ChangeDetectionStrategy, Component } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
    standalone: true,
    imports: [CommonModule],
    templateUrl: "./app-profile.component.html",
    styleUrls: ["./app-profile.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppProfileComponent {}
