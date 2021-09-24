import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector, nameImage, srcImage) {
    super(popupSelector);
    this._nameImage = nameImage;
    this._srcImage = srcImage;
  }

  open = () => {
    this._popupSelector.querySelector('.popup__image-title')
      .textContent = this._nameImage;
    this._popupSelector.querySelector('.popup__image')
      .src = this._srcImage;

    this._popupSelector.classList.add('popup_opened');
  }

}
