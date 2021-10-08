import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupButton = this._popup.querySelector('.popup__button');
  }

  open = (handlerConfirmButton) => {
    super.open();
    this._handlerConfirmButton = handlerConfirmButton;
    this._popupButton.addEventListener('click', this._handlerConfirmButton);
  }

  _removeEventListeners = () => {
    super._removeEventListeners();
    this._popupButton.removeEventListener('click', this._handlerConfirmButton);
  }

}
