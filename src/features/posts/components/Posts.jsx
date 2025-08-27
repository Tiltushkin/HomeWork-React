import React, { useEffect, useState } from 'react';
import { usePosts } from '../../hooks/usePosts';
import { useUsers } from '../../hooks/useUsers';
import Post from './Post';
import s from './Posts.module.scss';

function Posts() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [userId, setUserId] = useState('');

  const start = (page - 1) * limit;
  const [posts, loading, error, totalCount] = usePosts(
    'http://jsonplaceholder.typicode.com/posts',
    { start, limit, userId: userId ? Number(userId) : null }
  );

  const { users, loading: usersLoading, error: usersError } = useUsers()

  useEffect(() => {
    setPage(1);
  }, [userId, limit]);

  const totalPages = totalCount ? Math.max(1, Math.ceil(totalCount / limit)) : null;

  const handlePrev = () => setPage((p) => Math.max(1, p - 1));
  const handleNext = () => {
    if (!totalPages) {
      setPage((p) => p + 1);
    } else {
      setPage((p) => Math.min(totalPages, p + 1));
    }
  };

    return (
        <div className={s.wrapper}>
            <h2 className={s.title}>Список постов</h2>

            <div className={s.controls}>
                <div className={s.controlItem}>
                    <label>Фильтр по пользователю</label>
                    <br />
                    {usersLoading && <p>Загрузка пользователей...</p>}
                    {usersError && <p className={s.error}>Ошибка: {usersError}</p>}
                    {!usersLoading && !usersError && (
                        <select value={userId} onChange={(e) => setUserId(e.target.value)} className={s.select}>
                        <option value=''>Все пользователи</option>
                        {users.map(u => (
                            <option key={u.id} value={u.id}>#{u.id} — {u.name}</option>
                        ))}
                        </select>
                    )}
                </div>

                <div className={s.controlItem}>
                    <label>Постов на страницу</label>
                    <br />
                    <select value={limit} onChange={(e) => setLimit(Number(e.target.value))} className={s.select}>
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                    </select>
                </div>

                <div className={s.pagination}>
                    <button onClick={handlePrev} disabled={page === 1 || loading} className={s.btn}>◀ Prev</button>
                    <div className={s.pageInfo}>
                        Страница <strong>{page}</strong>
                        {totalPages ? <> из <strong>{totalPages}</strong></> : null}
                    </div>
                    <button
                        onClick={handleNext}
                        disabled={loading || (totalPages !== null && page >= totalPages)}
                        className={s.btn}
                    >
                        Next ▶
                    </button>
                </div>
            </div>

            <div className={s.content}>
                {loading && <p className={s.note}>Загрузка...</p>}
                {error && <p className={s.error}>Ошибка: {error}</p>}

                {!loading && !error && posts.length === 0 && (
                <p className={s.note}>Постов не найдено.</p>
                )}

                <ul className={s.list}>
                {posts.map(p => (
                    <Post key={p.id} title={p.title} body={p.body} userId={p.userId} />
                ))}
                </ul>
            </div>
        </div>
    );
}

export default Posts;