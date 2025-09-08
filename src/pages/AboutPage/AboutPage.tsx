import React from 'react'
import s from './AboutPage.module.scss'
import { useNavigate } from 'react-router-dom'

const AboutPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className={s.ap_main_wrapper}>
            <h2 className={s.ap_h2}>Тут будет распологаться информация о нас.</h2>
            <p className={s.ap_p}>Еще немного текста</p>
            <button className={s.ap_button} type={'button'} onClick={() => navigate('/')}>Главная</button>
        </div>
    )
}

export default AboutPage