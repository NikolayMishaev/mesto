class Api {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  _checkStatus(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`);
  }

  getUserInfo(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        'authorization': `Bearer ${token}`
      },
    }).then((res) => {
      return this._checkStatus(res);
    });
  }
  getInitialCards(token) {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        "Content-Type": "application/json",
        'authorization': `Bearer ${token}`
      },
    }).then((res) => {
      return this._checkStatus(res);
    });
  }
  updateDataUser(data, token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        'authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data),
    }).then((res) => {
      return this._checkStatus(res);
    });
  }
  addNewCard(data, token) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data),
    }).then((res) => {
      return this._checkStatus(res);
    });
  }
  deleteCard(id, token) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        'authorization': `Bearer ${token}`
      },
    }).then((res) => {
      return this._checkStatus(res);
    });
  }
  updateUserAvatar(data, token) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        'authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data),
    }).then((res) => {
      return this._checkStatus(res);
    });
  }
  likeCard(method, id, token) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        'authorization': `Bearer ${token}`
      },
    }).then((res) => {
      return this._checkStatus(res);
    });
  }
}

const api = new Api({
  baseUrl: "https://api.mestorussia.nikolaym.nomoredomains.club",
});

export default api;
