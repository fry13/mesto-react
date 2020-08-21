import React from 'react'

function Card(props) {
  function handleClick() {
    props.onCardClick(props.card);
  }

  return (
    <div className="elements__card">
      <img src={props.card.link} alt={props.card.name} className="elements__photo" onClick={handleClick} />
      <div className="elements__container">
        <p className="elements__title">{props.card.name}</p>
        <div className="elements__like-container">
          <button type="button" className="elements__like"/>
          <p className="elements__counter">{props.card.likes.length}</p>
        </div>
      </div>
      <button type="button" className="elements__trash-bin" />
    </div>
  )
}

export default Card;