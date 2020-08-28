import React from 'react';

function PopupWithForm({name, isOpen, onClose, onSubmit, children}) {
  return(
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_visibility_visible' : ''}`}>
      <div className="popup__container">
        <button type="button" className="popup__exit" onClick={onClose}/>
        <form noValidate onSubmit={onSubmit} name={name} method="post" action="#">
          {children}
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;