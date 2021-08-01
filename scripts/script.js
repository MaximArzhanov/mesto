let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');
let buttonEditProfile = document.querySelector('.profile__edit-button');
let buttonAddNewPlace = document.querySelector('.profile__add-button');

let popupEditProfile = document.querySelector('.popup_type_edit-profile');
let buttonCloseEditProfile = popupEditProfile.querySelector('.popup__icon-close');
let popupInputNameProfile = popupEditProfile.querySelector('.popup__input_type_name');
let popupInputDescription = popupEditProfile.querySelector('.popup__input_type_description');
let formElementEditProfile = popupEditProfile.querySelector('.popup__form');

let popupAddNewPlace = document.querySelector('.popup_type_add-new-place');
let buttonCloseAddNewPlace = popupAddNewPlace.querySelector('.popup__icon-close');
let popupInputNamePicture = popupAddNewPlace.querySelector('.popup__input_type_name');
let popupInputLink = popupAddNewPlace.querySelector('.popup__input_type_description');
let formElementAddNewPlace = popupAddNewPlace.querySelector('.popup__form');

/** Записывает имя и описание в поля формы всплывающего окна. */
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

/** Сохраняет имя и описание в профиле. */
function formSubmitHandler (evt, popup) {
  evt.preventDefault();
  profileName.textContent = popupInputNameProfile.value;
  profileDescription.textContent = popupInputDescription.value;
  closePopup(popup);
}

buttonEditProfile.addEventListener('click', () => {
  openPopup(popupEditProfile);
  fillFields();
});

buttonAddNewPlace.addEventListener('click', () => {
  openPopup(popupAddNewPlace);
});

buttonCloseEditProfile.addEventListener('click', () => {
  closePopup(popupEditProfile);
});

buttonCloseAddNewPlace.addEventListener('click', () => {
  closePopup(popupAddNewPlace);
});

formElementEditProfile.addEventListener('submit', evt => {
  formSubmitHandler(evt, popupEditProfile);
});
