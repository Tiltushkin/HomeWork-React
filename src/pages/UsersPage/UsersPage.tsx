import React, { useMemo } from 'react';
import s from './UsersPage.module.scss';
import useUsers, { User } from '../../shared/hooks/useUsers';
import type { FullUser } from '../../features/users/types';
import { useUserFilters } from '../../shared/hooks/useUserFilters';
import { usePagination } from '../../shared/hooks/usePagination';
import { UserCard } from '../../components/UserCard/UserCard';
import { UsersToolbar } from '../../components/UsersToolbar/UsersToolbar';
import { PaginationBar } from '../../components/PaginationBar/PaginationBar';

const UsersPage: React.FC = () => {
  const { users, loading, error } = useUsers();
  const typed = users as unknown as FullUser[];

  const {
    query, setQuery,
    city, setCity,
    company, setCompany,
    cities, companies,
    filtered,
    clearFilters,
  } = useUserFilters(typed);

  const { page, setPage, pageSize, setPageSize, totalPages, clampedPage, start, end } = usePagination(filtered.length, 9);
  const pageItems = useMemo(() => filtered.slice(start, end), [filtered, start, end]);

  return (
    <div className={s.up_main_wrapper}>
      <header className={s.up_header}>
        <h1>Users — фильтрация и сортировка</h1>
        <p>JSONPlaceholder · список пользователей <code>useUsers</code></p>
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
        <div className={s.up_state}>
        <div className={s.up_spinner} />
        <span>Загрузка пользователей…</span>
        </div>
      )}

      {error && !loading && (
        <div className={`${s.up_state} ${s.up_error}`}>Ошибка: {error}</div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <div className={s.up_state}>По вашему запросу ничего не найдено</div>
      )}

      {!loading && !error && filtered.length > 0 && (
        <>
        <ul className={s.up_grid}>
          {pageItems.map((u) => (
          <UserCard key={u.id} user={u} />
          ))}
        </ul>
        <PaginationBar page={clampedPage} setPage={setPage} totalPages={totalPages} />
        </>
      )}
    </div>
  );
};

export default UsersPage;