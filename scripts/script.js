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

/* Элементы cards */
const card = document.querySelector('#card').content;
const cards = document.querySelector('.cards');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

/** Добавляет карточки,заданные по-умолчанию, на страницу. */
function addDefaultCards() {
  for (let i = 0; i < initialCards.length; i++) {
    addCard(initialCards[i].name, initialCards[i].link);
  }
}

/** Добавляет карточку на страницу */
function addCard(name, link) {
  const cardElement = card.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__name').textContent = name;
  cardElement.querySelector('.card__image').src = link;
  cards.prepend(cardElement);
}




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
  addDefaultCards();
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

document.addEventListener('DOMContentLoaded', addDefaultCards);
