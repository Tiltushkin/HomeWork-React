import React from 'react';
import s from './Post.module.scss';

function Post({ title, body, userId }) {
  return (
    <li className={s.card}>
      <div className={s.header}>
        <h3 className={s.title}>{title}</h3>
        <span className={s.user}>#{userId}</span>
      </div>
      <p className={s.body}>{body}</p>
    </li>
  );
}

export default Post;