import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output,
} from "@angular/core";
import { PostCardComponent } from "../post-card/post-card.component";
import { NgFor } from "@angular/common";
import { Post } from "@web-app/shared/api";
import { PrimaryButtonComponent } from "../primary-button/primary-button.component";

@Component({
    standalone: true,
    selector: "agv-post-card-list",
    templateUrl: "./post-card-list.component.html",
    styleUrls: ["./post-card-list.component.scss"],
    imports: [PostCardComponent, NgFor, PrimaryButtonComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostCardListComponent {
    @Input() posts: Post[] = [];
    @Output() loadMorePosts = new EventEmitter<number>();

    loadMore(): void {
        this.loadMorePosts.emit(this.posts.length);
    }
}
