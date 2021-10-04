import './index.css';

import {
  //initialCards,
  validateConfig,
  buttonEditAvatar,
  buttonEditProfile,
  buttonAddNewPlace,
  popupInputNameProfile,
  popupInputDescription,
  popupTypeUpdateAvatar,
  popupTypeEditProfile,
  popupTypeAddNewPlace
} from '../scripts/utils/constants.js';
import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithConfirmation from '../scripts/components/PopupWithConfirmation.js';
import UserInfo from '../scripts/components/UserInfo.js';
import Api from '../scripts/components/Api.js';

const formUpdateAvatarValid = new FormValidator(
  validateConfig,
  popupTypeUpdateAvatar.querySelector(validateConfig.formSelector)
);

formUpdateAvatarValid.enableValidation();

const formEditProfileValid = new FormValidator(
  validateConfig,
  popupTypeEditProfile.querySelector(validateConfig.formSelector)
);

formEditProfileValid.enableValidation();

const formAddNewPlaceValid = new FormValidator(
  validateConfig,
  popupTypeAddNewPlace.querySelector(validateConfig.formSelector)
);

formAddNewPlaceValid.enableValidation();



const api = new Api();











/** Записывает имя и описание в поля формы окна popup_type_edit-profile. */
const fillProfileFields = (data) => {
  popupInputNameProfile.value = data.name;
  popupInputDescription.value = data.description;
}

const popupWithConfirmation = new PopupWithConfirmation(
  '.popup_type_confirmation',
  {
    handlerClickButton: () => {
      // Здесь код для удаления карточки
    }
  }
);

const createCard = (item) => {
  const card = new Card(
    item,
    '.card-template',
    {
      handlerCardClick: (nameImage, srcImage) => {
        popupWithImage.open(nameImage, srcImage);
      },
      handlerTrashClick: () => {
        popupWithConfirmation.open();
      }
    }
  );
  return card.generateCard();
}






const cardList = new Section({
  requestData: () => {
    api.requestCards()
      .then((data) => {
        data.forEach(item => {
          const cardElement = createCard(item);
          cardList.addItem(cardElement);
        });
      });
    },
  },
  '.cards'
);

const userInfo = new UserInfo(
  {
    nameSelectorProfile: '.profile__name',
    descriptionSelectorProfile: '.profile__description',
    avatarSelectorProfile: '.profile__avatar'
  }
);

const popupUpdateAvatar = new PopupWithForm(
  '.popup_type_update-avatar',
  {
    handlerSubmitForm: (formValues) => {
      // Здесь код для обновления аватарки
    }
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

buttonEditAvatar.addEventListener('click', () => {
  formUpdateAvatarValid.resetValidation();
  popupUpdateAvatar.open();
});

buttonEditProfile.addEventListener('click', () => {
  formEditProfileValid.resetValidation();
  fillProfileFields(userInfo.getUserInfo());
  popupEditProfile.open();
});

buttonAddNewPlace.addEventListener('click', () => {
  formAddNewPlaceValid.resetValidation();
  popupAddNewCard.open();
});












/** Событие при загрузке страницы. */
document.addEventListener('DOMContentLoaded', () => {
  cardList.renderItems();


  api.requestUserInformation()
  .then((data) => {
    userInfo.setUserAvatar(data.avatar);
    userInfo.setUserInfo(data.name, data.about);
  });




});
