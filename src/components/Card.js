import React from 'react';

function Card({card, onCardClick, onCardLike, onCardDelete, cardDeleteButtonClassName, cardLikeButtonClassName}) {
  function handleClick() {
    onCardClick(card);
  }
  function handleLike() {
    onCardLike(card)
  }
  function handleDelete() {
    onCardDelete(card)
  }

  return (
    <div className="elements__card">
      <img src={card.link} alt={card.name} className="elements__photo" onClick={handleClick} />
      <div className="elements__container">
        <p className="elements__title">{card.name}</p>
        <div className="elements__like-container">
          <button type="button" onClick={handleLike} className={cardLikeButtonClassName}/>
          <p className="elements__counter">{card.likes.length}</p>
        </div>
      </div>
      <button type="button" onClick={handleDelete} className={`elements__trash-bin ${cardDeleteButtonClassName}`} />
    </div>
  )
}

export default Card;