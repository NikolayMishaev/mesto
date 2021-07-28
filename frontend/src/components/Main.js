import React, { useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Main({
  onCardClick,
  onAddPlace,
  onEditProfile,
  onEditAvatar,
  cards,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <button
          type="button"
          aria-label="edit avatar image"
          className="profile__avatar"
          onClick={onEditAvatar}
          style={{ backgroundImage: `url(${currentUser.avatar})` }}
        ></button>
        <div className="profile__info">
          <h1 className="profile__title">{currentUser.name}</h1>
          <button
            type="button"
            aria-label="edit profile"
            className="profile__edit-button"
            onClick={onEditProfile}
          ></button>
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>
        <button
          type="button"
          aria-label="add image"
          className="profile__add-button"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="places">
        <ul className="cards">
          {cards.map((card) => (
            <Card
              onCardDelete={onCardDelete}
              onCardLike={onCardLike}
              card={card}
              key={card._id}
              onCardClick={onCardClick}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}
