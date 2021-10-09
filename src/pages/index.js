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
  popupTypeAddNewPlace,
  cohort,
  token,
  baseUrl,
  textSave,
  textSaveLoading,
  textCreate,
  textCreateLoading
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

const api = new Api(cohort, token, baseUrl);

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
        popupWithConfirmation.open(() => {
          api.deleteCard(card.cardId)
            .then((data) => {
              card.deleteCard();
              popupWithConfirmation.close();
              console.log(data);
            })
            .catch((err) => {
              console.error(err);
            });
        });
      },
      handlerLikeClick: (card) => {
        api.changeLikeCardStatus(card.cardId, !card.isLiked())
          .then((data) => {
            card.setLikesInfo(data);
          })
          .catch((err) => {
            console.error(err);
          });
      }
    }
  );
  return card.generateCard();
}

const cardList = new Section({
    renderer: (item) => {
      const cardElement = createCard(item);
      cardList.addItem(cardElement);
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
      popupUpdateAvatar.renderLoading(true, textSaveLoading);
      api.updateUserAvatar(formValues.link)
        .then((data) => {
          userInfo.setUserAvatar(data.avatar);
          popupUpdateAvatar.close();
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          popupUpdateAvatar.renderLoading(false, textSave);
        });
    }
  }
);

const popupEditProfile = new PopupWithForm(
  '.popup_type_edit-profile',
  {
    handlerSubmitForm: (formValues) => {
      popupEditProfile.renderLoading(true, textSaveLoading);
      api.updateUserInformation(formValues.name, formValues.description)
        .then((data) => {
          userInfo.setUserInfo(data.name, data.about);
          popupEditProfile.close();
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          popupEditProfile.renderLoading(false, textSave);
        });
    }
  }
);

const popupAddNewCard = new PopupWithForm(
  '.popup_type_add-new-place',
  {
    handlerSubmitForm: (formValues) => {
      popupAddNewCard.renderLoading(true, textCreateLoading);
      api.addCard(formValues.name, formValues.link)
        .then((card) => {
          const cardElement = createCard(card);
          cardList.addItem(cardElement);
          popupAddNewCard.close();
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          popupAddNewCard.renderLoading(false, textCreate);
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
  api.getPageInformation()
    .then((data) => {
      // data[0] - данные пользователя
      userInfo.setUserAvatar(data[0].avatar);
      userInfo.setUserInfo(data[0].name, data[0].about, data[0]._id);
      // data[1] - массив карточек
      const dataReverse = data[1].reverse();
      cardList.renderItems(dataReverse);
    })
    .catch((err) => {
      console.error(err);
    });
});
