import '../../pages/index.css';

import { initialCards, validateConfig } from '../utils/constants.js';
import { createObjectSelector } from '../utils/utils.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

/* Элементы profile. */
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


/* Добавляет карточки на страницу. */
const addCards = (items) => {
  const cardList = new Section({
      data: items,
      renderer: (item) => {
        const card = new Card(
          item,
          '.card-template',
          {
            handleCardClick: (nameImage, srcImage) => {
              const popupWithImage = new PopupWithImage('.popup_type_image', nameImage, srcImage);
              popupWithImage.setEventListeners();
              popupWithImage.open();
            }
          }
        );
        const cardElement = card.generateCard();
        cardList.addItem(cardElement);
      }
    },
    '.cards'
  );

  cardList.renderItems();
}

/** Деактивирует кнопку на форме. */
const disableSubmitButton = (form) => {
  const formValid = new FormValidator(validateConfig, form);
  formValid.disableButtonState();
}

/** Записывает имя и описание в поля формы окна popup_type_edit-profile. */
const fillProfileFields = (data) => {
  popupInputNameProfile.value = data.name;
  popupInputDescription.value = data.description;
}

/** Открытие popup редактирования профиля. */
buttonEditProfile.addEventListener('click', () => {
  const userInfo = new UserInfo(createObjectSelector());
  const popupWithForm = new PopupWithForm(
    '.popup_type_edit-profile',
    (data) => {
      data.forEach(item => {
        userInfo.setUserInfo(item.name, item.link)
      });
    }
  );
  popupWithForm.setEventListeners();
  disableSubmitButton(formElementEditProfile);
  fillProfileFields(userInfo.getUserInfo());
  popupWithForm.open();
});

/** Открытие popup добавления карточки. */
buttonAddNewPlace.addEventListener('click', () => {
  const popupWithForm = new PopupWithForm(
    '.popup_type_add-new-place',
    addCards
  );
  popupWithForm.setEventListeners();
  disableSubmitButton(formElementAddNewPlace);
  popupWithForm.open();
 });

 /** Включение валидации форм. */
const formList = Array.from(document.querySelectorAll(validateConfig.formSelector));
formList.forEach((form) => {
  const formValid = new FormValidator(validateConfig, form);
  formValid.enableValidation();
});

/** Событие при загрузке страницы. */
document.addEventListener('DOMContentLoaded', () => {
  addCards(initialCards);
});




