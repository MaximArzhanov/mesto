import { initialCards, validateConfig } from './data.js'
import { Card } from './Card.js'
import { FormValidator } from './FormValidator.js'


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
const formElementAddNewPlace = popupAddNewPlace.querySelector('.popup__form');

/* Элементы popup_type_image. */
const popupViewImage = document.querySelector('.popup_type_image');
const popupImage = popupViewImage.querySelector('.popup__image');
const popupImageTitle = popupViewImage.querySelector('.popup__image-title');

/* Элементы cards. */
const cards = document.querySelector('.cards');


/** Записывает имя и описание в поля формы окна popup_type_edit-profile. */
const fillProfileFields = () => {
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

/** Сохраняет имя и описание в профиле.
 */
const writeDataProfile = (evt) => {
  profileName.textContent = popupInputNameProfile.value;
  profileDescription.textContent = popupInputDescription.value;
  closePopup(evt.target.closest('.popup'));
}

/** Закрытие popup нажатием Esc. */
const closeByEscape = (evt) => {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

/** Деактивирует кнопку на форме. */
const disableSubmitButton = (form) => {
  const formValid = new FormValidator(validateConfig, form);
  formValid.disableButtonState();
}

/** Открытие popup редактирования профиля. */
buttonEditProfile.addEventListener('click', () => {
  fillProfileFields();
  disableSubmitButton(formElementEditProfile);
  openPopup(popupEditProfile);
});

/** Открытие popup добавления карточки. */
buttonAddNewPlace.addEventListener('click', () => {
  disableSubmitButton(formElementAddNewPlace);
  openPopup(popupAddNewPlace);
});

/** Создаёт объект с данными для карточки. */
const createCardData = (name, link) => {
  const data = {
    name: name,
    link: link
  }
  return data;
}

/** Обрабатывает событие при нажатии на кнопку создания новой карточки. */
const handleSubmitAddNewPlaceClick = (evt) => {
  const popupInputNamePicture = evt.target.querySelector('.popup__input_type_name');
  const popupInputLink = evt.target.querySelector('.popup__input_type_description');
  addCard(createCardData(popupInputNamePicture.value, popupInputLink.value));
  evt.target.closest('.popup__form').reset();
  closePopup(evt.target.closest('.popup'));
}

/** Добавляет карточки при загрузке страницы. */
const addDefaultCards = () => {
  initialCards.forEach((data) => {
    addCard(data);
  });
}

/** Обработчик события при нажатии на изображение карточки.
 *  Открывает popup с увеличенным изображением.
 */
const handleImageClick = (evt) => {
  popupImage.src = evt.target.src;
  popupImageTitle.textContent = evt.target.nextElementSibling.textContent;
  openPopup(popupViewImage);
}

/** Добавляет карточку на страницу. */
const addCard = (data) => {
  cards.prepend(createCard(data));
}

/** Создаёт карточку. */
const createCard = (data) => {
  const card = new Card(data, '.card-template_type_default');
  const cardElement = card.generateCard();
  cardElement.querySelector('.card__image').addEventListener('click', handleImageClick);
  return cardElement;
}

/** Событие при загрузке страницы. */
document.addEventListener('DOMContentLoaded', addDefaultCards);

/** Нажатие на кнопку формы редактирования профиля. */
formElementEditProfile.addEventListener('submit', writeDataProfile);

/** Нажатие на кнопку формы добавления новой карточки. */
formElementAddNewPlace.addEventListener('submit', handleSubmitAddNewPlaceClick);

/** Добавление обработчиков событий при закрытии popup. */
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

addEventClosePopup();

const formList = Array.from(document.querySelectorAll(validateConfig.formSelector));
formList.forEach((form) => {
  const formValid = new FormValidator(validateConfig, form);
  formValid.enableValidation();
});
