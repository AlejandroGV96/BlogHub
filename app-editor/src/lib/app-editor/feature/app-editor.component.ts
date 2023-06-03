import { ChangeDetectionStrategy, Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MarkdownPreviewComponent } from "../ui/markdown-preview.component";
import {
    PrimaryButtonComponent,
    SecondaryButtonComponent,
} from "@web-app/shared/elements";

@Component({
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MarkdownPreviewComponent,
        PrimaryButtonComponent,
        SecondaryButtonComponent,
    ],
    templateUrl: "./app-editor.component.html",
    styleUrls: ["./app-editor.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppEditorComponent {
    markdown = ``;
    preview = true;

    readonly style: string = `
        padding: 0 8px;
        font-size: 12px;
        text-transform: none;
    `;

    submitPost() {
        console.log({ submitPost: this.markdown });
    }
}
