import React, { useMemo, useState } from "react";
import s from "./BookList.module.scss";

type Book = {
  id: number;
  title: string;
  pages: number;
};

const BOOKS: Book[] = [
  { id: 1, title: "React для чайников", pages: 320 },
  { id: 2, title: "Чайник для JavaScript", pages: 300 },
  { id: 3, title: "Современный CSS", pages: 280 },
  { id: 4, title: "Алгоритмы на JS", pages: 500 },
];

type SortOrder = "asc" | "desc";

export default function BookList() {
  const [query, setQuery] = useState<string>("");
  const [minPages, setMinPages] = useState<string>("");
  const [rangeFrom, setRangeFrom] = useState<string>("");
  const [rangeTo, setRangeTo] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  const parseNum = (v: string): number | undefined => {
    const trimmed = v.trim();
    if (!trimmed) return undefined;
    const n = Number(trimmed);
    return Number.isFinite(n) ? n : undefined;
  };

  const { minBound, maxBound } = useMemo(() => {
    const minA = parseNum(minPages);
    const minB = parseNum(rangeFrom);
    const maxB = parseNum(rangeTo);

    const min = Math.max(
      Number.isFinite(minA ?? -Infinity) ? (minA as number) : -Infinity,
      Number.isFinite(minB ?? -Infinity) ? (minB as number) : -Infinity
    );
    return {
      minBound: Number.isFinite(min) ? min : undefined,
      maxBound: maxB,
    };
  }, [minPages, rangeFrom, rangeTo]);

  const filteredSorted = useMemo(() => {
    const q = query.trim().toLowerCase();

    const byQuery = (b: Book) =>
      !q || b.title.toLowerCase().includes(q);

    const byMin = (b: Book) =>
      minBound === undefined || b.pages >= minBound;

    const byMax = (b: Book) =>
      maxBound === undefined || b.pages <= maxBound;

    const result = BOOKS.filter((b) => byQuery(b) && byMin(b) && byMax(b));

    result.sort((a, b) =>
      sortOrder === "asc" ? a.pages - b.pages : b.pages - a.pages
    );

    return result;
  }, [query, minBound, maxBound, sortOrder]);

  const BIG_PAGES = 400;
  const { foundCount, bigCount } = useMemo(() => {
    const found = filteredSorted.length;
    const big = filteredSorted.reduce(
      (acc, b) => acc + (b.pages > BIG_PAGES ? 1 : 0),
      0
    );
    return { foundCount: found, bigCount: big };
  }, [filteredSorted]);

  const resetFilters = () => {
    setQuery("");
    setMinPages("");
    setRangeFrom("");
    setRangeTo("");
    setSortOrder("asc");
  };

  const invalidRange =
    parseNum(rangeFrom) !== undefined &&
    parseNum(rangeTo) !== undefined &&
    (parseNum(rangeFrom)! > parseNum(rangeTo)!);

  return (
    <section className={s.wrapper}>
      <header className={s.header}>
        <h1 className={s.title}>Список книг</h1>
        <div className={s.counters}>
          <span className={s.badge}>Найдено: {foundCount}</span>
          <span className={s.badgeSecondary}>
            &gt; {BIG_PAGES} стр.: {bigCount}
          </span>
        </div>
      </header>

      <div className={s.controls}>
        <div className={s.field}>
          <label htmlFor="q">Поиск по названию</label>
          <input
            id="q"
            type="text"
            placeholder="Например: React"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className={s.field}>
          <label htmlFor="min">Минимум страниц</label>
          <input
            id="min"
            type="number"
            min={0}
            placeholder="например: 300"
            value={minPages}
            onChange={(e) => setMinPages(e.target.value)}
          />
        </div>

        <div className={s.rangeRow}>
          <div className={s.field}>
            <label htmlFor="from">Диапазон: от</label>
            <input
              id="from"
              type="number"
              min={0}
              placeholder="от"
              value={rangeFrom}
              onChange={(e) => setRangeFrom(e.target.value)}
            />
          </div>
          <div className={s.field}>
            <label htmlFor="to">Диапазон: до</label>
            <input
              id="to"
              type="number"
              min={0}
              placeholder="до"
              value={rangeTo}
              onChange={(e) => setRangeTo(e.target.value)}
            />
          </div>
        </div>

        {invalidRange && (
          <div className={s.warning}>
            ⚠ Диапазон некорректен: значение «от» больше, чем «до».
          </div>
        )}

        <div className={s.field}>
          <label htmlFor="sort">Сортировка (страницы)</label>
          <select
            id="sort"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as SortOrder)}
          >
            <option value="asc">По возрастанию</option>
            <option value="desc">По убыванию</option>
          </select>
        </div>

        <div className={s.actions}>
          <button className={s.resetBtn} type="button" onClick={resetFilters}>
            Сбросить фильтры
          </button>
        </div>
      </div>

      <ul className={s.list}>
        {filteredSorted.map((b) => (
          <li key={b.id} className={s.card}>
            <div className={s.cardHeader}>
              <h3 className={s.cardTitle}>{b.title}</h3>
              <span className={s.pages}>{b.pages} стр.</span>
            </div>
          </li>
        ))}

        {filteredSorted.length === 0 && (
          <li className={s.empty}>Ничего не найдено. Попробуйте изменить фильтры.</li>
        )}
      </ul>
    </section>
  );
}