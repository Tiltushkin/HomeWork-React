import "./styles/globals.scss";
import React from "react";
import s from "./App.module.scss";
import useTodos from "./shared/hooks/useTodos";
import UserSelect from "./components/UserSelect/UserSelect";

function App() {
  const {
    todos,
    loading,
    error,
    userId,
    setUserId,
    status,
    setStatus,
    sortOrder,
    setSortOrder,
    resetFilters,
    userStats,
  } = useTodos();

  return (
    <div className={"main_wrapper"}>
      <div className={s.container}>
        <header className={s.header}>
          <h1>Todos — фильтрация и сортировка</h1>
          <p>JSONPlaceholder · кастомный хук <code>useTodos</code></p>
        </header>

        <section className={s.controls}>
          <UserSelect
            label="Пользователь"
            value={userId}
            onChange={setUserId}
            users={userStats}
            disabled={loading || !!error}
          />

          <div className={s.control}>
            <span className={s.label}>Статус</span>
            <div className={s.segmented}>
              <button
                className={`${s.segment} ${status === "all" ? s.active : ""}`}
                onClick={() => setStatus("all")}
                type="button"
              >
                Все
              </button>
              <button
                className={`${s.segment} ${
                  status === "completed" ? s.active : ""
                }`}
                onClick={() => setStatus("completed")}
                type="button"
              >
                Выполненные
              </button>
              <button
                className={`${s.segment} ${
                  status === "incomplete" ? s.active : ""
                }`}
                onClick={() => setStatus("incomplete")}
                type="button"
              >
                Невыполненные
              </button>
            </div>
          </div>

          <div className={s.control}>
            <span className={s.label}>Порядок</span>
            <div className={s.segmented}>
              <button
                className={`${s.segment} ${sortOrder === "new" ? s.active : ""}`}
                onClick={() => setSortOrder("new")}
                type="button"
                title="Новые первыми (id ↓)"
              >
                Новые
              </button>
              <button
                className={`${s.segment} ${sortOrder === "old" ? s.active : ""}`}
                onClick={() => setSortOrder("old")}
                type="button"
                title="Старые первыми (id ↑)"
              >
                Старые
              </button>
            </div>
          </div>

          <div className={s.control + " " + s.resetWrap}>
            <button className={s.resetBtn} onClick={resetFilters} type="button">
              Сбросить
            </button>
          </div>
        </section>

        {loading && (
          <div className={s.state}>
            <div className={s.spinner} />
            <span>Загрузка задач…</span>
          </div>
        )}
        {error && !loading && (
          <div className={s.state + " " + s.error}>Ошибка: {error}</div>
        )}
        {!loading && !error && todos.length === 0 && (
          <div className={s.state}>По заданным фильтрам задач нет</div>
        )}

        {!loading && !error && todos.length > 0 && (
          <ul className={s.grid}>
            {todos.map((t) => (
              <li key={t.id} className={s.card}>
                <div className={s.cardHeader}>
                  <span
                    className={`${s.status} ${t.completed ? s.done : s.todo}`}
                  >
                    {t.completed ? "Выполнено" : "В работе"}
                  </span>
                  <span className={s.badges}>
                    <span className={s.badge}>user {t.userId}</span>
                    <span className={s.badge}>id {t.id}</span>
                  </span>
                </div>
                <h3 className={s.title}>{t.title}</h3>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;