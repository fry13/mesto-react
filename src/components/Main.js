import React from 'react';
import Card from './Card';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import defaultAvatar from '../images/userpic.png'

function Main({cards, onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete}) {
  const {avatar, name, about, _id} = React.useContext(CurrentUserContext);

  return(
    <>
      <section className="profile">
        <button className="profile__button-avatar" onClick={onEditAvatar}>
          <img src={avatar ? avatar : defaultAvatar} alt="Ваш аватар" className="profile__avatar" />
        </button>

        <div className="profile__name-container">
          <h1 className="profile__name">{name ? name : 'Имя'}</h1>
          <button type="button" className="profile__button-edit" onClick={onEditProfile}/>
        </div>
        <p className="profile__bio">{about ? about : 'Информация'}</p>
        <button type="button" className="profile__button-add" onClick={onAddPlace}/>
      </section>
      <main className="elements">
        {cards.map((card) => {
            const isOwn = card.owner._id === _id;
            const cardDeleteButtonClassName = `elements__trash-bin ${isOwn ? 'elements__trash-bin_visible' : 'elements__trash-bin_hidden'}`;
            const isLiked = card.likes.some(i => i._id === _id);
            const cardLikeButtonClassName = `elements__like ${isLiked ? 'elements__like_active' : 'elements__like'}`;
          return(
            <Card
              key={card._id}
              card={card}
              cardDeleteButtonClassName={cardDeleteButtonClassName}
              cardLikeButtonClassName={cardLikeButtonClassName}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          )
        }
        )}
      </main>
    </>
  );
}

export default Main;