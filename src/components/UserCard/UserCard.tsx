import React, { useEffect, useMemo, useState } from 'react';
import s from '../../pages/UsersPage/UsersPage.module.scss';
import type { FullUser } from '../../features/users/types';
import { initialsOf, toUrl, mapHrefOf } from '../../features/users/utils/userUtils';

type Props = {
  user: FullUser;
  onDelete: (id: number) => void;
  onUpdate: (id: number, changes: Partial<FullUser>) => void;
};

type FormState = {
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: { lat: string; lng: string };
  };
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

export const UserCard: React.FC<Props> = ({ user: t, onDelete, onUpdate }) => {
  const [editing, setEditing] = useState(false);

  const makeInitial = (u: FullUser): FormState => ({
    name: u.name ?? '',
    username: u.username ?? '',
    email: u.email ?? '',
    phone: u.phone ?? '',
    website: u.website ?? '',
    address: {
      street: u.address?.street ?? '',
      suite: u.address?.suite ?? '',
      city: u.address?.city ?? '',
      zipcode: u.address?.zipcode ?? '',
      geo: {
        lat: u.address?.geo?.lat ?? '',
        lng: u.address?.geo?.lng ?? '',
      },
    },
    company: {
      name: u.company?.name ?? '',
      catchPhrase: u.company?.catchPhrase ?? '',
      bs: u.company?.bs ?? '',
    },
  });

  const [form, setForm] = useState<FormState>(makeInitial(t));

  useEffect(() => {
    if (!editing) setForm(makeInitial(t));
  }, [t, editing]);

  const setTop = (key: keyof FormState, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value } as FormState));

  const setAddress = (key: keyof FormState['address'], value: string) =>
    setForm((prev) => ({ ...prev, address: { ...prev.address, [key]: value } }));

  const setGeo = (key: keyof FormState['address']['geo'], value: string) =>
    setForm((prev) => ({
      ...prev,
      address: { ...prev.address, geo: { ...prev.address.geo, [key]: value } },
    }));

  const setCompany = (key: keyof FormState['company'], value: string) =>
    setForm((prev) => ({ ...prev, company: { ...prev.company, [key]: value } }));

  const canSave = useMemo(() => {
    return form.name.trim() && form.username.trim() && form.email.trim();
  }, [form.name, form.username, form.email]);

  const onEdit = () => setEditing(true);

  const onCancel = () => {
    setForm(makeInitial(t));
    setEditing(false);
  };

  const onSave = () => {
    if (!canSave) return;
    const changes: Partial<FullUser> = {
      name: form.name.trim(),
      username: form.username.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      website: form.website.trim(),
      address: {
        street: form.address.street.trim(),
        suite: form.address.suite.trim(),
        city: form.address.city.trim(),
        zipcode: form.address.zipcode.trim(),
        geo: { lat: form.address.geo.lat.trim(), lng: form.address.geo.lng.trim() },
      },
      company: {
        name: form.company.name.trim(),
        catchPhrase: form.company.catchPhrase.trim(),
        bs: form.company.bs.trim(),
      },
    };
    onUpdate(t.id, changes);
    setEditing(false);
  };

  const mapHref = !editing ? mapHrefOf(t.address?.geo?.lat, t.address?.geo?.lng) : null;

  return (
    <li className={s.up_card}>
      <div className={s.up_head}>
        <div className={s.up_identity}>
          <div className={s.up_avatar} aria-hidden="true">
            {initialsOf(editing ? form.name : t.name)}
          </div>

          <div className={s.up_titleBlock}>
            {editing ? (
              <>
                <input
                  className={s.up_input}
                  value={form.name}
                  onChange={(e) => setTop('name', e.target.value)}
                  placeholder="Имя"
                  aria-label="Имя"
                />
                <input
                  className={s.up_input}
                  value={form.username}
                  onChange={(e) => setTop('username', e.target.value)}
                  placeholder="Username"
                  aria-label="Username"
                />
              </>
            ) : (
              <>
                <h3 className={s.up_name}>{t.name}</h3>
                <div className={s.up_username}>@{t.username}</div>
              </>
            )}
          </div>
        </div>

        <div className={s.up_actions}>
          <span className={s.up_badge}>ID&nbsp;{t.id}</span>

          {!editing ? (
            <>
              <button
                type="button"
                className={s.up_deleteBtn}
                onClick={() => onDelete(t.id)}
                aria-label={`Удалить пользователя ${t.name}`}
                title="Удалить пользователя"
              >
                Удалить
              </button>
              <button
                type="button"
                className={s.up_updateBtn}
                onClick={onEdit}
                aria-label={`Изменить пользователя ${t.name}`}
                title="Изменить пользователя"
              >
                Изменить
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                className={s.up_submitBtn}
                onClick={onSave}
                disabled={!canSave}
                title={!canSave ? 'Заполните обязательные поля' : 'Сохранить изменения'}
              >
                Сохранить
              </button>
              <button
                type="button"
                className={s.up_cancelBtn}
                onClick={onCancel}
                title="Отменить изменения"
              >
                Отмена
              </button>
            </>
          )}
        </div>
      </div>

      <div className={s.up_body}>
        <div className={s.up_row}>
          <span className={s.up_label}>Email</span>
          {editing ? (
            <input
              type="email"
              className={s.up_input}
              value={form.email}
              onChange={(e) => setTop('email', e.target.value)}
              placeholder="name@example.com"
              aria-label="Email"
            />
          ) : (
            <a className={s.up_link} href={`mailto:${t.email}`}>{t.email}</a>
          )}
        </div>

        <div className={s.up_row}>
          <span className={s.up_label}>Phone</span>
          {editing ? (
            <input
              type="tel"
              className={s.up_input}
              value={form.phone}
              onChange={(e) => setTop('phone', e.target.value)}
              placeholder="+7 777 000 00 00"
              aria-label="Телефон"
            />
          ) : (
            <a className={s.up_link} href={`tel:${t.phone}`}>{t.phone}</a>
          )}
        </div>

        <div className={s.up_row}>
          <span className={s.up_label}>Website</span>
          {editing ? (
            <input
              className={s.up_input}
              value={form.website}
              onChange={(e) => setTop('website', e.target.value)}
              placeholder="example.com"
              aria-label="Сайт"
            />
          ) : (
            <a className={s.up_link} href={toUrl(t.website)} target="_blank" rel="noreferrer">
              {t.website}
            </a>
          )}
        </div>

        <div className={s.up_sections}>
          <section className={s.up_section}>
            <div className={s.up_sectionTitle}>Address</div>
            <ul className={s.up_kvList}>
              <li>
                <span>Street</span>
                {editing ? (
                  <input
                    className={s.up_input}
                    value={form.address.street}
                    onChange={(e) => setAddress('street', e.target.value)}
                    placeholder="Abay Ave, 10"
                    aria-label="Street"
                  />
                ) : (
                  <span>{t.address?.street}</span>
                )}
              </li>
              <li>
                <span>Suite</span>
                {editing ? (
                  <input
                    className={s.up_input}
                    value={form.address.suite}
                    onChange={(e) => setAddress('suite', e.target.value)}
                    placeholder="Suite"
                    aria-label="Suite"
                  />
                ) : (
                  <span>{t.address?.suite}</span>
                )}
              </li>
              <li>
                <span>City</span>
                {editing ? (
                  <input
                    className={s.up_input}
                    value={form.address.city}
                    onChange={(e) => setAddress('city', e.target.value)}
                    placeholder="Almaty"
                    aria-label="City"
                  />
                ) : (
                  <span>{t.address?.city}</span>
                )}
              </li>
              <li>
                <span>Zip</span>
                {editing ? (
                  <input
                    className={s.up_input}
                    value={form.address.zipcode}
                    onChange={(e) => setAddress('zipcode', e.target.value)}
                    placeholder="050000"
                    aria-label="Zip"
                  />
                ) : (
                  <span>{t.address?.zipcode}</span>
                )}
              </li>
              <li>
                <span>Geo</span>
                {editing ? (
                  <div className={s.up_geoInputs}>
                    <input
                      className={s.up_input}
                      value={form.address.geo.lat}
                      onChange={(e) => setGeo('lat', e.target.value)}
                      placeholder="lat"
                      aria-label="Latitude"
                    />
                    <input
                      className={s.up_input}
                      value={form.address.geo.lng}
                      onChange={(e) => setGeo('lng', e.target.value)}
                      placeholder="lng"
                      aria-label="Longitude"
                    />
                  </div>
                ) : mapHref ? (
                  <a className={s.up_link} href={mapHref} target="_blank" rel="noreferrer">
                    {t.address?.geo?.lat}, {t.address?.geo?.lng}
                  </a>
                ) : (
                  <span>—</span>
                )}
              </li>
            </ul>
          </section>

          <section className={s.up_section}>
            <div className={s.up_sectionTitle}>Company</div>
            <ul className={s.up_kvList}>
              <li>
                <span>Name</span>
                {editing ? (
                  <input
                    className={s.up_input}
                    value={form.company.name}
                    onChange={(e) => setCompany('name', e.target.value)}
                    placeholder="My Company"
                    aria-label="Company name"
                  />
                ) : (
                  <span>{t.company?.name}</span>
                )}
              </li>
              <li>
                <span>Catch phrase</span>
                {editing ? (
                  <input
                    className={s.up_input}
                    value={form.company.catchPhrase}
                    onChange={(e) => setCompany('catchPhrase', e.target.value)}
                    placeholder="We do the best"
                    aria-label="Catch phrase"
                  />
                ) : (
                  <span className={s.up_phrase}>“{t.company?.catchPhrase}”</span>
                )}
              </li>
              <li>
                <span>BS</span>
                {editing ? (
                  <input
                    className={s.up_input}
                    value={form.company.bs}
                    onChange={(e) => setCompany('bs', e.target.value)}
                    placeholder="business stuff"
                    aria-label="BS"
                  />
                ) : (
                  <span>{t.company?.bs}</span>
                )}
              </li>
            </ul>
          </section>
        </div>
      </div>
    </li>
  );
};

export default UserCard;