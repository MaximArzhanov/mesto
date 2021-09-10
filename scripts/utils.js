import { popupViewImage, popupImage, popupImageTitle } from './index.js'

/** Закрытие popup нажатием Esc. */
const handleCloseByEscape = (evt) => {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

const createPopupViewImage = (nameImage, linkImage) => {
  popupImageTitle.textContent = nameImage;
  popupImage.src = linkImage;
  return popupViewImage;
}

/** Открывает popup. */
const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleCloseByEscape);
}

/** Закрывает popup. */
const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleCloseByEscape);
}

export { openPopup, closePopup, createPopupViewImage }
