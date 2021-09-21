/* Элементы popup_type_image. */
const popupViewImage = document.querySelector('.popup_type_image');
const popupImage = popupViewImage.querySelector('.popup__image');
const popupImageTitle = popupViewImage.querySelector('.popup__image-title');

/** Закрытие popup нажатием Esc. */
const handleCloseByEscape = (evt) => {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
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

/** Создаёт объект с данными для карточки. */
const createCardData = (name, link) => {
  const data = [
    {
      name: name,
      link: link
    }
  ]
  return data;
}

export {
  openPopup,
  closePopup,
  createCardData,
  popupViewImage,
  popupImage,
  popupImageTitle,
}
