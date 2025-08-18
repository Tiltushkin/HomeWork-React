import React from 'react';
import s from "./CardList.module.scss";
import Card from "../Card/Card.jsx";

function CardList() {
    const test = () => {
        console.log('test');
    }

    return (
       <div className={s.list}>
           <Card title={ "Logitech G Pro X" } content={ "Best gaming mouse" } onClick={ test } price={"50.000 ₸"} src={"https://static.nix.ru/art/pic/web_news/2024/apr/ps1714229143.jpg"}/>
           <Card title={ "Logitech G Pro X Wireless Headset" } content={ "Best gaming headset" } onClick={ test } price={"75.000 ₸"} src={"https://pics.computerbase.de/1/0/7/6/5/3-575e5302cedfa750/article-1280x720.56f8692e.jpg"}/>
           <Card title={ "Logitech G Pro X Wireless Keyboard" } content={ "Best gaming keyboard" } onClick={ test } price={"60.000 ₸"} src={"https://s1.q4cdn.com/104539020/files/doc_multimedia/PROX2-Landscape-21.jpg"}/>
       </div>
    )
}

export default CardList;