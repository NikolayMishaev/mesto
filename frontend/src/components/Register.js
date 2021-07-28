import React from "react";
import { Link } from "react-router-dom";
import useFormValidator from "../hooks/useFormValidator";

export default function Register({ onSignOut, onRegister }) {
  const currentFormValidator = useFormValidator();

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(
      currentFormValidator.values.email,
      currentFormValidator.values.password
    );
  } 

  return (
    <div className="entry">
      <h2 className="entry__title">Регистрация</h2>
      <form
        className="entry__form"
        noValidate
        action="#"
        method="POST"
        name="register"
        onSubmit={handleSubmit}
      >
        <label className="entry__field">
          <input
            id="entry-input-email"
            required
            name="email"
            minLength="5"
            maxLength="40"
            placeholder="Email"
            className={` entry__input ${
              currentFormValidator.errors.email ? "entry__input_type_error" : ""
            }`}
            type="email"
            value={currentFormValidator.values.email || ""}
            onChange={currentFormValidator.handleChange}
          />
          <span className="entry__input-error entry-input-email-error">
            {currentFormValidator.errors.email}
          </span>
        </label>
        <label className="entry__field">
          <input
            id="entry-input-password"
            required
            name="password"
            minLength="5"
            maxLength="40"
            placeholder="Пароль"
            className={` entry__input ${
              currentFormValidator.errors.password
                ? "entry__input_type_error"
                : ""
            }`}
            type="password"
            value={currentFormValidator.values.password || ""}
            onChange={currentFormValidator.handleChange}
          />
          <span className="entry__input-error entry-input-email-error">
            {currentFormValidator.errors.password}
          </span>
        </label>
        <button
          aria-label="submit form"
          className={` entry__button-submit ${
            !currentFormValidator.isValid ? "entry__button-submit_disabled" : ""
          } `}
          type="submit"
          disabled={!currentFormValidator.isValid}
        >
          Зарегистрироваться
        </button>
        <Link className="entry__link" to="/sign-in" onClick={onSignOut}>
          Уже зарегистрированы? Войти
        </Link>
      </form>
    </div>
  );
}
