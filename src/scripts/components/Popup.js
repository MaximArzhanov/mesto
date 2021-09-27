export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  _handleEscClose = (evt) => {
    if (evt.key === 'Escape')
      this.close();
  }

  _handleClickClose = (evt) => {
    if (evt.target.classList.contains('popup_opened'))
      this.close();
    if (evt.target.classList.contains('popup__icon-close'))
      this.close();
  }

  setEventListeners() {
      document.addEventListener('keydown', this._handleEscClose);
      this._popup.addEventListener('click', this._handleClickClose);
  }

  _removeEventListeners() {
    this._popup.removeEventListener('click', this._handleClickClose);
    document.removeEventListener('keydown', this._handleEscClose);
  }

  open() {
    this.setEventListeners();
    this._popup.classList.add('popup_opened');
  }

  close() {
    this._popup.classList.remove('popup_opened');
    this._removeEventListeners();
  }

}
