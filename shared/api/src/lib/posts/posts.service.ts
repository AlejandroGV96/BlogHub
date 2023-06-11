import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { API_URL } from "../tokens";
import { Post } from "./models/post.model";
import { Observable } from "rxjs";
import { CreatePost } from "./models";

@Injectable({
    providedIn: "root",
})
export class PostsService {
    private readonly http: HttpClient = inject(HttpClient);
    private readonly API_URL: string = inject(API_URL);

    public getPosts(skip: number): Observable<Post[]> {
        return this.http.get<Post[]>(`${this.API_URL}/posts`, {
            params: {
                skip,
            },
        });
    }

    public getMyPosts(skip?: number): Observable<Post[]> {
        const params: any = {};
        if (skip) {
            params["skip"] = {
                skip,
            };
        }

        return this.http.get<Post[]>(`${this.API_URL}/posts/myposts`, {
            params,
        });
    }

    public createPost(post: CreatePost): Observable<Post> {
        return this.http.post<Post>(`${this.API_URL}/posts/create`, post);
    }

    public updatePostLikeStatus(
        liked: boolean,
        postId: string,
    ): Observable<Post> {
        return this.http.post<Post>(
            `${this.API_URL}/posts/${postId}?liked=${liked}`,
            {},
        );
    }
}
