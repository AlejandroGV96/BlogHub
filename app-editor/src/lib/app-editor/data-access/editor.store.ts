import { Injectable, inject } from "@angular/core";
import { Router } from "@angular/router";
import { ComponentStore } from "@ngrx/component-store";
import { CreatePost, PostsService } from "@web-app/shared/api";
import { GlobalStateStore } from "@web-app/shared/elements";
import { EMPTY, Observable, catchError, switchMap, tap } from "rxjs";

export interface EditorState {
    currentPost?: CreatePost;
}

@Injectable({
    providedIn: "root",
})
export class EditorStore extends ComponentStore<EditorState> {
    readonly postsService = inject(PostsService);
    readonly globalStore = inject(GlobalStateStore);
    private router = inject(Router);

    readonly selectCurrentPost$ = this.select((state) => state.currentPost);

    constructor() {
        super({});
    }

    updateCurrentPost = this.updater(
        (state: EditorState, post: CreatePost | undefined) => {
            return {
                ...state,
                currentPost: post,
            };
        },
    );

    readonly createPost = this.effect((post$: Observable<CreatePost>) => {
        return post$.pipe(
            switchMap((post) => {
                return this.postsService.createPost(post).pipe(
                    tap(() => {
                        this.updateCurrentPost(undefined);
                        this.globalStore.updateToastMessage({
                            message: "Post created successfully",
                            type: "success",
                        });
                        this.router.navigate(["/dashboard"]);
                    }),
                    catchError(() => {
                        this.globalStore.updateToastMessage({
                            message: "Post creation failed",
                            type: "error",
                        });
                        return EMPTY;
                    }),
                );
            }),
        );
    });
}
