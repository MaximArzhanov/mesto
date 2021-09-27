import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open = (nameImage, srcImage) => {
    this._popup.querySelector('.popup__image-title').textContent = nameImage;
    this._popup.querySelector('.popup__image').src = srcImage;
    this._popup.querySelector('.popup__image').alt = nameImage + '.';
    super.open();
  }

}
