export default class Api {
  constructor(cohort, token, baseUrl) {
    this._cohort = cohort;
    this._token = token;
    this._baseUrl = baseUrl;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

  updateUserInformation(nameUser, aboutUser, renderLoading, popup) {
    renderLoading(true, popup);
    return fetch(`${this._baseUrl}${this._cohort}/users/me`, {
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
      .then(this._checkResponse)
  }

  updateUserAvatar(link, renderLoading, popup) {
    renderLoading(true, popup);
    return fetch(`${this._baseUrl}${this._cohort}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: link,
      })
    })
      .then(this._checkResponse)
  }

  _getUserInformation() {
    return fetch(`${this._baseUrl}${this._cohort}/users/me`, {
      headers: {
        authorization: this._token
      }
    })
      .then(this._checkResponse)
  }

  _getCards() {
    return fetch(`${this._baseUrl}${this._cohort}/cards`, {
      headers: {
        authorization: this._token
      }
    })
      .then(this._checkResponse)
  }

  getPageInformation() {
    return Promise.all([
      this._getUserInformation(),
      this._getCards()
    ])
  }

  addCard(nameCard, linkCard) {
    return fetch(`${this._baseUrl}${this._cohort}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: nameCard,
        link: linkCard
      })
    })
      .then(this._checkResponse)
  }

  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._baseUrl}${this._cohort}/cards/likes/${cardId}`, {
      method: isLiked ? 'PUT' : 'DELETE',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    })
    .then(this._checkResponse)
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}${this._cohort}/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
        authorization: this._token
      }
    })
      .then(this._checkResponse)
  }

}
