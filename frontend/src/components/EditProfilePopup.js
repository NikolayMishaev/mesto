import React, { useEffect, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import useFormValidator from "../hooks/useFormValidator";

export default function EditProfilePopup({
  onUpdateUser,
  isOpen,
  onClose,
  sendingState,
}) {
  const currentFormValidator = useFormValidator();
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    if (currentUser.name) {
      currentFormValidator.resetForm();
      currentFormValidator.setValues({
        ...currentFormValidator.values,
        name: currentUser.name,
        about: currentUser.about,
      });
      currentFormValidator.setIsValid(true);
    }
  }, [currentUser, isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: currentFormValidator.values.name,
      about: currentFormValidator.values.about,
    });
  }

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      buttonText={` ${sendingState ? sendingState : "Сохранить"} `}
      isDisabled={!currentFormValidator.isValid}
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          value={currentFormValidator.values.name || ""}
          onChange={currentFormValidator.handleChange}
          id="name-input-edit"
          required
          name="name"
          minLength="2"
          maxLength="40"
          placeholder="Имя"
          className={` popup__input ${
            currentFormValidator.errors.name ? "popup__input_type_error" : ""
          }`}
          type="text"
        />
        <span className="popup__input-error name-input-edit-error">
          {currentFormValidator.errors.name}
        </span>
      </label>
      <label className="popup__field">
        <input
          value={currentFormValidator.values.about || ""}
          onChange={currentFormValidator.handleChange}
          id="job-input"
          required
          name="about"
          minLength="2"
          maxLength="200"
          placeholder="О себе"
          className={` popup__input ${
            currentFormValidator.errors.about ? "popup__input_type_error" : ""
          }`}
          type="text"
        />
        <span className="popup__input-error job-input-error">
          {currentFormValidator.errors.about}
        </span>
      </label>
    </PopupWithForm>
  );
}
