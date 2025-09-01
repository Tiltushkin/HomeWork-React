import './styles/globals.scss';
import React, { useState } from 'react';
import Timer from './components/Timer/Timer';
import UsersList from './components/UsersList/UsersList';
import RenderCounter from './components/RenderCounter/RenderCounter';
import s from './App.module.scss';

function App() {
  const [showTimer, setShowTimer] = useState(true);

  return (
    <div className={'main_wrapper'}>
      <div className={s.container}>
        <h1 className={s.title}>Demo: Timer / UsersList / RenderCounter</h1>

        <div className={s.controls}>
          <button className={s.btn} onClick={() => setShowTimer(v => !v)}>
            {showTimer ? 'Unmount Timer' : 'Mount Timer'}
          </button>
        </div>

        <div className={s.grid}>
          <section className={s.card}>
            <h2 className={s.cardTitle}>Timer</h2>
            {showTimer ? <Timer /> : <div className={s.empty}>Таймер размонтирован</div>}
          </section>

          <section className={s.card}>
            <h2 className={s.cardTitle}>UsersList (fake request)</h2>
            <UsersList />
          </section>

          <section className={s.card}>
            <h2 className={s.cardTitle}>RenderCounter</h2>
            <RenderCounter />
          </section>
        </div>
      </div>
    </div>
  );
}

export default App;