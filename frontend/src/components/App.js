import React, { useEffect, useState } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeleteCardPopup from "./DeleteCardPopup";
import {
  Redirect,
  Route,
  Switch,
  useHistory,
  useLocation,
} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import { register, login, getContent } from "../utils/auth";
import ErrorMessagePopup from "./ErrorMessagePopup";

export default function App() {
  const history = useHistory();
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState({});
  const [visiblePopupEditProfile, setVisiblePopupEditProfile] = useState(false);
  const [visiblePopupAddPlace, setVisiblePopupAddPlace] = useState(false);
  const [visiblePopupEditAvatar, setVisiblePopupEditAvatar] = useState(false);
  const [visiblePopupDeleteCard, setVisiblePopupDeleteCard] = useState(false);
  const [visiblePopupImageFullscreen, setVisiblePopupImageFullscreen] =
    useState(false);
  const [selectedCard, setSelectedCard] = useState({
    name: "",
    link: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [sendingStatus, setSendingStatus] = useState("");
  const [cards, setCards] = useState([]);
  const [cardDelete, setCardDelete] = useState({ name: "", link: "" });
  const [loggedIn, setLoggedIn] = useState(false);
  const [visiblePopupInfoTooltip, setVisiblePopupInfoTooltip] = useState(false);
  const [statusRegister, setStatusRegister] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [headerLinkName, setHeaderLinkName] = useState("");

  useEffect(() => {
    if (location.pathname === "/sign-in") {
      setHeaderLinkName("Регистрация");
    }
    if (location.pathname === "/sign-up") {
      setHeaderLinkName("Войти");
    }
  }, [location]);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      getContent(jwt)
        .then((res) => {
          if (res) {
            setUserEmail(res.email);
            setLoggedIn(true);
            history.push("/");
            setHeaderLinkName("Выйти");
            api
            .getUserInfo(jwt)
            .then((data) => {
              setCurrentUser(data);
              api
              .getInitialCards(jwt)
              .then((data) => {
                setCards(data);
              })
              .catch((err) => {
                showErrorMessage(err);
              });
            })
            .catch((err) => {
              showErrorMessage(err);
            });
          }
        })
        .catch((err) => {
          showErrorMessage(err);
        });
    }
  }, [loggedIn, history]);

  useEffect(() => {
    document.addEventListener("keydown", handleEscClose);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function handleEditProfileClick() {
    setVisiblePopupEditProfile(!visiblePopupEditProfile);
  }

  function handleAddPlaceClick() {
    setVisiblePopupAddPlace(!visiblePopupAddPlace);
  }

  function handleEditAvatarClick() {
    setVisiblePopupEditAvatar(!visiblePopupEditAvatar);
  }

  function confirmCardDelete(card) {
    setVisiblePopupDeleteCard(!visiblePopupDeleteCard);
    setCardDelete(card);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setVisiblePopupImageFullscreen(!visiblePopupImageFullscreen);
  }

  function closeAllPopups() {
    setVisiblePopupEditProfile(false);
    setVisiblePopupAddPlace(false);
    setVisiblePopupEditAvatar(false);
    setVisiblePopupImageFullscreen(false);
    setTimeout(() => {
      setSelectedCard({ name: "", link: "" });
    }, 1000);
    setVisiblePopupDeleteCard(false);
    setVisiblePopupInfoTooltip(false);
  }

  function showErrorMessage(error) {
    setErrorMessage(error);
    setTimeout(() => {
      setErrorMessage("");
    }, 3000);
  }

  function handleCardLike(card) {
    const jwt = localStorage.getItem("jwt");
    const isLiked = card.likes.some((i) => i === currentUser._id);
    api
      .likeCard(isLiked ? "DELETE" : "PUT", card._id, jwt)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        showErrorMessage(err);
      });
  }

  function handleCardDelete(card) {
    setSendingStatus("Удаление...");
    const jwt = localStorage.getItem("jwt");
    api
      .deleteCard(card._id, jwt)
      .then(() => {
        setCards((state) => state.filter((i) => i._id !== card._id));
        closeAllPopups();
        setCardDelete({ name: "", link: "" });
        setSendingStatus("");
      })
      .catch((err) => {
        showErrorMessage(err);
      });
  }

  function handleUpdateUser(data) {
    setSendingStatus("Сохранение...");
    const jwt = localStorage.getItem("jwt");
    api
      .updateDataUser(data,jwt)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
        setSendingStatus("");
      })
      .catch((err) => {
        showErrorMessage(err);
      });
  }

  function handleUpdateAvatar(data) {
    setSendingStatus("Сохранение...");
    const jwt = localStorage.getItem("jwt");
    api
      .updateUserAvatar(data,jwt)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
        setSendingStatus("");
      })
      .catch((err) => {
        showErrorMessage(err);
      });
  }

  function handleAddPlaceSubmit(data) {
    setSendingStatus("Сохранение...");
    const jwt = localStorage.getItem("jwt");
    api
      .addNewCard(data, jwt)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
        setSendingStatus("");
      })
      .catch((err) => {
        showErrorMessage(err);
      });
  }

  function handleEscClose(e) {
    if (e.key === "Escape") {
      closeAllPopups();
    }
  }

  function onRegister(email, password) {
    register(email, password)
      .then((res) => {
        if (res) {
          setStatusRegister(true);
          setVisiblePopupInfoTooltip(true);
          history.push("/sign-in");
        } else {
          setStatusRegister(false);
          setVisiblePopupInfoTooltip(true);
        }
      })
      .catch((err) => {
        showErrorMessage(err);
        setStatusRegister(false);
        setVisiblePopupInfoTooltip(true);
      });
  }

  function onLogin(email, password) {
    login(email, password)
      .then((data) => {
        if (!data) {
          setStatusRegister(false);
          setVisiblePopupInfoTooltip(true);
          return;
        }
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          setUserEmail(email);
          setLoggedIn(true);
          setHeaderLinkName("Выйти");
          history.push("/");
        }
      })
      .catch((err) => {
        showErrorMessage(err);
        setStatusRegister(false);
        setVisiblePopupInfoTooltip(true);
      });
  }

  function onSignOut() {
    if (headerLinkName === "Выйти") {
      localStorage.removeItem("jwt");
      setLoggedIn(false);
      setHeaderLinkName("Регистрация");
      setUserEmail("");
      history.push("/sign-in");
    }
    if (headerLinkName === "Регистрация") {
      history.push("/sign-up");
    }
    if (headerLinkName === "Войти") {
      history.push("/sign-in");
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page-content">
          <Header
            userEmail={userEmail}
            headerLinkName={headerLinkName}
            onSignOut={onSignOut}
          />
          <Switch>
            <ProtectedRoute
              exact
              path="/"
              loggedIn={loggedIn}
              component={Main}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={confirmCardDelete}
            />
            <Route path="/sign-in">
              <Login onLogin={onLogin} />
            </Route>
            <Route path="/sign-up">
              <Register onRegister={onRegister} onSignOut={onSignOut} />
            </Route>
            <Route path="/">
              {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
            </Route>
          </Switch>
          <Footer />
          <div className="popups">
            <EditProfilePopup
              isOpen={visiblePopupEditProfile}
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUser}
              sendingState={sendingStatus}
            />

            <AddPlacePopup
              isOpen={visiblePopupAddPlace}
              onClose={closeAllPopups}
              onAddPlace={handleAddPlaceSubmit}
              sendingState={sendingStatus}
            />

            <ImagePopup
              card={selectedCard}
              onClose={closeAllPopups}
              isOpen={visiblePopupImageFullscreen}
            />

            <DeleteCardPopup
              onClose={closeAllPopups}
              isOpen={visiblePopupDeleteCard}
              cardDelete={cardDelete}
              onCardDelete={handleCardDelete}
              sendingState={sendingStatus}
            />

            <EditAvatarPopup
              isOpen={visiblePopupEditAvatar}
              onClose={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar}
              sendingState={sendingStatus}
            />

            <InfoTooltip
              onClose={closeAllPopups}
              statusRegister={statusRegister}
              isOpen={visiblePopupInfoTooltip}
              name="info-tool-tip"
            />

            <ErrorMessagePopup errorMessage={errorMessage} />
          </div>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}
