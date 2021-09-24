import ural from '../../images/ural.jpg';
import karelia from '../../images/karelia.jpg';
import karachaevoCherkessia from '../../images/karachaevo-cherkessia.jpg';
import kamchatka from '../../images/kamchatka.jpg';
import altai from '../../images/altai.jpg';
import baikal from '../../images/baikal.jpg';


/* Массив карточек (по-умолчанию). */
const initialCards = [
  {
    name: 'Урал',
    link: ural
  },
  {
    name: 'Карелия',
    link: karelia
  },
  {
    name: 'Карачаево-Черкессия',
    link: karachaevoCherkessia
  },
  {
    name: 'Камчатка',
    link: kamchatka
  },
  {
    name: 'Алтай',
    link: altai
  },
  {
    name: 'Байкал',
    link: baikal
  }
];

/* Объект элементов формы. */
const validateConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

export { initialCards, validateConfig };
