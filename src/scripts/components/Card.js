
export default class Card {
  constructor(data, cardSelector, { handlerCardClick, handlerTrashClick }) {
    this._name = data.namePicture;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handlerCardClick = handlerCardClick;
    this._handlerTrashClick = handlerTrashClick;
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

    return this._element;
  }

  _setEventListeners = () => {
    this._likeButton.addEventListener('click', () => {
      this._handlerLikeClick();
    });

    this._element.querySelector('.card__trash').addEventListener('click', () => {
      this._handlerTrashClick();
    });

    this._element.querySelector('.card__image').addEventListener('click', () => {
      this._handlerCardClick(this._name, this._link);
    });
  }

  _handlerLikeClick = () => {
    this._likeButton.classList.toggle('card__icon-like_active');
  }

  /*_handleTrashClick = () => {
    this._element.remove();
  }*/

}
