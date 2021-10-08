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
  baseUrl
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
        popupWithConfirmation.setEventListeners(() => {
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
        popupWithConfirmation.open();
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
  requestData: () => {
    api.getPageInformation()
      .then((data) => {
        const dataReverse = data[1].reverse();
        cardList.renderItems(dataReverse);
      })
      .catch((err) => {
        console.log(err);
      })
    }
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



const renderLoading = (isLoading, popup) => {
  const button = popup.getButtonFormElement()
  if (isLoading)
    button.textContent = 'Сохранить...';
  else {
    button.textContent = 'Сохранить';
  }
}


const popupUpdateAvatar = new PopupWithForm(
  '.popup_type_update-avatar',
  {
    handlerSubmitForm: (formValues) => {
      renderLoading(true, popupUpdateAvatar);
      api.updateUserAvatar(formValues.link)
        .then((data) => {
          userInfo.setUserAvatar(data.avatar);
          popupUpdateAvatar.close();
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          renderLoading(false, popupUpdateAvatar);
        });
    }
  }
);

const popupEditProfile = new PopupWithForm(
  '.popup_type_edit-profile',
  {
    handlerSubmitForm: (formValues) => {
      renderLoading(true, popupEditProfile);
      api.updateUserInformation(formValues.name, formValues.description)
        .then((data) => {
          userInfo.setUserInfo(data.name, data.about);
          popupEditProfile.close();
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          renderLoading(false, popupEditProfile);
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
          popupAddNewCard.close();
        })
        .catch((err) => {
          console.error(err);
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

  cardList.renderDefaultItems();

  api.getPageInformation()
    .then((data) => {
      userInfo.setUserAvatar(data[0].avatar);
      userInfo.setUserInfo(data[0].name, data[0].about, data[0]._id);
    })
    .catch((err) => {
      console.error(err);
    });
});
