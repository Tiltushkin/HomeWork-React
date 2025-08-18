import React from 'react';
import s from './Card.module.scss';
import Button from "../../UI/Buttons/Button.jsx";

function Card({ title, content, onClick, src, price }) {
    return (
        <div className={s.card}>
            <img
                className={s.image}
                src={src}
                alt="Product"
                loading="lazy"
            />
            <div className={s.content}>
                <h3 className={s.title}>{title}</h3>
                <p className={s.description}>{content}</p>
                <p className={s.price}>{price}</p>
                <Button onClick={onClick}>Buy</Button>
            </div>
        </div>
    );
}

export default Card;