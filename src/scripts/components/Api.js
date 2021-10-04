export default class Api {
  constructor() {
    this._cohort = 'cohort-28';
    this._token = 'b5931bc5-3874-4455-9cea-b058f66f7d9b'
  }

  requestUserInformation() {
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

  requestCards() {
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
