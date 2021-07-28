import  React, { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import useFormValidator from "../hooks/useFormValidator";

export default function AddPlacePopup({
  isOpen,
  onClose,
  onAddPlace,
  sendingState,
}) {
  const currentFormValidator = useFormValidator();

  useEffect(() => {
    currentFormValidator.resetForm();
  }, [isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: currentFormValidator.values.name,
      link: currentFormValidator.values.link,
    });
  }

  return (
    <PopupWithForm
      name="add-card"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      buttonText={` ${sendingState ? sendingState : "Создать"} `}
      isDisabled={!currentFormValidator.isValid}
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          value={currentFormValidator.values.name || ""}
          onChange={currentFormValidator.handleChange}
          id="name-input-add"
          required
          name="name"
          minLength="2"
          maxLength="30"
          placeholder="Название"
          className={` popup__input ${
            currentFormValidator.errors.name ? "popup__input_type_error" : ""
          }`}
          type="text"
        />
        <span className="popup__input-error name-input-add-error">
          {currentFormValidator.errors.name}
        </span>
      </label>
      <label className="popup__field">
        <input
          value={currentFormValidator.values.link || ""}
          onChange={currentFormValidator.handleChange}
          id="link-input"
          type="url"
          required
          name="link"
          placeholder="Ссылка на картинку"
          className={` popup__input ${
            currentFormValidator.errors.link ? "popup__input_type_error" : ""
          }`}
        />
        <span className="popup__input-error name-input-add-error">
          {currentFormValidator.errors.link}
        </span>
      </label>
    </PopupWithForm>
  );
}
