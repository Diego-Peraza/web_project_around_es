const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

initialCards.forEach(function (item) {
  console.log(item.name);
});

const editarPerfil = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector("#edit-popup");
const popupClose = editPopup.querySelector(".popup__close");

const imagePopup = document.querySelector("#image-popup");
const imagePopupClose = imagePopup.querySelector(".popup__close");
const imagePopupImage = imagePopup.querySelector(".popup__image");
const imagePopupCaption = imagePopup.querySelector(".popup__caption");

const popUps = document.querySelectorAll(".popup");

function openModal(element) {
  element.classList.add("popup_is-opened");
  closePopupEscKey(popUps);
}

function closeModal(element) {
  element.classList.remove("popup_is-opened");
}

editarPerfil.addEventListener("click", handleOpenEditModal);

popupClose.addEventListener("click", function () {
  closeModal(editPopup);
});

imagePopupClose.addEventListener("click", function () {
  closeModal(imagePopup);
});

const botonAgregar = document.querySelector(".profile__add-button");
const newCardPopup = document.querySelector("#new-card-popup");
const newCardPopupClose = newCardPopup.querySelector(".popup__close");

botonAgregar.addEventListener("click", function () {
  openModal(newCardPopup);
});

newCardPopupClose.addEventListener("click", function () {
  closeModal(newCardPopup);
});

function fillProfileForm() {
  const popupName = editPopup.querySelector(".popup__input_type_name");
  const popupDescription = editPopup.querySelector(
    ".popup__input_type_description",
  );
  const profileName = document.querySelector(".profile__title");
  const profileDescription = document.querySelector(".profile__description");
  popupName.value = profileName.textContent;
  popupDescription.value = profileDescription.textContent;
}

function handleOpenEditModal() {
  fillProfileForm();
  openModal(editPopup);
}

const formElement = editPopup.querySelector("#edit-profile-form");

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const nameInput = editPopup.querySelector(".popup__input_type_name");
  const jobInput = editPopup.querySelector(".popup__input_type_description");

  const nameInputValue = nameInput.value;
  const jobInputValue = jobInput.value;
  const profileName = document.querySelector(".profile__title");
  const profileDescription = document.querySelector(".profile__description");

  profileName.textContent = nameInputValue;
  profileDescription.textContent = jobInputValue;
  closeModal(editPopup);
}

const newPlaceFormElement = newCardPopup.querySelector("#new-card-form");

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const cardNameInput = newCardPopup.querySelector(
    ".popup__input_type_card-name",
  );
  const cardLinkInput = newCardPopup.querySelector(".popup__input_type_url");

  const cardName = cardNameInput.value;
  const cardLink = cardLinkInput.value;

  const cardElement = getCardElement(cardName, cardLink);
  cardsContainer.prepend(cardElement);
  closeModal(newCardPopup);
}

formElement.addEventListener("submit", handleProfileFormSubmit);
newPlaceFormElement.addEventListener("submit", handleCardFormSubmit);

const userTemplate = document
  .querySelector("#user-template")
  .content.querySelector(".card");

function getCardElement(name, link) {
  const cardElement = userTemplate.cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");

  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;

  const cardLikeButton = cardElement.querySelector(".card__like-button");
  function handleCardLike(element) {
    element.classList.toggle("card__like-button_is-active");
  }
  cardLikeButton.addEventListener("click", function () {
    handleCardLike(cardLikeButton);
  });

  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  function handleCardDelete(element) {
    element.closest(".card").remove();
  }
  cardDeleteButton.addEventListener("click", function () {
    handleCardDelete(cardDeleteButton);
  });

  cardImage.addEventListener("click", function () {
    openModal(imagePopup);
    imagePopupImage.src = link;
    imagePopupImage.alt = name;
    imagePopupCaption.textContent = name;
  });

  return cardElement;
}

function renderCard(name, link, container) {
  const cardElement = getCardElement(name, link);
  container.appendChild(cardElement);
}

const cardsContainer = document.querySelector(".cards__list");

initialCards.forEach((card) => {
  renderCard(card.name, card.link, cardsContainer);
});

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

inputsValidation(formElement);
inputsValidation(newPlaceFormElement);

function closeModalPopups(element) {
  element.forEach((item) => {
    item.addEventListener("click", function (event) {
      if (event.target === item) {
        closeModal(item);
      }
    });
  });
}

closeModalPopups(popUps);

function closePopupEscKey(element) {
  function handleEsc(event) {
    if (event.key === "Escape") {
      element.forEach((item) => {
        if (item.classList.contains("popup_is-opened")) {
          closeModal(item);
        }
      });
      document.removeEventListener("keydown", handleEsc);
    }
  }
  document.addEventListener("keydown", handleEsc);
}
