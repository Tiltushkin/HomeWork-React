import React, { useMemo } from 'react';
import s from './DiaryPage.module.scss';
import useUsers from '../../shared/hooks/useUsers';
import type { FullUser } from '../../features/users/types';
import { useUserFilters } from '../../shared/hooks/useUserFilters';
import { usePagination } from '../../shared/hooks/usePagination';
import { UsersToolbar } from '../../components/UsersToolbar/UsersToolbar';
import { PaginationBar } from '../../components/PaginationBar/PaginationBar';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { selectAllUsers } from '../../slices/usersSlice';
import { DiaryCard } from '../../components/DiaryCard/DiaryCard';

const DiaryPage: React.FC = () => {
  const { loading, error } = useUsers();
  const users = useSelector((state: RootState) => selectAllUsers(state));
  const typed = users as unknown as FullUser[];

  const {
    query, setQuery,
    city, setCity,
    company, setCompany,
    cities, companies,
    filtered,
    clearFilters,
  } = useUserFilters(typed);

  const { page, setPage, pageSize, setPageSize, totalPages, clampedPage, start, end } =
    usePagination(filtered.length, 9);

  const pageItems = useMemo(() => filtered.slice(start, end), [filtered, start, end]);

  return (
    <div className={s.dp_main_wrapper}>
      <header className={s.dp_header}>
        <h1>Дневник посещаемости</h1>
        <p>Список пользователей · выставляйте статус и оценку</p>
      </header>

      <UsersToolbar
        query={query} setQuery={setQuery}
        city={city} setCity={setCity}
        company={company} setCompany={setCompany}
        cities={cities} companies={companies}
        clearFilters={clearFilters}
        pageSize={pageSize} setPageSize={setPageSize}
        total={filtered.length} start={start} end={end}
      />

      {loading && (
        <div className={s.dp_state}>
          <div className={s.dp_spinner} />
          <span>Загрузка пользователей…</span>
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
            {pageItems.map(u => (
              <DiaryCard key={u.id} user={u} />
            ))}
          </ul>
          <PaginationBar page={clampedPage} setPage={setPage} totalPages={totalPages} />
        </>
      )}
    </div>
  );
};

export default DiaryPage;