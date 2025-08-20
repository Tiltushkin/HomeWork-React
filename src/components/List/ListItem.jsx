import React from 'react'
import s from './List.module.scss'

function ListItem({ children }) {
  return (
    <li className={s.item}>
        { children }
    </li>
  )
}

export default ListItem