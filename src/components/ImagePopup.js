import React from 'react';

function ImagePopup(props) {
  return(
    <div className={`popup popup_type_max-photo ${props.isOpen ? 'popup_visibility_visible' : ''}`}>
      <div className="popup__container popup__container_type_photo">
        <button type="button" className="popup__exit" onClick={props.onClose}/>
        <img src={props.selectedCard ? props.selectedCard.link : ''} alt={props.selectedCard.name} className="popup__photo" />
        <h2 className="popup__photo-title">{props.selectedCard.name}</h2>
      </div>
    </div>
  )
}

export default ImagePopup;