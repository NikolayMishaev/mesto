import  React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;
  const cardDeleteButtonClassName = ` ${isOwn ? "card__delete" : ""} `;
  const isLiked = card.likes.some((i) => i === currentUser._id);

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="card">
      <div
        className="card__place"
        style={{ backgroundImage: `url(${card.link})` }}
        onClick={handleClick}
      ></div>
      <h2 className="card__title">{card.name}</h2>
      <button
        onClick={handleLikeClick}
        type="button"
        aria-label="like toggle"
        className={`  card__like  ${isLiked ? "card__like_active" : ""}  `}
      >
        <p className="card__likes-counter">{card.likes.length}</p>
      </button>
      <div
        onClick={handleDeleteClick}
        className={cardDeleteButtonClassName}
      ></div>
    </li>
  );
}
