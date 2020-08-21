import React from 'react';
import {api} from '../utils/api';
import Card from './Card';
import defaultAvatar from '../images/userpic.png'

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick}) {

  const [userName, setUserName] = React.useState(false);
  const [userDescription, setUserDescription ] = React.useState(false);
  const [userAvatar, setUserAvatar] = React.useState("");
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([{name, about, avatar}, cards]) => {
        setUserName(name);
        setUserDescription(about);
        setUserAvatar(avatar);
        setCards(cards);
        })
  },[])


  return(
    <>
      <section className="profile">
        <button className="profile__button-avatar" onClick={onEditAvatar}>
          <img src={userAvatar ? userAvatar : defaultAvatar} alt="Ваш аватар" className="profile__avatar" />
        </button>

        <div className="profile__name-container">
          <h1 className="profile__name">{userName ? userName : 'Имя'}</h1>
          <button type="button" className="profile__button-edit" onClick={onEditProfile}/>
        </div>
        <p className="profile__bio">{userDescription ? userDescription : 'Информация'}</p>
        <button type="button" className="profile__button-add" onClick={onAddPlace}/>
      </section>
      <main className="elements">
        {cards.map((card) => {
          return(
            <Card key={card._id} card={card} onCardClick={onCardClick}/>
          )
        }
        )}
      </main>
    </>
  );
}

export default Main;