import { ChangeDetectionStrategy, Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TestComponent } from "@web-app/shared/elements";

@Component({
    standalone: true,
    imports: [CommonModule, TestComponent],
    templateUrl: "./app-auth.component.html",
    styleUrls: ["./app-auth.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppAuthComponent {}
