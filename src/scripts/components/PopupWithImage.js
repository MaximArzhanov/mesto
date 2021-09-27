import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector, nameImage, srcImage) {
    super(popupSelector);
    this._nameImage = nameImage;
    this._srcImage = srcImage;
  }

  open = () => {
    this._popup.querySelector('.popup__image-title').textContent = this._nameImage;
    this._popup.querySelector('.popup__image').src = this._srcImage;
    this._popup.querySelector('.popup__image').alt = this._nameImage + '.';
    super.open();
  }

}
