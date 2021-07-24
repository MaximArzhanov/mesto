let popupEditProfile = document.querySelector('.popup');
let editButton = document.querySelector('.profile__edit-button');
let closePopup = document.querySelector('.popup__icon-close');

let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');

let popupInputName = document.querySelector('.popup__input-name');
let popupInputDescription = document.querySelector('.popup__input-description');

popupInputName.value = profileName.textContent;
popupInputDescription.value = profileDescription.textContent;

function fillFields() {
  popupInputName.value = profileName.textContent;
  popupInputDescription.value = profileDescription.textContent;
}

function openClosePopup() {
  popupEditProfile.classList.toggle('popup_opened');
  fillFields();
}

editButton.addEventListener('click', openClosePopup);
closePopup.addEventListener('click', openClosePopup);

