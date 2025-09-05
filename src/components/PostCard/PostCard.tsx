import React from 'react';
import type { Post } from '../../shared/types';
import { formatDateTime, clampText } from '../../utils/format';
import s from './PostCard.module.scss';

type Props = {
    post: Post;
    onEdit: (post: Post) => void;
    onDelete: (id: string) => void;
    onOpen?: (post: Post) => void;
};

const PostCard: React.FC<Props> = ({ post, onEdit, onDelete, onOpen }) => {
    return (
        <article className={s.card}>
            <h3 className={s.title}>{post.title}</h3>
            <p className={s.content}>{clampText(post.content, 220)}</p>
            <div className={s.meta}>
                <span>Автор: {post.author}</span>
                <span>Создано: {formatDateTime(post.created_at)}</span>
            </div>
            <div className={s.actions}>
                <button className={`${s.btn} ${s.btnGhost}`} onClick={() => onOpen?.(post)}>Открыть</button>
                <button className={`${s.btn} ${s.btnPrimary}`} onClick={() => onEdit(post)}>Изменить</button>
                <button className={`${s.btn} ${s.btnDanger}`} onClick={() => onDelete(post.id)}>Удалить</button>
            </div>
        </article>
    );
};

export default PostCard;