import React, { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import useFormValidator from "../hooks/useFormValidator";

export default function EditAvatarPopup({
  isOpen,
  onClose,
  onUpdateAvatar,
  sendingState,
}) {
  const currentFormValidator = useFormValidator();

  useEffect(() => {
    currentFormValidator.resetForm();
  }, [isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: currentFormValidator.values.link,
    });
  }

  return (
    <PopupWithForm
      name="update-avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      buttonText={` ${sendingState ? sendingState : "Сохранить"} `}
      isDisabled={!currentFormValidator.isValid}
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          value={currentFormValidator.values.link || ""}
          onChange={currentFormValidator.handleChange}
          id="link-input-avatar"
          type="url"
          required
          name="link"
          placeholder="Ссылка на картинку"
          className={` popup__input ${
            currentFormValidator.errors.link ? "popup__input_type_error" : ""
          }`}
        />
        <span className="popup__input-error link-input-avatar-error">
          {currentFormValidator.errors.link}
        </span>
      </label>
    </PopupWithForm>
  );
}
