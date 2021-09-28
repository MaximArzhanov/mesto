import '../../pages/index.css';

import {
  initialCards,
  validateConfig,
  buttonEditProfile,
  buttonAddNewPlace,
  popupInputNameProfile,
  popupInputDescription,
  popupTypeEditProfile,
  popupTypeAddNewPlace
} from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

const formEditProfileValid = new FormValidator(
  validateConfig,
  popupTypeEditProfile.querySelector(validateConfig.formSelector)
);

const formAddNewPlaceValid = new FormValidator(
  validateConfig,
  popupTypeAddNewPlace.querySelector(validateConfig.formSelector)
);

/** Записывает имя и описание в поля формы окна popup_type_edit-profile. */
const fillProfileFields = (data) => {
  popupInputNameProfile.value = data.name;
  popupInputDescription.value = data.description;
}

const createCard = (item) => {
  const card = new Card(
    item,
    '.card-template',
    {
      handleCardClick: (nameImage, srcImage) => {
        popupWithImage.open(nameImage, srcImage);
      }
    }
  );
  return card.generateCard();
}

const cardList = new Section({
    data: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item);
      cardList.addItem(cardElement);
    }
  },
  '.cards'
);

const userInfo = new UserInfo(
  {
    nameSelectorProfile: '.profile__name',
    descriptionSelectorProfile: '.profile__description'
  }
);

const popupEditProfile = new PopupWithForm(
  '.popup_type_edit-profile',
  {
    handlerSubmitForm: (formValues) => {
      userInfo.setUserInfo(formValues.nameUser, formValues.description);
    }
  }
);

const popupAddNewCard = new PopupWithForm(
  '.popup_type_add-new-place',
  {
    handlerSubmitForm: (formValues) => {
      const cardElement = createCard(formValues);
      cardList.addItem(cardElement);
    }
  }
);

const popupWithImage = new PopupWithImage('.popup_type_image');

buttonEditProfile.addEventListener('click', () => {
  formEditProfileValid.enableValidation();
  formEditProfileValid.resetValidation();
  fillProfileFields(userInfo.getUserInfo());
  popupEditProfile.open();
});

buttonAddNewPlace.addEventListener('click', () => {
  formAddNewPlaceValid.enableValidation();
  formAddNewPlaceValid.resetValidation();
  popupAddNewCard.open();
});

/** Событие при загрузке страницы. */
document.addEventListener('DOMContentLoaded', () => {
  cardList.renderItems();
});
