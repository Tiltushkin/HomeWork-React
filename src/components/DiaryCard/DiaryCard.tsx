import React, { useMemo, useState } from 'react';
import s from '../../pages/DiaryPage/DiaryPage.module.scss';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../store/store';
import type { FullUserDiary, AttendanceStatus } from '../../features/users/types';
import { setDiaryRating, setDiaryStatus, updateUser } from '../../slices/usersSlice';

type Props = { user: FullUserDiary };

const STATUS_OPTIONS: { value: AttendanceStatus; label: string }[] = [
  { value: 'present', label: 'Присутствовал' },
  { value: 'absent',  label: 'Отсутствовал' },
  { value: 'late',    label: 'Опоздал' },
  { value: 'excused', label: 'Уважительная причина' },
];

const RU_BY_VALUE: Record<AttendanceStatus, string> = {
  present: 'Присутствовал',
  absent: 'Отсутствовал',
  late: 'Опоздал',
  excused: 'Уважительная причина',
};

export const DiaryCard: React.FC<Props> = ({ user }) => {
  const d = useDispatch<AppDispatch>();
  const diary = user.diary ?? { status: 'absent', rating: null };

  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [username, setUsername] = useState(user.username);

  const statusColor = useMemo(() => {
    switch (diary.status) {
      case 'present': return s.dp_tagGreen;
      case 'late':    return s.dp_tagYellow;
      case 'excused': return s.dp_tagBlue;
      default:        return s.dp_tagGray;
    }
  }, [diary.status, s.dp_tagBlue, s.dp_tagGray, s.dp_tagGreen, s.dp_tagYellow]);

  return (
    <li className={s.dp_diaryCard} tabIndex={-1}>
      <div className={s.dp_top}>
        <div className={s.dp_title}>
            <span className={s.dp_nameOnly}>
                {user.name} <span className={s.dp_usernameMuted}>({user.username})</span>
            </span>
            <span className={`${s.dp_badge} ${s.dp_idBadge}`}>ID {user.id}</span>
        </div>

        <div className={s.dp_controls}>
          <div className={s.dp_selectWrap}>
            <select
              className={s.dp_select}
              value={diary.status}
              onChange={(e) =>
                d(setDiaryStatus({ id: user.id, status: e.target.value as AttendanceStatus }))
              }
              title="Статус посещения"
            >
              {STATUS_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <input
            className={s.dp_rating}
            type="number"
            min={0}
            max={12}
            step={1}
            value={diary.rating ?? ''}
            onChange={(e) => {
              const num = e.target.value === '' ? null : Number(e.target.value);
              const val =
                num === null ? null : Math.max(0, Math.min(12, Number.isNaN(num) ? 0 : num));
              d(setDiaryRating({ id: user.id, rating: val }));
            }}
            placeholder="Оценка"
            title="Оценка 0–12"
          />

          <span className={`${s.dp_tag} ${statusColor}`}>
            {RU_BY_VALUE[diary.status]}
          </span>

          <button
            type="button"
            className={s.dp_editBtn}
            onClick={() => setEditing((v) => !v)}
            aria-label="Редактировать"
            title="Редактировать пользователя"
          >
            {editing ? 'Закрыть' : 'Редактировать'}
          </button>
        </div>
      </div>

      {editing && (
        <div className={s.dp_editRow}>
          <input
            className={s.dp_input}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Имя"
          />
          <input
            className={s.dp_input}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="username"
          />
          <div className={s.dp_editActions}>
            <button
              type="button"
              className={s.dp_submitBtn}
              onClick={() => {
                d(updateUser({ id: user.id, changes: { name: name.trim(), username: username.trim() } }));
                setEditing(false);
              }}
              disabled={!name.trim() || !username.trim()}
            >
              Сохранить
            </button>
            <button
              type="button"
              className={s.dp_cancelBtn}
              onClick={() => {
                setName(user.name);
                setUsername(user.username);
                setEditing(false);
              }}
            >
              Отмена
            </button>
          </div>
        </div>
      )}
    </li>
  );
};

export default DiaryCard;