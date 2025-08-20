import React from 'react';
import ListItem from './ListItem';
import Button from '../../UI/Buttons/Button';
import s from './List.module.scss';

function List({ items, onDelete }) {
  return (
    <div>
      <ul className={s.list}>
        {items.map((item, index) => (
          <ListItem key={index}>
            <h4>{item.title}</h4>
            <p>{item.text}</p>
            <Button onClick={() => onDelete(index)}>Удалить</Button>
          </ListItem>
        ))}
      </ul>
    </div>
  );
}

export default List