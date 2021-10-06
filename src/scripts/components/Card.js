export default class Card {
  constructor(data, cardSelector, id,
      { handlerCardClick, handlerTrashClick, handlerLikeClick }) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = id;
    this._ownerId = data.owner._id;
    this.cardId = data._id;
    this._cardSelector = cardSelector;
    this._handlerCardClick = handlerCardClick;
    this._handlerTrashClick = handlerTrashClick;
    this._handlerLikeClick = handlerLikeClick;
  }

  _getTemplate = () => {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }

  /** Создаёт карточку. */
  generateCard = () => {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector('.card__icon-like');
    this._setEventListeners();

    this._element.querySelector('.card__image').src = this._link;
    this._element.querySelector('.card__image').alt = this._name + '.';
    this._element.querySelector('.card__name').textContent = this._name;
    this.setLikesInfo(this._data);

    return this._element;
  }

  _setEventListeners = () => {
    this._likeButton.addEventListener('click', () => {
      this._handlerLikeClick(this);
    });

    if (this._id != this._ownerId) {
      this._element.querySelector('.card__trash').classList.add('card__trash_disable');
    } else {
      this._element.querySelector('.card__trash').addEventListener('click', () => {
          this._handlerTrashClick();
      });
    }

    this._element.querySelector('.card__image').addEventListener('click', () => {
      this._handlerCardClick(this._name, this._link);
    });
  }

  isLiked = () => {
    return Boolean(this._likes.find(item => item._id === this._id));
  }

  setLikesInfo = (data) => {
    this._likes = data.likes;
    if (!this.isLiked())
      this._likeButton.classList.remove('card__icon-like_active');
    else
      this._likeButton.classList.add('card__icon-like_active');
    this._element.querySelector('.card__like-counter').textContent = data.likes.length;
  }

  deleteCard = () => {
    this._element.remove();
  }

}
