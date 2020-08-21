import React from 'react';
import {api} from '../utils/Api';
import Card from './Card';
import defaultAvatar from '../images/userpic.png'

function Main(props) {

  const [userName, setUserName] = React.useState(false);
  const [userDescription, setUserDescription ] = React.useState(false);
  const [userAvatar, setUserAvatar] = React.useState("");
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getUserInfo()
      .then((res) => {
        setUserName(res.name);
        setUserDescription(res.about);
        setUserAvatar(res.avatar);
        })
  },[])

  React.useEffect(() => {
    api.getInitialCards()
      .then((res) => {
        setCards(res);
      })
  },[])

  return(
    <>
      <section className="profile">
        <button className="profile__button-avatar" onClick={props.onEditAvatar}>
          <img src={userAvatar ? userAvatar : defaultAvatar} alt="Ваш аватар" className="profile__avatar" />
        </button>

        <div className="profile__name-container">
          <h1 className="profile__name">{userName ? userName : 'Имя'}</h1>
          <button type="button" className="profile__button-edit" onClick={props.onEditProfile}/>
        </div>
        <p className="profile__bio">{userDescription ? userDescription : 'Информация'}</p>
        <button type="button" className="profile__button-add" onClick={props.onAddPlace}/>
      </section>
      <main className="elements">
        {cards.map((card) => {
          return(
            <Card key={card._id} card={card} onCardClick={props.onCardClick}/>
          )
        }
        )}
      </main>
    </>
  );
}

export default Main;