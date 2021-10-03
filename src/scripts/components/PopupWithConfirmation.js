import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, { handlerClickButton }) {
    super(popupSelector);
    this._handlerClickButton = handlerClickButton;
    this._popupButton = this._popup.querySelector('.popup__button');
  }

  _handlerClick = () => {
    //console.log("123");
    this._handlerClickButton();
    this.close();
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
