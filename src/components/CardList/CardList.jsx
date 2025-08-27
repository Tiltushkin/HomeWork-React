import React from 'react'
import s from './CardList.module.scss'
import Card from '../Card/Card'

function CardList({ cards }) {
    function cardLog(id) {
      const card = cards.find((x) => x.id == id)
      if (card) {
        card.count > 0 ? card.count-- : null
      }
    }

    return (
      <div className={s.wrapper}>
        {cards.map((card) => (
          <Card
            key={card.id}
            title={card.title}
            description={card.description}
            imageUrl={card.imageUrl}
            isHighlighted={card.isHighlighted}
            count={card.count}
            onCardClick={() => cardLog(card.id)}
          />
        ))}
      </div>
    )
}

export default CardList