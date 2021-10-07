import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupButton = this._popup.querySelector('.popup__button');
  }

  setEventListeners = (handlerConfirmButton) => {
    this._handlerConfirmButton = handlerConfirmButton;
    super.setEventListeners();
    this._popupButton.addEventListener('click', this._handlerConfirmButton);
  }

  open = () => {
    this._popup.classList.add('popup_opened');
  }

  _removeEventListeners = () => {
    super._removeEventListeners();
    this._popupButton.removeEventListener('click', this._handlerConfirmButton);
  }

}
