import React from "react";
import Popup from "./Popup";

export default function InfoTooltip({ onClose, statusRegister, isOpen, name }) {
  return (
    <Popup
      onClose={onClose}
      name={name}
      isOpen={isOpen}
      title={
        statusRegister
          ? "Вы успешно зарегистрировались!"
          : "Что-то пошло не так! Попробуйте ещё раз."
      }
    >
      <div
        className={`popup__image popup__image_type_${
          statusRegister ? "success" : "failure"
        }`}
      ></div>
    </Popup>
  );
}
