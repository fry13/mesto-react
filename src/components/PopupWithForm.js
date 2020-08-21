import React from 'react';

function PopupWithForm(props) {
  return(
    <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_visibility_visible' : ''}`}>
      <div className="popup__container">
        <button type="button" className="popup__exit" onClick={props.onClose}/>
        <form noValidate name={props.name} method="post" action="#">
          {props.children}
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;