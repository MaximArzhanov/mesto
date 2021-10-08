import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageTitle = this._popup.querySelector('.popup__image-title');
    this._image = this._popup.querySelector('.popup__image');
  }

  open = (nameImage, srcImage) => {
    this._imageTitle.textContent = nameImage;
    this._image.src = srcImage;
    this._image.alt = nameImage + '.';
    super.open();
  }

}
