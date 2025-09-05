import axios from 'axios';
import type { Post, PostInput } from '../types';
export const BASE_URL = 'http://localhost:8000';

const authApi = axios.create({
    baseURL: BASE_URL,
    auth: {
        username: 'admin',
        password: '123'
    }
});

export async function fetchPosts(): Promise<Post[]> {
  const { data } = await authApi.get<Post[]>('/api/posts');
  return data;
}

export async function fetchPost(id: string): Promise<Post> {
    const { data } = await authApi.get<Post>(`/api/posts/${id}`);
    return data;
}

export async function createPost(input: PostInput): Promise<Post> {
    const { data } = await authApi.post<Post>('/api/posts', input);
    return data;
}

export async function updatePost(id: string, input: PostInput): Promise<Post> {
    const { data } = await authApi.put<Post>(`/api/posts/${id}`, input);
    return data;
}

export async function deletePost(id: string): Promise<void> {
    await authApi.delete(`/api/posts/${id}`);
}