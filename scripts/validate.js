function showInputError(element, errorMessage) {
  const form = element.closest("form");
  const errorElement = form.querySelector(
    `.popup__input_type_${element.id}-input-error`,
  );

  element.classList.add("popup__form_input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__form_input-error_active");
}

function hideInputError(element) {
  const form = element.closest("form");

  const errorElement = form.querySelector(
    `.popup__input_type_${element.id}-input-error`,
  );
  element.classList.remove("popup__form_input_type_error");
  errorElement.classList.remove("popup__form_input-error_active");
  errorElement.textContent = "";
}

function enableValidation(inputList) {
  return Array.from(inputList).some(function (input) {
    return !input.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement) {
  if (enableValidation(inputList)) {
    buttonElement.disabled = true;
  } else {
    buttonElement.disabled = false;
  }
}

function popUpSubmitValidation(element) {
  element.addEventListener("submit", (event) => {
    let formValid = true;
    const formInputs = element.querySelectorAll(".popup__input");
    formInputs.forEach((item) => {
      if (!item.validity.valid) {
        showInputError(item, item.validationMessage);
        formValid = false;
      }
    });
    if (!formValid) {
      event.preventDefault();
    }
  });
}

function inputsValidation(form) {
  const inputs = form.querySelectorAll(".popup__input");
  const submitButton = form.querySelector('button[type="submit"]');

  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      if (!input.validity.valid) {
        showInputError(input, input.validationMessage);
      } else {
        hideInputError(input);
      }
      toggleButtonState(inputs, submitButton);
    });
  });
  popUpSubmitValidation(form);
}
