import { Injectable, inject } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { Post, PostsService } from "@web-app/shared/api";
import { GlobalStateStore } from "@web-app/shared/elements";
import { EMPTY, Observable, catchError, finalize, switchMap, tap } from "rxjs";

export interface DashboardState {
    posts: Post[];
}

@Injectable()
export class DashboardStore extends ComponentStore<DashboardState> {
    readonly postsService = inject(PostsService);
    readonly globalStore = inject(GlobalStateStore);
    readonly selectPost$ = this.select((state) => state.posts);
    readonly selectPostCount$ = this.select((state) => state.posts.length);

    constructor() {
        super({
            posts: [],
        });
    }

    readonly updatePosts = this.updater(
        (state: DashboardState, posts: Post[]) => {
            return {
                ...state,
                posts: [...state.posts, ...posts],
            };
        },
    );

    readonly updatePost = this.updater((state: DashboardState, post: Post) => {
        const { posts } = state;
        const index = posts.findIndex(({ id: _id }) => _id === post.id);
        if (index !== -1) {
            posts[index] = post;
        }
        return {
            ...state,
            posts: [...posts],
        };
    });

    readonly loadPosts = this.effect((skip$: Observable<number>) => {
        return skip$.pipe(
            switchMap((skip) => {
                this.globalStore.patchState({ loading: true });
                return this.postsService.getPosts(skip).pipe(
                    tap((posts) => {
                        if (!posts.length) {
                            this.globalStore.updateToastMessage({
                                message: "No more posts to load",
                                type: "info",
                            });
                        } else {
                            this.updatePosts(posts);
                        }
                    }),
                    catchError(() => {
                        return EMPTY;
                    }),
                    finalize(() => {
                        this.globalStore.patchState({ loading: false });
                    }),
                );
            }),
        );
    });

    readonly changeLikePostStatus = this.effect(
        (post$: Observable<{ liked: boolean; postId: string }>) => {
            return post$.pipe(
                switchMap(({ liked, postId }) => {
                    return this.postsService
                        .updatePostLikeStatus(liked, postId)
                        .pipe(
                            tap((post) => {
                                this.updatePost(post);
                                this.globalStore.updateToastMessage({
                                    message: `Post ${
                                        liked ? "liked" : "unliked"
                                    }`,
                                    type: "success",
                                });
                            }),
                            catchError(() => {
                                this.globalStore.updateToastMessage({
                                    message: `Failed to ${
                                        liked ? "like" : "unlike"
                                    } post`,
                                    type: "error",
                                });
                                return EMPTY;
                            }),
                        );
                }),
            );
        },
    );
}
