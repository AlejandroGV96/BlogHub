import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output,
} from "@angular/core";
import { PostCardComponent } from "../post-card/post-card.component";
import { NgFor, NgIf } from "@angular/common";
import { Post } from "@web-app/shared/api";
import { PrimaryButtonComponent } from "../primary-button/primary-button.component";

@Component({
    standalone: true,
    selector: "agv-post-card-list",
    templateUrl: "./post-card-list.component.html",
    styleUrls: ["./post-card-list.component.scss"],
    imports: [PostCardComponent, NgIf, NgFor, PrimaryButtonComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostCardListComponent {
    @Input() posts: Post[] = [];
    @Input() showLikeButton: boolean = false;

    @Output() loadMorePosts = new EventEmitter<number>();
    @Output() openPost = new EventEmitter<Post>();
    @Output() liked = new EventEmitter<{ liked: boolean; postId: string }>();

    onPostClick(post: Post): void {
        this.openPost.emit(post);
    }

    loadMore(): void {
        this.loadMorePosts.emit(this.posts.length);
    }

    onLiked({ liked, postId }: { liked: boolean; postId: string }): void {
        this.liked.emit({ liked, postId });
    }

    getPostId(index: number, post: Post): string {
        return post.id;
    }
}
