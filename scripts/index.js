let initialCards = [
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

function openModal(element) {
  element.classList.add("popup_is-opened");
}

function closeModal(element) {
  element.classList.remove("popup_is-opened");
}

editarPerfil.addEventListener("click", handleOpenEditModal);

popupClose.addEventListener("click", function () {
  closeModal(editPopup);
});

function fillProfileForm() {
  let popupName = editPopup.querySelector(".popup__input_type_name");
  let popupDescription = editPopup.querySelector(
    ".popup__input_type_description",
  );
  let profileName = document.querySelector(".profile__title");
  let profileDescription = document.querySelector(".profile__description");
  popupName.value = profileName.textContent;
  popupDescription.value = profileDescription.textContent;
}

function handleOpenEditModal() {
  fillProfileForm();
  openModal(editPopup);
}

let formElement = editPopup.querySelector("#edit-profile-form");

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  let nameInput = editPopup.querySelector(".popup__input_type_name");
  let jobInput = editPopup.querySelector(".popup__input_type_description");

  let nameInputValue = nameInput.value;
  let jobInputValue = jobInput.value;
  let profileName = document.querySelector(".profile__title");
  let profileDescription = document.querySelector(".profile__description");

  profileName.textContent = nameInputValue;
  profileDescription.textContent = jobInputValue;
  closeModal(editPopup);
}

formElement.addEventListener("submit", handleProfileFormSubmit);
