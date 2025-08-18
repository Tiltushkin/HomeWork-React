import React from 'react';
import s from './Button.module.scss'

function Button({ onClick, text }) {
    return (
        <button className={ s.wrapper } onClick={ onClick }>
            { text }
        </button>
    )
}

export default Button;