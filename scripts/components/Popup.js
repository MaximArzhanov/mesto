export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = document.querySelector(popupSelector);
  }

  _handleEscClose = (evt) => {
    if (evt.key === 'Escape')
      this.close();
  }

  setEventListeners = () => {
      document.addEventListener('keydown', this._handleEscClose);
      this._popupSelector.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup_opened'))
          this.close();
        if (evt.target.classList.contains('popup__icon-close'))
          this.close();
    });
  }

  open = () => {
    this._popupSelector.classList.add('popup_opened');
  }

  close = () => {
    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

}
