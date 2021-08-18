/* Элементы profile. */
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddNewPlace = document.querySelector('.profile__add-button');

/* Элементы popup_type_edit-profile. */
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupInputNameProfile = popupEditProfile.querySelector('.popup__input_type_name');
const popupInputDescription = popupEditProfile.querySelector('.popup__input_type_description');
const formElementEditProfile = popupEditProfile.querySelector('.popup__form');

/* Элементы popup_type_add-new-place. */
const popupAddNewPlace = document.querySelector('.popup_type_add-new-place');
const popupInputNamePicture = popupAddNewPlace.querySelector('.popup__input_type_name');
const popupInputLink = popupAddNewPlace.querySelector('.popup__input_type_description');
const formElementAddNewPlace = popupAddNewPlace.querySelector('.popup__form');

/* Элементы popup_type_image. */
const popupViewImage = document.querySelector('.popup_type_image');
const popupImage = popupViewImage.querySelector('.popup__image');
const popupImageTitle = popupViewImage.querySelector('.popup__image-title');

/* Элементы cards. */
const card = document.querySelector('#card').content;
const cards = document.querySelector('.cards');


/** Добавляет карточки, заданные по-умолчанию, на страницу. */
const addDefaultCards = () => {
  for (let i = 0; i < initialCards.length; i++) {
    addCard(initialCards[i].name, initialCards[i].link);
  }
}

/** Добавляет карточку на страницу. */
const addCard = (name, link) => {
  const cardElement = card.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__name').textContent = name;
  cardElement.querySelector('.card__image').src = link;
  cards.prepend(cardElement);
}

/** Записывает имя и описание в поля формы окна popup_type_edit-profile. */
const fillFields = () => {
  popupInputNameProfile.value = profileName.textContent;
  popupInputDescription.value = profileDescription.textContent;
}

/** Открывает popup. */
const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
}

/** Закрывает popup. */
const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
}

/** Если форма заполнена без ошибок,
 *  то сохраняет имя и описание в профиле.
 */
const writeDataProfile = (evt) => {
  profileName.textContent = popupInputNameProfile.value;
  profileDescription.textContent = popupInputDescription.value;
  closePopup(evt.target.closest('.popup'));
}

/** Если форма заполнена без ошибок,
 *  то добавляет новую карточку на страницу.
 *  Сбрасывает поля формы.
 */
const addCardOnPage = (evt) => {
  addCard(popupInputNamePicture.value, popupInputLink.value);
  popupInputNamePicture.closest('.popup__form').reset();
  closePopup(evt.target.closest('.popup'));
}

/** Закрытие popup нажатием Esc. */
const closeByEscape = (evt) => {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

/** Прячет ошибки валидации. */ //При повторном открытии popup оставались ошибки валидации.
const hideError = (popup) => {
  const formElement = popup.querySelector(validateConfig.formSelector);
  const inputList = Array.from(formElement.querySelectorAll(validateConfig.inputSelector));
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, validateConfig);
  });
}

/** Активирует/Деактивирует кнопку на форме. */
const setButtonState = (popup) => {
  const formElement = popup.querySelector(validateConfig.formSelector);
  const inputList = Array.from(formElement.querySelectorAll(validateConfig.inputSelector));
  const buttonElement = formElement.querySelector(validateConfig.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, validateConfig);
}



// Добавление обработчиков событий элементам.

/** Нажатие на кнопку формы редактирования профиля. */
formElementEditProfile.addEventListener('submit', writeDataProfile);

/** Нажатие на кнопку формы добавления новой карточки. */
formElementAddNewPlace.addEventListener('submit', addCardOnPage);

/** Открытие popup редактирования профиля. */
buttonEditProfile.addEventListener('click', () => {
  openPopup(popupEditProfile);
  fillFields();
  hideError(popupEditProfile);
  setButtonState(popupEditProfile);
});

/** Открытие popup добавления карточки. */
buttonAddNewPlace.addEventListener('click', () => {
  openPopup(popupAddNewPlace);
  hideError(popupAddNewPlace);
  setButtonState(popupAddNewPlace);
});

/** Добавление обработчиков события при закрытии popup. */
const addEventClosePopup = () => {
  const popups = document.querySelectorAll('.popup');
  popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
          closePopup(popup);
        }
        if (evt.target.classList.contains('popup__icon-close')) {
          closePopup(popup);
        }
    });
  });
}

/** События элементов на карточке. */
cards.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('card__icon-like')) { // Поставить like
    evt.target.classList.toggle('card__icon-like_active');
  } else if (evt.target.classList.contains('card__trash')) {  // Удалить карточку
    evt.target.closest('.card').remove();
  } else if (evt.target.classList.contains('card__image')) {  // Увеличить изображение
    popupImage.src = evt.target.src;
    popupImageTitle.textContent = evt.target.nextElementSibling.textContent;
    openPopup(popupViewImage);
  }
});

document.addEventListener('DOMContentLoaded', addDefaultCards);

enableValidation(validateConfig);

addEventClosePopup();
