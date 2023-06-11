import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { CommonModule, NgFor, NgIf } from "@angular/common";
import {
    GlobalStateStore,
    PostCardComponent,
    TextboxComponent,
} from "@web-app/shared/elements";
import { PostsService } from "@web-app/shared/api";
import { FormsModule } from "@angular/forms";

@Component({
    standalone: true,
    imports: [
        CommonModule,
        PostCardComponent,
        NgFor,
        NgIf,
        TextboxComponent,
        FormsModule,
    ],
    templateUrl: "./app-profile.component.html",
    styleUrls: ["./app-profile.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppProfileComponent {
    private readonly globalStore = inject(GlobalStateStore);
    private readonly postsService = inject(PostsService);

    readonly userProfile$ = this.globalStore.userProfile$;
    readonly myPosts$ = this.postsService.getMyPosts();

    constructor() {
        this.postsService.getMyPosts();
    }
}
