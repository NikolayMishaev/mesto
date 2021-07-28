import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function DeleteCardPopup({
  isOpen,
  onClose,
  cardDelete,
  onCardDelete,
  sendingState,
}) {
  function handleSubmit(e) {
    e.preventDefault();
    onCardDelete(cardDelete);
  }

  return (
    <PopupWithForm
      name="delete-card"
      title="Вы уверены?"
      onClose={onClose}
      buttonText={` ${sendingState ? sendingState : "Да"} `}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    />
  );
}
