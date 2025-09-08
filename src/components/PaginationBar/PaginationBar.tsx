import React from 'react';
import s from '../../pages/UsersPage/UsersPage.module.scss';

type Props = {
    page: number;
    setPage: (n: number) => void;
    totalPages: number;
};

export const PaginationBar: React.FC<Props> = ({ page, setPage, totalPages }) => {
    if (totalPages <= 1) return null;

    return (
        <nav className={s.up_pagebar} role="navigation" aria-label="Пагинация">
            <button
                className={s.up_pagebtn}
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                aria-label="Предыдущая страница"
                >
                ←
            </button>

            <div className={s.up_pagenums}>
                {Array.from({ length: totalPages }).map((_, i) => {
                    const n = i + 1;
                    const active = n === page;
                    return (
                        <button
                            key={n}
                            className={`${s.up_pagebtn} ${active ? s.up_pagebtnActive : ''}`}
                            onClick={() => setPage(n)}
                            aria-current={active ? 'page' : undefined}
                            aria-label={`Страница ${n}`}
                            >
                            {n}
                        </button>
                    );
                })}
            </div>

            <button
                className={s.up_pagebtn}
                onClick={() => setPage(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
                aria-label="Следующая страница"
                >
                →
            </button>
        </nav>
    );
};

export default PaginationBar;