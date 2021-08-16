
/** Показывает текст ошибки. */
const showInputError = (formElement, inputElement, errorMessage, validateConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validateConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validateConfig.errorClass);
};

/** Прячет текст ошибки. */
const hideInputError = (formElement, inputElement, validateConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validateConfig.inputErrorClass);
  errorElement.classList.remove(validateConfig.errorClass);
  errorElement.textContent = '';
};

/** Проверяет каждое поле ввода.
 *  Показывает результат проверки.
 */
const checkInputValidity = (formElement, inputElement, validateConfig) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validateConfig);
  } else {
    hideInputError(formElement, inputElement, validateConfig);
  }
};

/** Проверяет наличие ошибок в заполнении формы. */
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

/** Если форма заполнена с ошибками - выключает кнопку.
 *  Если форма заполнена без ошибок - включает кнопку.
 */
const toggleButtonState = (inputList, buttonElement, validateConfig) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(validateConfig.inactiveButtonClass);
    buttonElement.setAttribute("disabled", "disabled");
  } else {
    buttonElement.classList.remove(validateConfig.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
}

/** Добавляет обработчик событий каждому полю ввода в форме. */
const setEventListeners = (formElement, validateConfig) => {
  const inputList = Array.from(formElement.querySelectorAll(validateConfig.inputSelector));
  const buttonElement = formElement.querySelector(validateConfig.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, validateConfig);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, validateConfig);
      toggleButtonState(inputList, buttonElement, validateConfig);
    });
  });
};

/** Добавляет обработчик событий каждой форме. */
const enableValidation = (validateConfig) => {
  const formList = Array.from(document.querySelectorAll(validateConfig.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
      if (evt.currentTarget.closest('.popup').classList.contains('popup_type_edit-profile')) {
        writeDataProfile(popupEditProfile, formElement);
      }
      if (evt.currentTarget.closest('.popup').classList.contains('popup_type_add-new-place')) {
        addCardOnPage(popupAddNewPlace, formElement);
      }
    });

    setEventListeners(formElement, validateConfig);
  });
};
