import React from 'react'
import cn from "classnames"
import s from './Input.module.scss'

function Input({ ph, inputType, ...props }) {
  return (
    <input
      placeholder={ph}
      className={cn(s.wrapper, { [s.input_one]: inputType == 1 })}
      {...props}
    />
  );
}

export default Input