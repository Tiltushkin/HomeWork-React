import React, { useEffect, useState } from 'react';
import '../../styles'
import s from './UsersList.module.scss';

const MOCK_USERS = [
  { id: 1, name: 'Алина' },
  { id: 2, name: 'Максим' },
  { id: 3, name: 'София' },
  { id: 4, name: 'Влад' },
  { id: 5, name: 'Антон' }
];

function UsersList() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const t = setTimeout(() => {
      setUsers(MOCK_USERS);
      setLoading(false);
    }, 1300);

    return () => clearTimeout(t);
  }, []);

  if (loading) {
    return <div className={s.wrapper}>Загрузка...</div>;
  }

  return (
    <ul className={s.wrapper}>
      {users.map(u => (
        <li key={u.id} className={s.item}>{u.name}</li>
      ))}
    </ul>
  );
}

export default UsersList;