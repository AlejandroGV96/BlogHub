export interface Post {
    id: string;
    createdDate: Date;
    title: string;
    description: string;
    content: string;
    likes_count: number;
    liked: boolean;
    username: string;
}
