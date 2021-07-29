import React from "react";
import Popup from "./Popup";

export default function ImagePopup({ card, onClose, isOpen }) {
  return (
    <Popup name="fullscreen" isOpen={isOpen} onClose={onClose}>
      <figure className="popup__fullscreen-figure">
        <img
          src={`${card.link}`}
          alt={card.name}
          className="popup__fullscreen-image"
        />
        <figcaption className="popup__caption">{card.name}</figcaption>
      </figure>
    </Popup>
  );
}
