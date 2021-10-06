import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupButton = this._popup.querySelector('.popup__button');
  }

  _handlerClick = () => {
    this._handlerClickButton();
    this.close();
  }

  open = (handlerClickButton) => {
    this._handlerClickButton = handlerClickButton;
    super.open();
  }

  setEventListeners = () => {
    super.setEventListeners();
    this._popupButton.addEventListener('click', this._handlerClick);
  }

  _removeEventListeners = () => {
    super._removeEventListeners();
    this._popupButton.removeEventListener('click', this._handlerClick);
  }

}
