export default class Api {
  constructor() {
    this._cohort = 'cohort-28';
    this._token = 'b5931bc5-3874-4455-9cea-b058f66f7d9b'
  }

  getUserInformation() {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._cohort}/users/me`, {
      headers: {
        authorization: this._token
      }
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.error(err);

        return {};
      });
  }

  updateUserInformation(nameUser, aboutUser) {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._cohort}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: nameUser,
        about: aboutUser
      })
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.error(err);

        return {};
      });
  }

  updateUserAvatar(link) {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._cohort}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: link,
      })
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.error(err);

        return {};
      });
  }

  getCards() {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._cohort}/cards`, {
      headers: {
        authorization: this._token
      }
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.error(err);

        return [];
      });
  }


}
