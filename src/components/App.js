import React from 'react';
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'
import ImagePopup from './ImagePopup';
import DeleteCardPopup from './DeleteCardPopup'
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import {api} from "../utils/api";
import defaultAvatar from '../images/userpic.png'

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState('');
  const [currentUser, setCurrentUser] = React.useState({name: 'Имя', about: 'Информация', avatar: defaultAvatar});
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([user, cards]) => {
        setCurrentUser(user);
        setCards(cards);
      })
      .catch(handleError)
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
  function handleCardDeleteClick(card) {
    setSelectedCard(card);
    setIsDeleteCardPopupOpen(true);
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
        .catch(handleError)
    } else {
      api.likeCard(card._id)
        .then(handleResponseLike)
        .catch(handleError)
    }
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(()=>{
        const newCards = cards.filter((item)=>{
          return item !== card
        });
        setCards(newCards);
        setSelectedCard('');
        closeAllPopups();
      })
      .catch(handleError)
  }

  function handleUpdateUser({name, about}) {
    api.setUserInfo(name, about)
      .then((res)=>{
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(handleError)
  }

  function handleUpdateAvatar(avatar) {
    api.setAvatar(avatar)
      .then((res)=>{
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(handleError)
  }

  function handleAddPlaceSubmit({name, link}) {
    api.createCard(name, link)
      .then((res)=>{
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch(handleError)
  }

  function handleError(error) {
    console.error(error);
    return Promise.reject(error.message)
  }

  function closeAllPopups () {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeleteCardPopupOpen(false);
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

        {/*DELETE CARD POPUP*/}

        <DeleteCardPopup
          name="delete"
          isOpen={isDeleteCardPopupOpen}
          onClose={closeAllPopups}
          onDelete={handleCardDelete}
          selectedCard={selectedCard}
        />

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
            onCardDelete={handleCardDeleteClick}
          />

        {/*FOOTER*/}

        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;