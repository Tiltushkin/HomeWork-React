import React, { useMemo } from 'react';
import s from '../../pages/UsersPage/UsersPage.module.scss';
import Select, { SelectOption } from '../../features/UI/Select/Select';

type Props = {
    query: string;
    setQuery: (v: string) => void;
    city: string; setCity: (v: string) => void;
    company: string; setCompany: (v: string) => void;
    cities: string[]; companies: string[];
    clearFilters: () => void;
    pageSize: number; setPageSize: (n: number) => void;
    total: number; start: number; end: number;
};

export const UsersToolbar: React.FC<Props> = ({
    query, setQuery,
    city, setCity,
    company, setCompany,
    cities, companies,
    clearFilters,
    pageSize, setPageSize,
    total, start, end,
}) => {
    const cityOptions: SelectOption[] = useMemo(
        () => [{ label: 'Все', value: 'all' }, ...cities.map((c) => ({ label: c!, value: c! }))],
        [cities]
    );

    const companyOptions: SelectOption[] = useMemo(
        () => [{ label: 'Все', value: 'all' }, ...companies.map((c) => ({ label: c!, value: c! }))],
        [companies]
    );

    const pageSizeOptionsUI: SelectOption[] = useMemo(
        () => [6, 9, 12].map((n) => ({ label: String(n), value: n })),[]
    );

    return (
        <div className={s.up_toolbar} role="region" aria-label="Фильтры и пагинация">
            <input
                className={s.up_search}
                type="text"
                placeholder="Поиск (имя, email, город, компания)…"
                aria-label="Поиск"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />

            <div className={s.up_filters}>
                <label className={s.up_filterItem}>
                    <span>Город</span>
                    <Select options={cityOptions} value={city} onChange={(val) => setCity(String(val))} ariaLabel="Фильтр по городу" />
                </label>

                <label className={s.up_filterItem}>
                    <span>Компания</span>
                    <Select options={companyOptions} value={company} onChange={(val) => setCompany(String(val))} ariaLabel="Фильтр по компании" />
                </label>

                <button
                    type="button"
                    className={s.up_clearBtn}
                    onClick={clearFilters}
                    disabled={query.trim() === '' && city === 'all' && company === 'all'}
                    title="Сбросить фильтры"
                >
                Сбросить
                </button>
            </div>

            <div className={s.up_rightControls}>
                <div className={s.up_pagesizeWrap}>
                    <label>
                        <span>На странице</span>
                        <Select options={pageSizeOptionsUI} value={pageSize} onChange={(val) => setPageSize(Number(val))} size="sm" ariaLabel="Размер страницы" />
                    </label>
                </div>
                <div className={s.up_count}>
                    {total > 0 ? (
                    <>Показано {start + 1}–{end} из {total}</>
                    ) : (
                    <>Ничего не найдено</>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UsersToolbar;