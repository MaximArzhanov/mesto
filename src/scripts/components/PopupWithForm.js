import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { handlerSubmitForm }) {
    super(popupSelector);
    this._handlerSubmitForm = handlerSubmitForm;
    this._inputList = Array.from(this._popup.querySelectorAll('.popup__input'));
    this._popupForm = this._popup.querySelector('.popup__form');
    this._buttonFormElement = this._popup.querySelector('.popup__button');
  }

  renderLoading = (isLoading) => {
    if (isLoading)
      this._buttonFormElement.textContent = 'Сохранить...';
    else {
      this._buttonFormElement.textContent = 'Сохранить';
    }
  }

  _getInputValues = () => {
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);
  }

  _handlerSubmit = () => {
    this._getInputValues();
    this._handlerSubmitForm(this._formValues);
  }

  setEventListeners = () => {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', this._handlerSubmit);
  }

  _removeEventListeners = () => {
    super._removeEventListeners();
    this._popupForm.removeEventListener('submit', this._handlerSubmit);
  }

  close = () => {
    super.close();
    this._popup.querySelector('.popup__form').reset();
  }
}
