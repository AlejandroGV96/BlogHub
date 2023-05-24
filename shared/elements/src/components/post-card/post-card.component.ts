import { DatePipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { Post } from "@web-app/shared/api";

@Component({
    standalone: true,
    selector: "agv-post-card",
    templateUrl: "./post-card.component.html",
    styleUrls: ["./post-card.component.scss"],
    imports: [DatePipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostCardComponent {
    @Input() post!: Post;
}
