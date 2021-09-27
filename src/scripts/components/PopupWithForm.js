import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handlerSubmitForm) {
    super(popupSelector);
    this._handlerSubmitForm = handlerSubmitForm;
    this._inputList = Array.from(this._popup.querySelectorAll('.popup__input'));
  }

  _getInputValues = () => {
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);
    /*const items = [
      {
        name: this._inputList[0].value,
        link: this._inputList[1].value
      },
    ];
    return items;*/
  }

  _handlerSubmit = () => {
    this._handlerSubmitForm(this._inputList);
    this.close();
  }

  setEventListeners = () => {
    super.setEventListeners();
    //document.addEventListener('keydown', this._handleEscClose);
    //this._popup.addEventListener('click', this._handleClickClose);

    this._popup.querySelector('.popup__form').
      addEventListener('submit', this._handlerSubmit);
  }

  _removeEventListeners = () => {
    super._removeEventListeners();
    //this._popup.removeEventListener('click', this._handleClickClose);
    //document.removeEventListener('keydown', this._handleEscClose);
    this._popup.querySelector('.popup__form').
      removeEventListener('submit', this._handlerSubmit);
  }

  close = () => {
    super.close();
    this._popup.querySelector('.popup__form').reset();
  }
}
