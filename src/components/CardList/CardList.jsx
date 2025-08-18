import React from 'react';
import s from "./CardList.module.scss";
import Card from "../Card/Card.jsx";

function CardList() {
    const test = () => {
        console.log('test');
    }

    return (
       <div className={s.list}>
           <Card title={ "Logitech G Pro X" } content={ "Best gaming mouse" } onClick={ test }/>
       </div>
    )
}

export default CardList;