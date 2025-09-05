import React, { useMemo, useState } from 'react';
import type { Post, PostInput } from '../../shared/types';
import s from './PostForm.module.scss';

const stripAuditTag = (v: string) =>
  v.replace(/\s*\((?:создал|изменил):.*?\)\s*$/gi, '').trim();

type Props = {
  initial?: Post | null;
  onSubmit: (input: PostInput) => Promise<void> | void;
  onCancel: () => void;
};

const PostForm: React.FC<Props> = ({ initial, onSubmit, onCancel }) => {
  const isEdit = !!initial;
  const [title, setTitle] = useState(initial?.title ?? '');
  const [author, setAuthor] = useState(initial?.author ? stripAuditTag(initial.author) : '');
  const [content, setContent] = useState(initial?.content ?? '');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [touched, setTouched] = useState({ title: false, author: false, content: false });

  const isValid = useMemo(
    () => title.trim().length > 0 && author.trim().length > 0 && content.trim().length > 0,
    [title, author, content]
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched({ title: true, author: true, content: true });

    if (!isValid) {
      setError('Заполните все обязательные поля');
      return;
    }

    setSubmitting(true);
    setError(null);
    try {
      const cleanAuthor = stripAuditTag(author);
      await onSubmit({ title: title.trim(), author: cleanAuthor, content: content.trim() });
    } catch (err: any) {
      setError(err?.message ?? 'Ошибка сохранения');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      {error && <div style={{ color: '#fda4af' }}>{error}</div>}

      <div className={s.row}>
        <label className={s.label} htmlFor="title">Заголовок</label>
        <input
          id="title"
          className={s.input}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, title: true }))}
          placeholder="Введите заголовок"
        />
        {touched.title && !title.trim() && (
          <span style={{ color: '#fda4af', fontSize: 12 }}>Поле обязательно</span>
        )}
      </div>

      <div className={s.row}>
        <label className={s.label} htmlFor="author">Автор</label>
        <input
          id="author"
          className={s.input}
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, author: true }))}
          placeholder="Имя автора"
        />
        {touched.author && !author.trim() && (
          <span style={{ color: '#fda4af', fontSize: 12 }}>Поле обязательно</span>
        )}
      </div>

      <div className={s.row}>
        <label className={s.label} htmlFor="content">Содержание</label>
        <textarea
          id="content"
          className={s.textarea}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, content: true }))}
          placeholder="Текст поста"
        />
        {touched.content && !content.trim() && (
          <span style={{ color: '#fda4af', fontSize: 12 }}>Поле обязательно</span>
        )}
      </div>

      <div className={s.actions}>
        <button type="button" className={`${s.btn} ${s.btnGhost}`} onClick={onCancel} disabled={submitting}>
          Отмена
        </button>
        <button type="submit" className={`${s.btn} ${s.btnPrimary}`} disabled={submitting}>
          {isEdit ? 'Сохранить' : 'Создать'}
        </button>
      </div>
    </form>
  );
};

export default PostForm;