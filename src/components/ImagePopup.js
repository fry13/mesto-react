import React from 'react';

function ImagePopup({isOpen, onClose, selectedCard}) {
  return(
    <div className={`popup popup_type_max-photo ${isOpen ? 'popup_visibility_visible' : ''}`}>
      <div className="popup__container popup__container_type_photo">
        <button type="button" className="popup__exit" onClick={onClose}/>
        <img src={selectedCard ? selectedCard.link : ''} alt={selectedCard.name} className="popup__photo" />
        <h2 className="popup__photo-title">{selectedCard.name}</h2>
      </div>
    </div>
  )
}

export default ImagePopup;