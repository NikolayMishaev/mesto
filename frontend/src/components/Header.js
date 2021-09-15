import React from "react";

export default function Header({ userEmail, headerLinkName, onSignOut }) {
  const [visibleHeaderMenu, setVisibleHeaderMenu] = React.useState(false);

  function handleClickMenu() {
    setVisibleHeaderMenu(!visibleHeaderMenu);
  }

  function handleSignOut() {
    setVisibleHeaderMenu(false);
    onSignOut();
  }

  return (
    <header className="header">
      <div className="header__logo"></div>
      <div
        className={` header__menu ${
          userEmail ? "header__menu_type_sign-in" : ""
        } ${visibleHeaderMenu ? "header__menu_type_active" : ""}`}
        onClick={handleClickMenu}
      ></div>
      <div
        className={` header__account-menu ${
          userEmail ? "header__account-menu_type_sign-in" : ""
        } ${visibleHeaderMenu ? "header__account-menu_type_visible" : ""}`}
      >
        <div className="header__wrapper-user-email">
          <p
            className={` header__user-email ${
              userEmail ? "header__user-email_type_sign-in" : ""
            }`}
          >
            {userEmail}
          </p>
        </div>
        <button
          type="button"
          className={` header__button ${
            userEmail ? "header__button_type_sign-in" : ""
          }`}
          onClick={handleSignOut}
        >
          {headerLinkName}
        </button>
      </div>
    </header>
  );
}
