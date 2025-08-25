import React, { useState, useMemo } from 'react';
import s from './ListFiltered.module.scss';
import utils from '../utils/utils';

const products = [
    { id: 1, name: "Клавиатура", price: 15000 },
    { id: 2, name: "Мышка", price: 30000 },
    { id: 3, name: "Кресло", price: 60000 },
    { id: 4, name: "Стол", price: 120000 },
    { id: 5, name: "Монитор", price: 240000 }
];

function ListFiltered() {
    const [query, setQuery] = useState("");
    const [priceSortOrder, setPriceSortOrder] = useState('asc');
    const [nameSortOrder, setNameSortOrder] = useState('');
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [caseSensitive, setCaseSensitive] = useState(false);

    const { visibleProducts, expensiveCount } = useMemo(() => {
        const min = Number(minPrice);
        const max = Number(maxPrice);

        let filtered = products.filter((p) => {
            const name = caseSensitive ? p.name : p.name.toLowerCase();
            const search = caseSensitive ? query : query.toLowerCase();
            return name.includes(search);
        });

        if (minPrice || maxPrice) {
            filtered = filtered.filter((p) =>
                (minPrice ? p.price >= min : true) &&
                (maxPrice ? p.price <= max : true)
            );
        }

        const expensive = (minPrice || maxPrice)
            ? products.filter(p => p.price > min && p.price > max).length
            : 0;

        filtered.sort((a, b) => {
            return priceSortOrder === 'asc'
                ? a.price - b.price
                : b.price - a.price;
        });

        if (nameSortOrder === 'asc' || nameSortOrder === 'desc') {
            filtered.sort((a, b) => {
                const nameA = caseSensitive ? a.name : a.name.toLowerCase();
                const nameB = caseSensitive ? b.name : b.name.toLowerCase();

                if (nameA < nameB) return nameSortOrder === 'asc' ? -1 : 1;
                if (nameA > nameB) return nameSortOrder === 'asc' ? 1 : -1;
                return 0;
            });
        }

        return { visibleProducts: filtered, expensiveCount: expensive };
    }, [query, minPrice, maxPrice, priceSortOrder, nameSortOrder, caseSensitive]);

    function togglePriceSort() {
        setPriceSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
        setNameSortOrder('');
    }

    function toggleNameSort() {
        setNameSortOrder(prev =>
            !prev ? 'asc' : prev === 'asc' ? 'desc' : ''
        );
    }

    return (
        <div className={s.wrapper}>
            <h2>Список товаров</h2>
            <div className={s.filters}>
                <input
                    className={s.input}
                    placeholder="Поиск по названию"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    type="text"
                />
                <input
                    className={s.input}
                    placeholder="Минимальная цена"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    type="number"
                />
                <input
                    className={s.input}
                    placeholder="Максимальная цена"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    type="number"
                />
            </div>
            <div className={s.buttons}>
                <button className={s.buttonPrice} onClick={togglePriceSort}>
                    Сортировать по цене
                </button>
                <button className={s.buttonName} onClick={toggleNameSort}>
                    Сортировать по имени (А-Я / Я-А)
                </button>
                <button className={s.buttonCase} onClick={() => setCaseSensitive(prev => !prev)}>
                    {caseSensitive ? "Чувствительно к регистру: Включено" : "Чувствительно к регистру: Выключено"}
                </button>
            </div>
            <br />
            {visibleProducts.length === 0 ? (
                <div>
                    <p className={s.noProducts}>Нет товаров, соответствующих фильтрам.</p>
                    {expensiveCount > 0 && (
                        <p className={s.expensiveCount}>
                            Количество товаров, дороже выбранной вами цены: {expensiveCount}
                        </p>
                    )}
                </div>
            ) : (
                <>
                    {expensiveCount > 0 && (
                        <p className={s.expensiveCount}>
                            Количество товаров, дороже выбранной вами цены: {expensiveCount}
                        </p>
                    )}
                    <ul>
                        {visibleProducts.map((p) => (
                            <li key={p.id}>
                                {p.name} - {utils.ssp(p.price)}₸
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
}

export default ListFiltered;