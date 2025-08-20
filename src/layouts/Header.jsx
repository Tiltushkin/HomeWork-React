import React from 'react'
import s from './Layout.module.scss'
import Button from '../UI/Buttons/Button'

function Header() {
  return (
    <header className={s.header}>
      <div className={s.header__content}>
        Header
        <Button border={true} >Типо кнопка</Button>
      </div>
    </header>
  )
}

export default Header