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

/** Сохраняет имя и описание в профиле. */
function formEditProfileSubmitHandler (evt, popup) {
  evt.preventDefault();
  profileName.textContent = popupInputNameProfile.value;
  profileDescription.textContent = popupInputDescription.value;
  closePopup(popup);
}

/** Вызывает метод addCard.
 *  Очищает поля формы окна popup_type_add-new-place.
 */
function formAddNewPlaceSubmitHandler (evt, popup) {
  evt.preventDefault();
  addCard(popupInputNamePicture.value, popupInputLink.value);
  closePopup(popup);
  popupInputNamePicture.closest('.popup__form').reset();
}

// Добавление обработчиков событий элементам

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
  popupInputNamePicture.closest('.popup__form').reset();
});

buttonCloseViewImage.addEventListener('click', () => {
  closePopup(popupViewImage);
});

formElementEditProfile.addEventListener('submit', evt => {
  formEditProfileSubmitHandler(evt, popupEditProfile);
});

formElementAddNewPlace.addEventListener('submit', evt => {
  formAddNewPlaceSubmitHandler(evt, popupAddNewPlace);
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
