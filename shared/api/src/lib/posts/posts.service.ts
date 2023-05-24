import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { API_URL } from "../tokens";
import { Post } from "./models/post.model";
import { Observable } from "rxjs";

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
}
