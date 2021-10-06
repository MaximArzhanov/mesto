import './index.css';

import {
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

const createCard = (item) => {
  const card = new Card(
    item,
    '.card-template',
    userInfo.getUserInfo().id,
    {
      handlerCardClick: (nameImage, srcImage) => {
        popupWithImage.open(nameImage, srcImage);
      },
      handlerTrashClick: () => {
        popupWithConfirmation.setEventListeners(() => {
          api.deleteCard(card.cardId)
            .then((data) => {
              card.deleteCard();
              popupWithConfirmation.close();
              console.log(data);
            })
        });
        popupWithConfirmation.open();
      },
      handlerLikeClick: (card) => {
        api.changeLikeCardStatus(card.cardId, !card.isLiked())
          .then((data) => {
            card.setLikesInfo(data);
          })
      }
    }
  );
  return card.generateCard();
}

const cardList = new Section({
  requestData: () => {
    api.getCards()
      .then((data) => {
        const dataReverse = data.reverse();
        dataReverse.forEach(item => {
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

const popupWithConfirmation = new PopupWithConfirmation(
  '.popup_type_confirmation',
);

const popupUpdateAvatar = new PopupWithForm(
  '.popup_type_update-avatar',
  {
    handlerSubmitForm: (formValues) => {
      api.updateUserAvatar(formValues.link)
        .then((data) => {
          userInfo.setUserAvatar(data.avatar);
        });
    }
  }
);

const popupEditProfile = new PopupWithForm(
  '.popup_type_edit-profile',
  {
    handlerSubmitForm: (formValues) => {
      api.updateUserInformation(formValues.name, formValues.description)
        .then((data) => {
          userInfo.setUserInfo(data.name, data.about);
        });
    }
  }
);

const popupAddNewCard = new PopupWithForm(
  '.popup_type_add-new-place',
  {
    handlerSubmitForm: (formValues) => {
      api.addCard(formValues.name, formValues.link)
        .then((card) => {
          const cardElement = createCard(card);
          cardList.addItem(cardElement);

          console.log(card._id);
        });
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


  api.getUserInformation()
  .then((data) => {
    userInfo.setUserAvatar(data.avatar);
    userInfo.setUserInfo(data.name, data.about, data._id);
  });




});
