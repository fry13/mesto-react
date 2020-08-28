import React from 'react';
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'
import ImagePopup from './ImagePopup';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import {api} from "../utils/api";

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  // const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState('');
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([user, cards]) => {
        setCurrentUser(user);
        setCards(cards);
      })
  },[])

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

  function handleCardLike(card) {
    const isLiked = card.likes.some(item => item._id === currentUser._id);

    function handleResponseLike(newCard) {
      const newCards = cards.map((item) => item._id === card._id ? newCard : item);
      setCards(newCards);
    }

    if (isLiked) {
      api.dislikeCard(card._id)
        .then(handleResponseLike)
    } else {
      api.likeCard(card._id)
        .then(handleResponseLike)
    }
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(()=>{
        const newCards = cards.filter((item)=>{
          return item !== card
        });
        setCards(newCards);
      })
  }

  function handleUpdateUser({name, about}) {
    api.setUserInfo(name, about)
      .then((res)=>{
        setCurrentUser(res);
        closeAllPopups();
      })
  }

  function handleUpdateAvatar(avatar) {
    api.setAvatar(avatar)
      .then((res)=>{
        setCurrentUser(res);
        closeAllPopups();
      })
  }

  function handleAddPlaceSubmit({name, link}) {
    api.createCard(name, link)
      .then((res)=>{
        setCards([res, ...cards]);
        closeAllPopups();
      })
  }

  function closeAllPopups () {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setImagePopupOpen(false);
    setTimeout(function () {setSelectedCard('')}, 200);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">

        {/*BIOGRAPHY POPUP*/}

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        {/*CARD POPUP*/}

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        {/*CHANGE AVATAR POPUP*/}

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        {/*/!*DELETE CARD POPUP*!/*/}

        {/*<PopupWithForm*/}
        {/*  name="delete"*/}
        {/*  isOpen=""*/}
        {/*  onClose={closeAllPopups}*/}
        {/*>*/}
        {/*  <fieldset className="popup__input-container popup__form popup__form_type_no-input">*/}
        {/*    <h2 className="popup__title">Вы уверены?</h2>*/}
        {/*    <button type="submit" className="popup__save">Да</button>*/}
        {/*  </fieldset>*/}
        {/*</PopupWithForm>*/}

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
            cards={cards}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />

        {/*FOOTER*/}

        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;