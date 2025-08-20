import React, { useState } from 'react'
import Button from '../../UI/Buttons/Button'
import Input from '../../UI/Inputs/Input'
import s from './Adder.module.scss'

function Adder({ onSubmit }) {
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        if (!title.trim() && !text.trim()) return;
        onSubmit({ title: title.trim(), text: text.trim() });
        setTitle('');
        setText('');
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className={s.wrapper}>
                <Input
                    ph="Title"
                    inputType={1}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <Input
                    ph="Text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <Button>submit</Button>
            </form>
        </div>
    )
}

export default Adder