import { DatePipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { Post } from "@web-app/shared/api";
import { MarkdownModule } from "ngx-markdown";

@Component({
    standalone: true,
    selector: "agv-post-card-details",
    templateUrl: "./post-card-details.component.html",
    styleUrls: ["./post-card-details.component.scss"],
    imports: [MarkdownModule, DatePipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostCardDetailsComponent {
    @Input() post!: Post;
}
