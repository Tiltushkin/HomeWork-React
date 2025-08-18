import React from 'react';
import s from './Button.module.scss'

function Button({ onClick, children }) {
    return (
        <button className={ s.wrapper } onClick={ onClick }>{children}</button>
    )
}

export default Button;