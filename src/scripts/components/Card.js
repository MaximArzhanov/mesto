
export default class Card {
  constructor(data, cardSelector, { handleCardClick }) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
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
    this._element.querySelector('.card__image').alt = this._name;
    this._element.querySelector('.card__name').textContent = this._name;

    return this._element;
  }

  _setEventListeners = () => {
    this._likeButton.addEventListener('click', () => {
      this._handleLikeClick();
    });

    this._element.querySelector('.card__trash').addEventListener('click', () => {
      this._handleTrashClick();
    });

    this._element.querySelector('.card__image').addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  _handleLikeClick = () => {
    this._likeButton.classList.toggle('card__icon-like_active');
  }

  _handleTrashClick = () => {
    this._element.remove();
  }

}