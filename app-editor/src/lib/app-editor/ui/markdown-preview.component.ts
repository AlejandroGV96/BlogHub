import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { MarkdownModule } from "ngx-markdown";

@Component({
    standalone: true,
    selector: "app-editor-markdown-preview",
    imports: [MarkdownModule],
    template: ` <markdown [data]="content"></markdown> `,
    styleUrls: ["./markdown-preview.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarkdownPreviewComponent {
    @Input() content: string = ``;
}
