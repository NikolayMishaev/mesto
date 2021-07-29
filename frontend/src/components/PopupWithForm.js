import React from "react";
import Popup from "./Popup";

export default function PopupWithForm({
  name,
  title,
  isOpen,
  onClose,
  children,
  isDisabled = false,
  buttonText,
  onSubmit,
}) {
  return (
    <Popup onClose={onClose} name={name} isOpen={isOpen} title={title}>
      <form
        onSubmit={onSubmit}
        noValidate
        action="#"
        name={name}
        className={`popup__form popup__form_type_${name}`}
        method="POST"
      >
        {children}
        <button
          disabled={isDisabled}
          aria-label="submit form"
          className={`popup__button-submit ${
            isDisabled ? "popup__button-submit_disabled" : ""
          } popup__button-submit_type_${name}`}
          type="submit"
        >
          {buttonText}
        </button>
      </form>
    </Popup>
  );
}
