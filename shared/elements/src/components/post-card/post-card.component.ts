import { DatePipe, NgIf } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { Post } from "@web-app/shared/api";

@Component({
    standalone: true,
    selector: "agv-post-card",
    templateUrl: "./post-card.component.html",
    styleUrls: ["./post-card.component.scss"],
    imports: [DatePipe, NgIf],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostCardComponent {
    @Input() post!: Post;
    @Input() simpleView: boolean = false;
}
