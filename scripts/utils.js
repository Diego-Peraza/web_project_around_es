function openModal(element) {
  element.classList.add("popup_is-opened");
}

function closeModal(element) {
  element.classList.remove("popup_is-opened");
}

function closePopupEscKey(element) {
  function handleEsc(event) {
    if (event.key === "Escape") {
      element.forEach((item) => {
        if (item.classList.contains("popup_is-opened")) {
          closeModal(item);
        }
      });
    }
  }

  document.addEventListener("keydown", handleEsc);
}

function closeModalPopups(element) {
  element.forEach((item) => {
    item.addEventListener("click", (event) => {
      if (event.target === item) {
        closeModal(item);
      }
    });
  });
}

function setModalEventListeners({
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
}) {
  editarPerfil.addEventListener("click", () => {
    fillProfileForm();
    openModal(editPopup);
  });

  popupClose.addEventListener("click", () => {
    closeModal(editPopup);
  });

  imagePopupClose.addEventListener("click", () => {
    closeModal(imagePopup);
  });

  botonAgregar.addEventListener("click", () => {
    openModal(newCardPopup);
  });

  newCardPopupClose.addEventListener("click", () => {
    closeModal(newCardPopup);
  });

  formElement.addEventListener("submit", handleProfileFormSubmit);

  newPlaceFormElement.addEventListener("submit", handleCardFormSubmit);

  closeModalPopups(popUps);
  closePopupEscKey(popUps);
}

export { openModal, closeModal, setModalEventListeners };
