import { DatePipe, NgClass, NgIf } from "@angular/common";
import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output,
} from "@angular/core";
import { Post } from "@web-app/shared/api";

@Component({
    standalone: true,
    selector: "agv-post-card",
    templateUrl: "./post-card.component.html",
    styleUrls: ["./post-card.component.scss"],
    imports: [DatePipe, NgIf, NgClass],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostCardComponent {
    @Input() post!: Post;
    @Input() simpleView: boolean = false;

    @Input() showLikeButton: boolean = false;
    @Output() liked = new EventEmitter<{ liked: boolean; postId: string }>();

    onLike(): void {
        this.liked.emit({
            liked: !this.post.liked,
            postId: this.post.id,
        });
    }
}
