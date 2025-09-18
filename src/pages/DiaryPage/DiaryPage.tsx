import React, { useMemo, useState } from 'react';
import s from './DiaryPage.module.scss';
import useStudents from '../../shared/hooks/useStudents';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import { selectAllStudents } from '../../slices/studentsSlice';
import { DiaryCard } from '../../components/DiaryCard/DiaryCard';

const PAGE_SIZE_OPTIONS = [6, 9, 12];

const DiaryPage: React.FC = () => {
  const { loading, error } = useStudents();
  const students = useSelector((state: RootState) => selectAllStudents(state));

  const [query, setQuery] = useState('');
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? students.filter(s => s.name.toLowerCase().includes(q)) : students;
  }, [students, query]);

  const [pageSize, setPageSize] = useState(9);
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const clampedPage = Math.min(page, totalPages);
  const start = (clampedPage - 1) * pageSize;
  const end = start + pageSize;
  const pageItems = useMemo(() => filtered.slice(start, end), [filtered, start, end]);

  return (
    <div className={s.dp_main_wrapper}>
      <header className={s.dp_header}>
        <h1>Дневник посещаемости</h1>
        <p>Список студентов · статус посещения и оценка</p>
      </header>

      {/* Простой тулбар: поиск + размер страницы */}
      <div className={s.dp_toolbar}>
        <input
          className={s.dp_input}
          value={query}
          onChange={(e) => { setQuery(e.target.value); setPage(1); }}
          placeholder="Поиск по имени…"
          aria-label="Поиск по имени"
        />
        <div className={s.dp_toolbarRight}>
          <label className={s.dp_label}>
            На странице:
            <select
              className={s.dp_select}
              value={pageSize}
              onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }}
            >
              {PAGE_SIZE_OPTIONS.map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </label>
          <span className={s.dp_muted}>
            Показано {filtered.length ? `${start + 1}–${Math.min(end, filtered.length)} из ${filtered.length}` : '0'}
          </span>
        </div>
      </div>

      {loading && (
        <div className={s.dp_state}>
          <div className={s.dp_spinner} />
          <span>Загрузка студентов…</span>
        </div>
      )}

      {error && !loading && (
        <div className={`${s.dp_state} ${s.dp_error}`}>Ошибка: {error}</div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <div className={s.dp_state}>По вашему запросу ничего не найдено</div>
      )}

      {!loading && !error && filtered.length > 0 && (
        <>
          <ul className={s.dp_grid}>
            {pageItems.map(su => (
              <DiaryCard key={su.id} user={su} />
            ))}
          </ul>

          <div className={s.dp_pagination}>
            <button
              type="button"
              className={s.dp_pageBtn}
              disabled={clampedPage <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              Назад
            </button>
            <span className={s.dp_pageInfo}>{clampedPage} / {totalPages}</span>
            <button
              type="button"
              className={s.dp_pageBtn}
              disabled={clampedPage >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            >
              Вперёд
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default DiaryPage;