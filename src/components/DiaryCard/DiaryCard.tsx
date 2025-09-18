import React, { useMemo } from 'react';
import s from '../../pages/DiaryPage/DiaryPage.module.scss';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../store/store';
import { updateAttend, updateGrade } from '../../slices/studentsSlice';
import type { Student, Attend } from '../../features/students/types';

type Props = { user: Student };

const STATUS_OPTIONS: { value: Attend; label: string }[] = [
  { value: 'none',    label: '— не выбрано —' },
  { value: 'present', label: 'Присутствовал' },
  { value: 'late',    label: 'Опоздал' },
];

const RU_BY_VALUE: Record<Attend, string> = {
  none: 'Не выбрано',
  present: 'Присутствовал',
  late: 'Опоздал',
};

export const DiaryCard: React.FC<Props> = ({ user }) => {
  const d = useDispatch<AppDispatch>();

  const statusColor = useMemo(() => {
    switch (user.attend) {
      case 'present': return s.dp_tagGreen;
      case 'late':    return s.dp_tagYellow;
      default:        return s.dp_tagMuted;
    }
  }, [user.attend, s.dp_tagBlue, s.dp_tagGray, s.dp_tagGreen, s.dp_tagYellow, s.dp_tagMuted]);

  return (
    <li className={s.dp_diaryCard} tabIndex={-1}>
      <div className={s.dp_top}>
        <div className={s.dp_title}>
          <span className={s.dp_nameOnly}>
            {user.name}
          </span>
          <span className={`${s.dp_badge} ${s.dp_idBadge}`}>ID {user.id}</span>
        </div>

        <div className={s.dp_controls}>
          <div className={s.dp_selectWrap}>
            <select
              className={s.dp_select}
              value={user.attend}
              onChange={(e) => d(updateAttend({ id: user.id, attend: e.target.value as Attend }))}
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
            value={Number.isFinite(user.grade) ? user.grade : 0}
            onChange={(e) => {
              const n = Number(e.target.value);
              const clamped = Math.max(0, Math.min(12, Number.isNaN(n) ? 0 : n));
              d(updateGrade({ id: user.id, grade: clamped }));
            }}
            placeholder="Оценка"
            title="Оценка 0–12"
          />

          <span className={`${s.dp_tag} ${statusColor}`}>
            {RU_BY_VALUE[user.attend]}
          </span>
        </div>
      </div>
    </li>
  );
};

export default DiaryCard;