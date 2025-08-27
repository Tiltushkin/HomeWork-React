import React from 'react';
import s from './Button.module.scss'
import cn from "classnames"

function Button({ onClick, disabled, children }) {
    return (
        <button
            disabled={ disabled }
            className={cn(s.wrapper, { [s.dis]: disabled })}
            onClick={ onClick }>{children}
        </button>
    )
}

export default Button;