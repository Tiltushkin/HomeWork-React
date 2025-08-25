import React, { useState } from 'react'
import s from './ListFiltered.module.scss'

const products = [
    { id: 1, name: "Клавиатура", price: 15000 },
    { id: 2, name: "Мышка", price: 30000 },
    { id: 3, name: "Кресло", price: 60000 }
]

function ListFiltered() {
    const [query, setQuery] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");
    const [minPrice, setMinPrice] = useState("");

    const filtered = products
    .filter((p) => p.name.toLowerCase().includes(query.toLowerCase()))
    .filter((p) => {
        if (!minPrice) return true
        return p.price >= Number(minPrice)
    })

    const visible = [...filtered].sort((a, b) => 
        sortOrder == "asc" ? a.price - b.price : b.price - a.price
    )

    return (
        <div>
            <h2>Список товаров</h2>
            <input
                placeholder="Поиск по названию"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                type='text'
            />
            <br />
            <input
                placeholder="Минимальная цена"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                type='number'
            />
            <br />
            <button
            onClick={() => setSortOrder(s => (s == "asc" ? "desc" : "asc"))}>
                Сортировать по цене
            </button>
            <ul>
                {visible.map((p) => (
                    <li key={p.id}>
                        {p.name} - {p.price}тг
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ListFiltered