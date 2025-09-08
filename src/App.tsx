import "./styles/globals.scss";
import React from "react";
import s from "./App.module.scss";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NotFound from "./pages/NotFound/NotFound";
import MainPage from "./pages/MainPage/MainPage";
import AboutPage from "./pages/AboutPage/AboutPage";
import UsersPage from "./pages/UsersPage/UsersPage";
import UserPage from "./pages/UserPage/UserPage";

const App: React.FC = () => {
  return (
    <Router>
      <div className={s.main_wrapper}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/users/:id" element={<UserPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;