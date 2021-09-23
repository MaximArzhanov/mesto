import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handlerSubmitForm) {
    super(popupSelector);
    this._handlerSubmitForm = handlerSubmitForm;
  }

  _getInputValues = () => {
    const inputList = Array.from(this._popupSelector.querySelectorAll('.popup__input'));
    const items = [
      {
        name: inputList[0].value,
        link: inputList[1].value
      },
    ];
    return items;
  }

  _handlerSubmit = () => {
    this._handlerSubmitForm(this._getInputValues());
    this.close();
  }

  setEventListeners = () => {
    document.addEventListener('keydown', this._handleEscClose);
    this._popupSelector.addEventListener('click', this._handleClickClose);

    this._popupSelector.querySelector('.popup__form').
      addEventListener('submit', this._handlerSubmit);
  }

  _removeEventListeners = () => {
    this._popupSelector.removeEventListener('click', this._handleClickClose);
    document.removeEventListener('keydown', this._handleEscClose);
    this._popupSelector.querySelector('.popup__form').
      removeEventListener('submit', this._handlerSubmit);
  }

  close = () => {
    this._popupSelector.classList.remove('popup_opened');
    this._popupSelector.querySelector('.popup__form').reset();
    this._removeEventListeners();
  }
}
