import React from 'react';

function PopupWithForm({name, isOpen, onClose, onSubmit, children, submitButtonText, formClassNameMod}) {
  return(
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_visibility_visible' : ''}`}>
      <div className="popup__container">
        <button type="button"  className="popup__exit" onClick={onClose}/>
        <form noValidate className={`popup__form ${formClassNameMod}`} onSubmit={onSubmit} name={name} method="post" action="#">
          {children}
          <button type="submit" className="popup__save">{submitButtonText}</button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;