import React from 'react';
import type { Post } from '../../shared/types';
import PostCard from '../PostCard/PostCard';
import s from './PostList.module.scss';

type Props = {
    posts: Post[];
    isLoading: boolean;
    error?: string;
    onCreate: () => void;
    onEdit: (post: Post) => void;
    onDelete: (id: string) => void;
    onOpen: (post: Post) => void;
};

const PostList: React.FC<Props> = ({ posts, isLoading, error, onCreate, onEdit, onDelete, onOpen }) => {
    return (
        <section>
            <div className={s.header}>
                <h2 className={s.title}>Посты</h2>
                <div className={s.actions}>
                    <button className={`${s.btn} ${s.btnPrimary}`} onClick={onCreate}>+ Новый пост</button>
                </div>
            </div>

            {error && <div className={s.error}>Ошибка: {error}</div>}

            {isLoading ? (
                <div className={s.grid}>
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className={s.skeletonCard} />
                    ))}
                </div>
            ) : posts.length === 0 ? (
                <div className={s.empty}>Постов пока нет. Создайте первый!</div>
            ) : (
                <div className={s.grid}>
                    {posts.map((p) => (
                        <PostCard key={p.id} post={p} onEdit={onEdit} onDelete={onDelete} onOpen={onOpen} />
                    ))}
                </div>
            )}
        </section>
    );
};

export default PostList;