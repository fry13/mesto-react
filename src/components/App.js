import React from 'react';
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState('');

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }
  function handleCardClick(card) {
    setSelectedCard(card);
    setImagePopupOpen(true);
  }
  function closeAllPopups () {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setImagePopupOpen(false);
    setTimeout(function () {setSelectedCard('')}, 200)
  }

  return (
    <div className="page">

      {/*BIOGRAPHY POPUP*/}
      <PopupWithForm
        name="bio"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >
        <fieldset className="popup__input-container popup__form popup__form_type_two-inputs">
          <h2 className="popup__title">Редактировать профиль</h2>
          <input name="name" id="name-input" type="text" placeholder="Введите Ваше имя" required minLength="2" maxLength="40" className="popup__input popup__input_name" />
          <span id="name-input-error" className="popup__error"/>
          <input name="bio" id="bio-input" type="text" placeholder="Расскажите о себе" required minLength="2" maxLength="200" className="popup__input popup__input_bio" />
          <span id="bio-input-error" className="popup__error"/>
          <button type="submit" className="popup__save">Сохранить</button>
        </fieldset>
      </PopupWithForm>

      {/*CARD POPUP*/}
      <PopupWithForm
        name="card"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      >
        <fieldset className="popup__input-container popup__form popup__form_type_two-inputs">
          <h2 className="popup__title">Новое место</h2>
          <input name="name" id="title-input" type="text" placeholder="Название" required minLength="2" maxLength="30" className="popup__input popup__input_title" />
          <span id="title-input-error" className="popup__error"/>
          <input name="link" id="link-input" type="url" placeholder="Ссылка на картинку" required className="popup__input popup__input_link" />
          <span id="link-input-error" className="popup__error"/>
          <button type="submit" disabled className="popup__save popup__save_disabled">Сохранить</button>
        </fieldset>
      </PopupWithForm>

      {/*CHANGE AVATAR POPUP*/}
      <PopupWithForm
        name="avatar"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
        <fieldset className="popup__input-container popup__form popup__form_type_one-input">
          <h2 className="popup__title">Обновить аватар</h2>
          <input name="avatar" id="avatar-input" type="url" placeholder="Ссылка на картинку" required className="popup__input popup__input_link" />
          <span id="avatar-input-error" className="popup__error"/>
          <button type="submit" disabled className="popup__save popup__save_disabled">Сохранить</button>
        </fieldset>
      </PopupWithForm>

      {/*DELETE CARD POPUP*/}
      <PopupWithForm
        name="delete"
        isOpen=""
        onClose={closeAllPopups}
      >
        <fieldset className="popup__input-container popup__form popup__form_type_no-input">
          <h2 className="popup__title">Вы уверены?</h2>
          <button type="submit" className="popup__save">Да</button>
        </fieldset>
      </PopupWithForm>

      {/*PHOTO POPUP*/}
      <ImagePopup
        isOpen={isImagePopupOpen}
        onClose={closeAllPopups}
        selectedCard={selectedCard}
      />

      {/*HEADER*/}
      <Header />

      {/*PROFILE and ELEMENTS*/}
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
      />

      {/*FOOTER*/}
      <Footer />
    </div>

  );
}

export default App;