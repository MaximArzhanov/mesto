class FormValidator {
  constructor(validateConfig, form) {
    this._formSelector = validateConfig.formSelector;
    this._inputSelector = validateConfig.inputSelector;
    this._submitButtonSelector = validateConfig.submitButtonSelector;
    this._inactiveButtonClass = validateConfig.inactiveButtonClass;
    this._inputErrorClass = validateConfig.inputErrorClass;
    this._errorClass = validateConfig.errorClass;
    this._form = form;
  }

  /** Показывает текст ошибки. */
  _showInputError = (inputElement, errorMessage) => {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  /** Прячет текст ошибки. */
  _hideInputError = (inputElement) => {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }


  /** Проверяет каждое поле ввода.
   *  Показывает результат проверки.
   */
  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  /** Проверяет наличие ошибок в заполнении формы. */
  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  /** Если форма заполнена с ошибками - выключает кнопку.
   *  Если форма заполнена без ошибок - включает кнопку.
   */
  _toggleButtonState = (inputList, buttonElement) => {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.setAttribute("disabled", "disabled");
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
    }
  }

  _disableDefaultHandler = () => {
    this._form.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
  }

  /** Добавляет обработчик событий каждому полю ввода в форме. */
  _setEventListeners = () => {
    const inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    const buttonElement = this._form.querySelector(this._submitButtonSelector);

    this._toggleButtonState(inputList, buttonElement);

    this._disableDefaultHandler();
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }

  /** Добавляет обработчик событий каждой форме. */
  enableValidation = () => {
    this._setEventListeners();
  }
}

export { FormValidator };
