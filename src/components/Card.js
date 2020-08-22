import React from 'react'

function Card({card, onCardClick}) {
  function handleClick() {
    onCardClick(card);
  }

  return (
    <div className="elements__card">
      <img src={card.link} alt={card.name} className="elements__photo" onClick={handleClick} />
      <div className="elements__container">
        <p className="elements__title">{card.name}</p>
        <div className="elements__like-container">
          <button type="button" className="elements__like"/>
          <p className="elements__counter">{card.likes.length}</p>
        </div>
      </div>
      <button type="button" className="elements__trash-bin" />
    </div>
  )
}

export default Card;