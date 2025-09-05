export type Post = {
    id: string;
    title: string;
    content: string;
    author: string;
    created_at: string;
    updated_at: string;
};

export type PostInput = Pick<Post, 'title' | 'content' | 'author'>;