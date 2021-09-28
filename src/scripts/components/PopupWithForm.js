import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { handlerSubmitForm }) {
    super(popupSelector);
    this._handlerSubmitForm = handlerSubmitForm;
    this._inputList = Array.from(this._popup.querySelectorAll('.popup__input'));
  }

  _getInputValues = () => {
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);
  }

  _handlerSubmit = () => {
    this._getInputValues();
    this._handlerSubmitForm(this._formValues);
    this.close();
  }

  setEventListeners = () => {
    super.setEventListeners();
    this._popup.querySelector('.popup__form').
      addEventListener('submit', this._handlerSubmit);
  }

  _removeEventListeners = () => {
    super._removeEventListeners();
    this._popup.querySelector('.popup__form').
      removeEventListener('submit', this._handlerSubmit);
  }

  close = () => {
    super.close();
    this._popup.querySelector('.popup__form').reset();
  }
}
