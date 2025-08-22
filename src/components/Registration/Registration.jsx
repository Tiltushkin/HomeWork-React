import React, { useState } from 'react'
import s from './Registration.module.scss'
import Input from '../../UI/Inputs/Input'
import Button from '../../UI/Buttons/Button'

function Registration({ onSubmit }) {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        if (!name.trim() || !password.trim() || validatePassword() == 1) return;
        onSubmit({ name: name.trim(), password: password.trim() });
        setName('');
        setPassword('');
    }

    function validatePassword() {
        if ((password.trim() && password.trim().length < 5) || !password.trim()) return 1;
        return 0
    }

    function validateButton() {
        return validatePassword() == 1 || name.trim().length < 1
    }

    return (
        <div className={s.wrapper}>
            <h2 className={s.wrapper__title}>Registration</h2>
            <form className={s.wrapper__form} onSubmit={handleSubmit}>
                <Input
                    ph="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <Input
                    ph="Password"
                    inputType={validatePassword()}
                    value={password}

                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button disabled={validateButton()} >Submit</Button>
            </form>
        </div>
    )
}

export default Registration