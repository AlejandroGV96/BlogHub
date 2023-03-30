import { ChangeDetectionStrategy, Component } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
    standalone: true,
    imports: [CommonModule],
    templateUrl: "./app-editor.component.html",
    styleUrls: ["./app-editor.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppEditorComponent {}
