import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { openModal, closeModal, setModalEventListeners } from "./utils.js";

const validationConfig = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inputErrorClass: "popup__form_input_type_error",
  errorClass: "popup__form_input-error_active",
};

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

const profileName = document.querySelector(".profile__title");
const editarPerfil = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector("#edit-popup");
const popupClose = editPopup.querySelector(".popup__close");
const imagePopup = document.querySelector("#image-popup");
const imagePopupClose = imagePopup.querySelector(".popup__close");
const imagePopupImage = imagePopup.querySelector(".popup__image");
const imagePopupCaption = imagePopup.querySelector(".popup__caption");
const popUps = document.querySelectorAll(".popup");
const botonAgregar = document.querySelector(".profile__add-button");
const newCardPopup = document.querySelector("#new-card-popup");
const newCardPopupClose = newCardPopup.querySelector(".popup__close");
const nameInput = editPopup.querySelector(".popup__input_type_name");
const formElement = editPopup.querySelector("#edit-profile-form");
const newPlaceFormElement = newCardPopup.querySelector("#new-card-form");
const cardsContainer = document.querySelector(".cards__list");

function fillProfileForm() {
  const popupDescription = editPopup.querySelector(
    ".popup__input_type_description",
  );
  const profileDescription = document.querySelector(".profile__description");
  nameInput.value = profileName.textContent;
  popupDescription.value = profileDescription.textContent;
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const jobInput = editPopup.querySelector(".popup__input_type_description");

  const nameInputValue = nameInput.value;
  const jobInputValue = jobInput.value;
  const profileDescription = document.querySelector(".profile__description");

  profileName.textContent = nameInputValue;
  profileDescription.textContent = jobInputValue;
  closeModal(editPopup);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const cardNameInput = newCardPopup.querySelector(
    ".popup__input_type_card-name",
  );

  const cardLinkInput = newCardPopup.querySelector(".popup__input_type_url");

  const cardData = {
    name: cardNameInput.value,
    link: cardLinkInput.value,
  };

  const card = new Card(cardData, "#user-template", handleImageClick);

  cardsContainer.prepend(card.generateCard());

  closeModal(newCardPopup);
}

function handleImageClick(name, link) {
  openModal(imagePopup);

  imagePopupImage.src = link;
  imagePopupImage.alt = name;
  imagePopupCaption.textContent = name;
}

initialCards.forEach((card) => {
  const cardElement = new Card(card, "#user-template", handleImageClick);
  cardsContainer.append(cardElement.generateCard());
});

setModalEventListeners({
  editarPerfil,
  editPopup,
  popupClose,
  imagePopup,
  imagePopupClose,
  botonAgregar,
  newCardPopup,
  newCardPopupClose,
  formElement,
  newPlaceFormElement,
  popUps,
  fillProfileForm,
  handleProfileFormSubmit,
  handleCardFormSubmit,
});

const profileFormValidator = new FormValidator(validationConfig, formElement);

const cardFormValidator = new FormValidator(
  validationConfig,
  newPlaceFormElement,
);

profileFormValidator.setEventListeners();
cardFormValidator.setEventListeners();
