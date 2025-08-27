import React from 'react'
import s from './Card.module.scss'
import cn from 'classnames'

function Card({ title, description = "", imageUrl = "", isHighlighted = false, count = 0, onCardClick }) {
    if (!title) return;

    return (
        <div className={
            cn(s.card,
                { [s.highlighted]: isHighlighted },
                { [s.withImage]: imageUrl.length > 0 },
                { [s.sold]: count <= 0 }
            )
        } onClick={onCardClick} style={
                imageUrl ? { backgroundImage: `url(${imageUrl})` }
                : count <= 0 && imageUrl ? { backgroundColor: `rgba(0, 0, 0, 0.65)` }
                : count <= 0 && !imageUrl ? { backgroundColor: '#0b1630' }
                : {}
            }>
            <p className={s.card__title}>{ title }</p>
            <br />
            {description && (
                    <p className={s.card__description}>{ description }</p>
                )
            }
            {count <= 0 && (
                <p className={s.card__sold}>SOLDED</p>
            )}
        </div>
    )
}

export default Card