import ural from '../../images/ural.jpg';
import karelia from '../../images/karelia.jpg';
import kavkaz from '../../images/kavkaz.jpg';
import kamchatka from '../../images/kamchatka.jpg';
import altai from '../../images/altai.jpg';
import baikal from '../../images/baikal.jpg';


/* Массив карточек (по-умолчанию). */
const initialCards = [
  {
    namePicture: 'Урал',
    link: ural
  },
  {
    namePicture: 'Карелия',
    link: karelia
  },
  {
    namePicture: 'Кавказ',
    link: kavkaz
  },
  {
    namePicture: 'Камчатка',
    link: kamchatka
  },
  {
    namePicture: 'Алтай',
    link: altai
  },
  {
    namePicture: 'Байкал',
    link: baikal
  }
];

/* Объект элементов формы. */
const validateConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

/* Элементы profile. */
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddNewPlace = document.querySelector('.profile__add-button');

/* Элементы popup_type_edit-profile. */
const popupTypeEditProfile = document.querySelector('.popup_type_edit-profile');
const popupInputNameProfile = popupTypeEditProfile.querySelector('.popup__input_type_name');
const popupInputDescription = popupTypeEditProfile.querySelector('.popup__input_type_description');

/* Элементы popup_type_add-new-place. */
const popupTypeAddNewPlace = document.querySelector('.popup_type_add-new-place');

export {
  initialCards,
  validateConfig,
  buttonEditProfile,
  buttonAddNewPlace,
  popupInputNameProfile,
  popupInputDescription,
  popupTypeEditProfile,
  popupTypeAddNewPlace
};
