import "./styles/globals.scss";
import React from "react";
import "./styles.d.ts";
import s from "./App.module.scss";
import BookList from "./components/BookList/BookList";

function App() {
  return (
    <div className={"main_wrapper"}>
      <main className={s.container}>
        <BookList />
      </main>
    </div>
  );
}

export default App;