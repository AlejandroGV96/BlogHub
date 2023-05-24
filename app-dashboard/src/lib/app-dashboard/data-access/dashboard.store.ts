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
}
