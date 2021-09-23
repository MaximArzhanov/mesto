import { initialCards, validateConfig } from '../utils/constants.js';
//import { openPopup, closePopup, createCardData } from '../utils/utils.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';

/* Элементы profile. */
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddNewPlace = document.querySelector('.profile__add-button');

/* Элементы popup_type_edit-profile. */
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupInputNameProfile = popupEditProfile.querySelector('.popup__input_type_name');
const popupInputDescription = popupEditProfile.querySelector('.popup__input_type_description');

/* Элементы popup_type_add-new-place. */
const popupAddNewPlace = document.querySelector('.popup_type_add-new-place');
const formElementAddNewPlace = popupAddNewPlace.querySelector('.popup__form');



/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */

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

/** Событие при загрузке страницы. */
document.addEventListener('DOMContentLoaded', () => {
  addCards(initialCards);
});

/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */








/** Записывает имя и описание в поля формы окна popup_type_edit-profile. */
//const fillProfileFields = () => {
  //popupInputNameProfile.value = profileName.textContent;
  //popupInputDescription.value = profileDescription.textContent;
//}

/** Сохраняет имя и описание в профиле.
 */
//const writeDataProfile = (inputValues, inputes) => {
  //for (let i = 0; i < inputValues.length, i++) {
    //inputValues[i].value = inputes[i];
  //}
//}



  //closePopup(evt.target.closest('.popup'));
//}

/** Деактивирует кнопку на форме. */
const disableSubmitButton = (form) => {
  const formValid = new FormValidator(validateConfig, form);
  formValid.disableButtonState();
}

/** Открытие popup редактирования профиля. */
//buttonEditProfile.addEventListener('click', () => {
  //const popupWithForm = new PopupWithForm('.popup_type_edit-profile', writeDataProfile);
  //popup.setEventListeners();
  //popup.open();


  /*fillProfileFields();
  disableSubmitButton(formElementEditProfile);
  openPopup(popupEditProfile);*/
//});



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



//formElementEditProfile.addEventListener('submit', {});



/** Нажатие на кнопку формы редактирования профиля. */
//formElementEditProfile.addEventListener('submit', writeDataProfile);








const formList = Array.from(document.querySelectorAll(validateConfig.formSelector));
formList.forEach((form) => {
  const formValid = new FormValidator(validateConfig, form);
  formValid.enableValidation();
});



