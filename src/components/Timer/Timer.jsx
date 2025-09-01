import React, { useEffect, useState } from 'react';
import s from './Timer.module.scss';

function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);

    return () => {
      clearInterval(id);
    };
  }, []);

  return (
    <div className={s.wrapper}>
      <div className={s.value}>
        <span className={s.number}>{seconds}</span>
        <span className={s.label}>секунд</span>
      </div>
      <div className={s.note}>Интервал очищается в cleanup-функции useEffect.</div>
    </div>
  );
}

export default Timer;