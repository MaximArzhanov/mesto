/* Элементы profile */
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddNewPlace = document.querySelector('.profile__add-button');

/* Элементы popup_type_edit-profile */
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const buttonCloseEditProfile = popupEditProfile.querySelector('.popup__icon-close');
const popupInputNameProfile = popupEditProfile.querySelector('.popup__input_type_name');
const popupInputDescription = popupEditProfile.querySelector('.popup__input_type_description');
const formElementEditProfile = popupEditProfile.querySelector('.popup__form');

/* Элементы popup_type_add-new-place */
const popupAddNewPlace = document.querySelector('.popup_type_add-new-place');
const buttonCloseAddNewPlace = popupAddNewPlace.querySelector('.popup__icon-close');
const popupInputNamePicture = popupAddNewPlace.querySelector('.popup__input_type_name');
const popupInputLink = popupAddNewPlace.querySelector('.popup__input_type_description');
const formElementAddNewPlace = popupAddNewPlace.querySelector('.popup__form');

/* Элементы popup_type_image */
const popupViewImage = document.querySelector('.popup_type_image');
const buttonCloseViewImage = popupViewImage.querySelector('.popup__icon-close');
const popupImage = popupViewImage.querySelector('.popup__image');
const popupImageTitle = popupViewImage.querySelector('.popup__image-title');

/* Элементы cards */
const card = document.querySelector('#card').content;
const cards = document.querySelector('.cards');

/** Добавляет карточки, заданные по-умолчанию, на страницу. */
function addDefaultCards() {
  for (let i = 0; i < initialCards.length; i++) {
    addCard(initialCards[i].name, initialCards[i].link);
  }
}

/** Добавляет карточку на страницу. */
function addCard(name, link) {
  const cardElement = card.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__name').textContent = name;
  cardElement.querySelector('.card__image').src = link;
  cards.prepend(cardElement);
}

/** Записывает имя и описание в поля формы окна popup_type_edit-profile. */
function fillFields() {
  popupInputNameProfile.value = profileName.textContent;
  popupInputDescription.value = profileDescription.textContent;
}

/** Открывает popup. */
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

/** Закрывает popup. */
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

/** Показывает текст ошибки. */
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error_active');
};

/** Прячет текст ошибки. */
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__input-error_active');
  errorElement.textContent = '';
};

/** Проверяет каждое поле ввода.
 *  Показывает результат проверки.
 */
const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

/** Проверяет наличие ошибок в заполнении формы. */
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

/** Если форма заполнена с ошибками - выключает кнопку.
 *  Если форма заполнена без ошибок - включает кнопку
 */
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__button_inactive');
    buttonElement.setAttribute("disabled", "disabled");
  } else {
    buttonElement.classList.remove('popup__button_inactive');
    buttonElement.removeAttribute('disabled');
  }
}

/** Добавляет обработчик событий каждому полю ввода в форме. */
const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__button');

  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

/** Если форма заполнена без ошибок,
 *  то сохраняет имя и описание в профиле.
 */
const formEditProfileSubmitHandler = (popup, formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  if (!hasInvalidInput(inputList)) {
    profileName.textContent = popupInputNameProfile.value;
    profileDescription.textContent = popupInputDescription.value;
    closePopup(popup);
  }
}

/** Если форма заполнена без ошибок,
 *  то добавляет новую карточку на страницу.
 *  Сбрасывает поля формы.
 */
const formAddNewPlaceSubmitHandler = (popup, formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  if (!hasInvalidInput(inputList)) {
    addCard(popupInputNamePicture.value, popupInputLink.value);
    popupInputNamePicture.closest('.popup__form').reset();
    closePopup(popup);
  }
}


// Добавление обработчиков событий элементам

/** Добавляет обработчик событий каждой форме. */
const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
      if (evt.currentTarget.closest('.popup').classList.contains('popup_type_edit-profile')) {
        formEditProfileSubmitHandler(popupEditProfile, formElement);
      }
      if (evt.currentTarget.closest('.popup').classList.contains('popup_type_add-new-place')) {
        formAddNewPlaceSubmitHandler(popupAddNewPlace, formElement);
      }
    });

    setEventListeners(formElement);
  });
};

document.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  }
});

buttonEditProfile.addEventListener('click', () => {
  openPopup(popupEditProfile);
  fillFields();
  enableValidation();
});

buttonAddNewPlace.addEventListener('click', () => {
  openPopup(popupAddNewPlace);
  enableValidation();
});

buttonCloseEditProfile.addEventListener('click', () => {
  closePopup(popupEditProfile);
});

buttonCloseAddNewPlace.addEventListener('click', () => {
  closePopup(popupAddNewPlace);
  popupInputNamePicture.closest('.popup__form').reset();
});

buttonCloseViewImage.addEventListener('click', () => {
  closePopup(popupViewImage);
});

cards.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('card__icon-like')) { // Поставить like
    evt.target.classList.toggle('card__icon-like_active');
  } else if (evt.target.classList.contains('card__trash')) {  // Удалить карточку
    evt.target.closest('.card').remove();
  } else if (evt.target.classList.contains('card__image')) {  // Увеличить изображение
    popupImage.src = evt.target.src;
    popupImageTitle.textContent = evt.target.nextElementSibling.textContent;
    openPopup(popupViewImage);
  }
});

document.addEventListener('DOMContentLoaded', addDefaultCards);

