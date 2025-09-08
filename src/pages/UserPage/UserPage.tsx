import React, { useMemo } from 'react';
import s from './UserPage.module.scss';
import { Link, useParams } from 'react-router-dom';
import useUsers, { User } from '../../shared/hooks/useUsers';
import { Address } from '../../features/Users/types'

type Company = { name: string; catchPhrase: string; bs: string };
type FullUser = Omit<User, 'address' | 'company'> & { address: Address; company: Company };

const toUrl = (w: string) => (w?.startsWith('http') ? w : `https://${w}`);
const initialsOf = (name: string) =>
  name?.split(' ').map((p) => p[0]).join('').slice(0, 2).toUpperCase();

const mapHrefOf = (lat?: string, lng?: string) =>
  lat && lng ? `https://maps.google.com/?q=${lat},${lng}` : undefined;

const UserPage: React.FC = () => {
  const { id} = useParams<{ id: string }>();
  const { users, loading, error } = useUsers();
  const typed = users as unknown as FullUser[];

  const userId = Number(id);
  const user = useMemo(
    () => (Number.isFinite(userId) ? typed.find((u) => u.id === userId) : undefined),
    [typed, userId]
  );

  return (
    <div className={s.upSingle_main_wrapper}>
      <header className={s.upSingle_header}>
        <div className={s.upSingle_topline}>
          <Link to="/users" className={s.upSingle_back} aria-label="К списку пользователей">
            ← К списку
          </Link>
          <div className={s.upSingle_badges}>
            {id && <span className={s.upSingle_badge}>User ID {id}</span>}
          </div>
        </div>
        <h1>Профиль пользователя</h1>
        <p>JSONPlaceholder · подробная карточка</p>
      </header>

      {loading && (
        <div className={s.upSingle_state}>
          <div className={s.upSingle_spinner} />
          <span>Загрузка…</span>
        </div>
      )}
      {error && !loading && <div className={`${s.upSingle_state} ${s.upSingle_error}`}>Ошибка: {error}</div>}
      {!loading && !error && !user && (
        <div className={s.upSingle_state}>Пользователь с id {id ?? '—'} не найден</div>
      )}

      {user && (
        <article className={s.upSingle_card}>
          <div className={s.upSingle_head}>
            <div className={s.upSingle_identity}>
              <div className={s.upSingle_avatar} aria-hidden="true">{initialsOf(user.name)}</div>
              <div className={s.upSingle_titleBlock}>
                <h2 className={s.upSingle_name}>{user.name}</h2>
                <div className={s.upSingle_username}>@{user.username}</div>
              </div>
            </div>
            <span className={s.upSingle_id}>#{user.id}</span>
          </div>

          <div className={s.upSingle_rows}>
            <div className={s.upSingle_row}>
              <span className={s.upSingle_label}>Email</span>
              <a className={s.upSingle_link} href={`mailto:${user.email}`}>{user.email}</a>
            </div>
            <div className={s.upSingle_row}>
              <span className={s.upSingle_label}>Phone</span>
              <a className={s.upSingle_link} href={`tel:${user.phone}`}>{user.phone}</a>
            </div>
            <div className={s.upSingle_row}>
              <span className={s.upSingle_label}>Website</span>
              <a className={s.upSingle_link} href={toUrl(user.website)} target="_blank" rel="noreferrer">
                {user.website}
              </a>
            </div>
          </div>

          <div className={s.upSingle_sections}>
            <section className={s.upSingle_section}>
              <div className={s.upSingle_sectionTitle}>Address</div>
              <ul className={s.upSingle_kv}>
                <li><span>Street</span><span>{user.address.street}</span></li>
                <li><span>Suite</span><span>{user.address.suite}</span></li>
                <li><span>City</span><span>{user.address.city}</span></li>
                <li><span>Zip</span><span>{user.address.zipcode}</span></li>
                <li>
                  <span>Geo</span>
                  {mapHrefOf(user.address.geo?.lat, user.address.geo?.lng) ? (
                    <a
                      className={s.upSingle_link}
                      target="_blank"
                      rel="noreferrer"
                      href={mapHrefOf(user.address.geo?.lat, user.address.geo?.lng)}
                    >
                      {user.address.geo.lat}, {user.address.geo.lng}
                    </a>
                  ) : (
                    <span>—</span>
                  )}
                </li>
              </ul>
            </section>

            <section className={s.upSingle_section}>
              <div className={s.upSingle_sectionTitle}>Company</div>
              <ul className={s.upSingle_kv}>
                <li><span>Name</span><span>{user.company.name}</span></li>
                <li><span>Catch phrase</span><span className={s.upSingle_phrase}>“{user.company.catchPhrase}”</span></li>
                <li><span>BS</span><span>{user.company.bs}</span></li>
              </ul>
            </section>
          </div>
        </article>
      )}
    </div>
  );
};

export default UserPage;