import React from 'react';
import s from './Card.module.scss';
import Button from "../../UI/Buttons/Button.jsx";

function Card({ title, content, onClick }) {
    return (
        <div className={s.card}>
            <img
                className={s.image}
                src="https://static.nix.ru/art/pic/web_news/2024/apr/ps1714229143.jpg"
                alt="Product"
                loading="lazy"
            />
            <div className={s.content}>
                <h3 className={s.title}>{title}</h3>
                <p className={s.description}>{content}</p>
                <Button text="Buy" onClick={onClick} />
            </div>
        </div>
    );
}

export default Card;