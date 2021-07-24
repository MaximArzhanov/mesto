let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');
let editButton = document.querySelector('.profile__edit-button');

let popupEditProfile = document.querySelector('.popup');
let popupInputName = document.querySelector('.popup__input-name');
let popupInputDescription = document.querySelector('.popup__input-description');
let popupButton = document.querySelector('.popup__button');
let formElement = document.querySelector('.popup__form');
let closePopup = document.querySelector('.popup__icon-close');

// Записывает имя и описание в поля формы всплывающего окна
function fillFields() {
  popupInputName.value = profileName.textContent;
  popupInputDescription.value = profileDescription.textContent;
}

// Открытие/Закрытие popup
function openClosePopup() {
  popupEditProfile.classList.toggle('popup_opened');
  fillFields();
}

// Сохранить имя и описание
function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = popupInputName.value;
  profileDescription.textContent = popupInputDescription.value;
  openClosePopup();
}

editButton.addEventListener('click', openClosePopup);
closePopup.addEventListener('click', openClosePopup);
formElement.addEventListener('submit', formSubmitHandler);
