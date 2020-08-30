import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleNameChange(input) {
    setName(input.target.value);
  }

  function handleDescriptionChange(input) {
    setDescription(input.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({name, about: description});
  }

  return (
    <PopupWithForm
      name="bio"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__input-container popup__form popup__form_type_two-inputs">
        <h2 className="popup__title">Редактировать профиль</h2>
        <input
          name="name"
          value={name}
          onChange={handleNameChange}
          id="name-input"
          type="text"
          placeholder="Введите Ваше имя"
          required
          minLength="2"
          maxLength="40"
          className="popup__input popup__input_name"
        />
        <span id="name-input-error" className="popup__error"/>
        <input
          name="bio"
          value={description}
          onChange={handleDescriptionChange}
          id="bio-input"
          type="text"
          placeholder="Расскажите о себе"
          required
          minLength="2"
          maxLength="200"
          className="popup__input popup__input_bio" />
        <span id="bio-input-error" className="popup__error"/>
        <button type="submit" className="popup__save">Сохранить</button>
      </fieldset>
    </PopupWithForm>
  )
}

export default EditProfilePopup;