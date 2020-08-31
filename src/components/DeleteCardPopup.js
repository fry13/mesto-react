import React from 'react';
import PopupWithForm from "./PopupWithForm";

function DeleteCardPopup({isOpen, onClose, onDelete, selectedCard}) {

  function handleSubmit(evt) {
    evt.preventDefault();
    onDelete(selectedCard);
  }

  return (
    <PopupWithForm
      name="bio"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      submitButtonText="Да"
      formClassNameMod="popup__form_type_no-input"
    >
      <fieldset className="popup__input-container">
        <h2 className="popup__title">Вы уверены?</h2>
      </fieldset>
    </PopupWithForm>
  )
}

export default DeleteCardPopup;