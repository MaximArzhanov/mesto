class FormValidator {
  constructor(validateConfig, form) {
    this._formSelector = validateConfig.formSelector;
    this._inputSelector = validateConfig.inputSelector;
    this._submitButtonSelector = validateConfig.submitButtonSelector;
    this._inactiveButtonClass = validateConfig.inactiveButtonClass;
    this._inputErrorClass = validateConfig.inputErrorClass;
    this._errorClass = validateConfig.errorClass;
    this._form = form;

    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._buttonElement = this._form.querySelector(this._submitButtonSelector);
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
  _hasInvalidInput = () => {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  /** Выключает кнопку. */
  disableButtonState = () => {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.setAttribute("disabled", "disabled");
  }

  /** Включает кнопку. */
  enableButtonState = () => {
    this._buttonElement.classList.remove(this._inactiveButtonClass);
    this._buttonElement.removeAttribute('disabled');
  }

  /** Если форма заполнена с ошибками - выключает кнопку.
   *  Если форма заполнена без ошибок - включает кнопку.
   */
  _toggleButtonState = () => {
    if (this._hasInvalidInput()) {
      this.disableButtonState();
    } else {
      this.enableButtonState();
    }
  }

   /** Выключает стандартную валидацию формы. */
  _disableDefaultHandler = () => {
    this._form.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
  }

  /** Добавляет обработчик событий каждому полю ввода в форме. */
  _setEventListeners = () => {
    this._toggleButtonState();

    this._disableDefaultHandler();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  /** Добавляет обработчик событий каждой форме. */
  enableValidation = () => {
    this._setEventListeners();
  }
}

export { FormValidator };
