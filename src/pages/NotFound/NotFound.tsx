import React from 'react'
import s from './NotFound.module.scss'
import { useNavigate } from 'react-router-dom'

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={s.nf_main_wrapper}>
      <h2 className={s.nf_h2}>404 - Not Found</h2>
      <button className={s.nf_button} type={'button'} onClick={() => navigate('/')}>Главная</button>
    </div>
  )
}

export default NotFound