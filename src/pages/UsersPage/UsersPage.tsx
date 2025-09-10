import React, { useMemo, useState } from 'react';
import s from './UsersPage.module.scss';
import useUsers from '../../shared/hooks/useUsers';
import type { FullUser } from '../../features/users/types';
import { useUserFilters } from '../../shared/hooks/useUserFilters';
import { usePagination } from '../../shared/hooks/usePagination';
import { UserCard } from '../../components/UserCard/UserCard';
import { UsersToolbar } from '../../components/UsersToolbar/UsersToolbar';
import { PaginationBar } from '../../components/PaginationBar/PaginationBar';
import { useDispatch, useSelector } from 'react-redux';
import { type AppDispatch, RootState } from '../../store/store';
import { addUser, deleteUser, selectAllUsers } from '../../slices/usersSlice';

const UsersPage: React.FC = () => {
  const { loading, error } = useUsers();

  const users = useSelector((state: RootState) => selectAllUsers(state))
  const dispatch = useDispatch<AppDispatch>();

  const [newName, setNewName] = useState('');
  const [newUserName, setNewUserName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newWebsite, setNewWebsite] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newStreet, setNewStreet] = useState('');
  const [newCompanyName, setNewCompanyName] = useState('');
  const [showForm, setShowForm] = useState(false);

  const isValid =
    newName.trim() &&
    newUserName.trim() &&
    newEmail.trim() &&
    newPhone.trim() &&
    newWebsite.trim() &&
    newCity.trim() &&
    newCompanyName.trim();

  const handleAddUser = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!isValid) return;

    const address = {
      street: newStreet.trim(),
      suite: '',
      city: newCity.trim(),
      zipcode: '',
      geo: { lat: '', lng: '' },
    };
    const company = {
      name: newCompanyName.trim(),
      catchPhrase: '',
      bs: '',
    };

    dispatch(
      addUser({
        name: newName.trim(),
        username: newUserName.trim(),
        email: newEmail.trim(),
        address,
        phone: newPhone.trim(),
        website: newWebsite.trim(),
        company,
      })
    );

    setNewName('');
    setNewUserName('');
    setNewEmail('');
    setNewPhone('');
    setNewWebsite('');
    setNewCity('');
    setNewStreet('');
    setNewCompanyName('');
    setShowForm(false);
  };

  const handleDeleteUser = (userId: number) => {
    if (window.confirm('Уверены, что хотите удалить пользователя?')) {
      dispatch(deleteUser(userId));
    }
  };

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
    <div className={s.up_main_wrapper}>
      <header className={s.up_header}>
        <h1>Users — фильтрация и сортировка</h1>
        <p>
          JSONPlaceholder · список пользователей <code>useUsers</code>
        </p>
        <button
          type="button"
          className={`${s.up_addBtn} ${showForm ? s.up_addBtnActive : ''}`}
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Отменить' : 'Добавить пользователя'}
        </button>
      </header>

      {showForm && (
        <form className={s.up_form} onSubmit={handleAddUser}>
          <div className={s.up_formRow}>
            <div className={s.up_field}>
              <label>Имя</label>
              <input
                className={s.up_input}
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Иван Петров"
              />
            </div>
            <div className={s.up_field}>
              <label>Username</label>
              <input
                className={s.up_input}
                value={newUserName}
                onChange={(e) => setNewUserName(e.target.value)}
                placeholder="ivan.petrov"
              />
            </div>
          </div>

          <div className={s.up_formRow}>
            <div className={s.up_field}>
              <label>Email</label>
              <input
                type="email"
                className={s.up_input}
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="name@example.com"
              />
            </div>
            <div className={s.up_field}>
              <label>Телефон</label>
              <input
                type="tel"
                className={s.up_input}
                value={newPhone}
                onChange={(e) => setNewPhone(e.target.value)}
                placeholder="+7 777 000 00 00"
              />
            </div>
          </div>

          <div className={s.up_formRow}>
            <div className={s.up_field}>
              <label>Город</label>
              <input
                className={s.up_input}
                value={newCity}
                onChange={(e) => setNewCity(e.target.value)}
                placeholder="Almaty"
              />
            </div>
            <div className={s.up_field}>
              <label>Улица</label>
              <input
                className={s.up_input}
                value={newStreet}
                onChange={(e) => setNewStreet(e.target.value)}
                placeholder="Abay Ave, 10"
              />
            </div>
          </div>

          <div className={s.up_formRow}>
            <div className={s.up_field}>
              <label>Сайт</label>
              <input
                type="url"
                className={s.up_input}
                value={newWebsite}
                onChange={(e) => setNewWebsite(e.target.value)}
                placeholder="example.com"
              />
            </div>
            <div className={s.up_field}>
              <label>Компания</label>
              <input
                className={s.up_input}
                value={newCompanyName}
                onChange={(e) => setNewCompanyName(e.target.value)}
                placeholder="My Company"
              />
            </div>
          </div>

          <div className={s.up_formActions}>
            <button
              type="submit"
              className={s.up_submitBtn}
              disabled={!isValid}
              title={!isValid ? 'Заполните все поля' : undefined}
            >
              Добавить
            </button>
            <button
              type="button"
              className={s.up_cancelBtn}
              onClick={() => setShowForm(false)}
            >
              Отменить
            </button>
          </div>
        </form>
      )}

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
              <UserCard key={u.id} user={u} onDelete={handleDeleteUser} />
            ))}
          </ul>
          <PaginationBar page={clampedPage} setPage={setPage} totalPages={totalPages} />
        </>
      )}
    </div>
  );
};

export default UsersPage;