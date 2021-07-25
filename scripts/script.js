let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');
let buttonEditProfile = document.querySelector('.profile__edit-button');

let popupEditProfile = document.querySelector('.popup');
let popupInputName = document.querySelector('.popup__input_type_name');
let popupInputDescription = document.querySelector('.popup__input_type_description');
let formElement = document.querySelector('.popup__form');
let buttonClosePopup = document.querySelector('.popup__icon-close');

/** Записывает имя и описание в поля формы всплывающего окна. */
function fillFields() {
  popupInputName.value = profileName.textContent;
  popupInputDescription.value = profileDescription.textContent;
}

/** Открывает popup. */
function openPopup() {
  popupEditProfile.classList.add('popup_opened');
  fillFields();
}

/** Закрывает popup. */
function closePopup() {
  popupEditProfile.classList.remove('popup_opened');
}

/** Сохраняет имя и описание в профиле. */
function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = popupInputName.value;
  profileDescription.textContent = popupInputDescription.value;
  closePopup();
}

buttonEditProfile.addEventListener('click', openPopup);
buttonClosePopup.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);
