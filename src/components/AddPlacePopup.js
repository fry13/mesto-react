import React from 'react';
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({isOpen, onClose, onAddPlace}) {
  const placeTitleRef = React.useRef()
  const placeLinkRef = React.useRef()

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace({
      name: placeTitleRef.current.value,
      link: placeLinkRef.current.value
    });

  }

  return(
    <PopupWithForm
      name="card"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__input-container popup__form popup__form_type_two-inputs">
        <h2 className="popup__title">Новое место</h2>
        <input
          name="name"
          ref={placeTitleRef}
          id="title-input"
          type="text"
          placeholder="Название"
          required
          minLength="2"
          maxLength="30"
          className="popup__input popup__input_title"
        />
        <span id="title-input-error" className="popup__error"/>
        <input
          name="link"
          ref={placeLinkRef}
          id="link-input"
          type="url"
          placeholder="Ссылка на картинку"
          required
          className="popup__input popup__input_link"
        />
        <span id="link-input-error" className="popup__error"/>
        <button type="submit" className="popup__save">Сохранить</button>
      </fieldset>
    </PopupWithForm>
  )
}

export default AddPlacePopup;