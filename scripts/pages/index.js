import { initialCards, validateConfig } from '../utils/constants.js';
import { openPopup, closePopup, createCardData } from '../utils/utils.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';

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
const popupInputLinkPicture = popupAddNewPlace.querySelector('.popup__input_type_link');
const formElementAddNewPlace = popupAddNewPlace.querySelector('.popup__form');

const cardImage = document.querySelector('.card__image');

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

/** Обрабатывает событие при нажатии на кнопку создания новой карточки. */
const handleSubmitAddNewPlace = () => {
  addCards(createCardData(popupInputNamePicture.value, popupInputLinkPicture.value));
  formElementAddNewPlace.reset();
  closePopup(popupAddNewPlace);
}

/** Событие при загрузке страницы. */
document.addEventListener('DOMContentLoaded', () => {
  addCards(initialCards);
});

/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */








/** Записывает имя и описание в поля формы окна popup_type_edit-profile. */
const fillProfileFields = () => {
  popupInputNameProfile.value = profileName.textContent;
  popupInputDescription.value = profileDescription.textContent;
}

/** Сохраняет имя и описание в профиле.
 */
const writeDataProfile = (evt) => {
  profileName.textContent = popupInputNameProfile.value;
  profileDescription.textContent = popupInputDescription.value;
  closePopup(evt.target.closest('.popup'));
}

/** Деактивирует кнопку на форме. */
const disableSubmitButton = (form) => {
  const formValid = new FormValidator(validateConfig, form);
  formValid.disableButtonState();
}

/** Открытие popup редактирования профиля. */
buttonEditProfile.addEventListener('click', () => {
  const popup = new Popup('.popup_type_edit-profile');
  popup.setEventListeners();
  popup.open();


  /*fillProfileFields();
  disableSubmitButton(formElementEditProfile);
  openPopup(popupEditProfile);*/
});

/** Открытие popup добавления карточки. */
buttonAddNewPlace.addEventListener('click', () => {
  const popup = new Popup('.popup_type_add-new-place');
  popup.setEventListeners();
  popup.open();

  /*disableSubmitButton(formElementAddNewPlace);
  openPopup(popupAddNewPlace);*/
});




/** Нажатие на кнопку формы редактирования профиля. */
formElementEditProfile.addEventListener('submit', writeDataProfile);

/** Нажатие на кнопку формы добавления новой карточки. */
formElementAddNewPlace.addEventListener('submit', handleSubmitAddNewPlace);




/** Добавление обработчиков событий при закрытии popup. */
/*const addEventClosePopup = () => {
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
*/

/*addEventClosePopup();*/

const formList = Array.from(document.querySelectorAll(validateConfig.formSelector));
formList.forEach((form) => {
  const formValid = new FormValidator(validateConfig, form);
  formValid.enableValidation();
});



