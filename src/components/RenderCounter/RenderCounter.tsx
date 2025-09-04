import React, { useRef } from 'react';
import '../../styles'
import s from './RenderCounter.module.scss';

function RenderCounter() {
  const renders = useRef(0);
  renders.current += 1;

  return (
    <div className={s.wrapper}>
      <div className={s.value}>
        <strong>{renders.current}</strong> рендеров
      </div>
      <div className={s.note}>useRef увеличивается при каждом рендере, но это не триггерит новый рендер.</div>
    </div>
  );
}

export default RenderCounter;