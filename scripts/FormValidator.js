class FormValidator {
  constructor(config, formElement) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._formElement = formElement;
  }

  #showInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `.popup__input_type_${inputElement.id}-input-error`,
    );

    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._errorClass);
  }

  #hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `.popup__input_type_${inputElement.id}-input-error`,
    );

    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  }

  #checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this.#showInputError(inputElement);
    } else {
      this.#hideInputError(inputElement);
    }
  }

  #hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  #toggleButtonState() {
    if (this.#hasInvalidInput()) {
      this._submitButton.disabled = true;
    } else {
      this._submitButton.disabled = false;
    }
  }

  _setEventListeners() {
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector),
    );

    this._submitButton = this._formElement.querySelector(
      this._submitButtonSelector,
    );

    this.#toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this.#checkInputValidity(inputElement);
        this.#toggleButtonState();
      });
    });
  }

  setEventListeners() {
    this._setEventListeners();
  }
}

export { FormValidator };
