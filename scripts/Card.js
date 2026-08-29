class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  #getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  #setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this.#handleLikeButton();
    });

    this._deleteButton.addEventListener("click", () => {
      this.#handleDeleteButton();
    });

    this._image.addEventListener("click", () => {
      this._handleImageClick(this._name, this._link);
    });
  }

  #handleLikeButton() {
    this._likeButton.classList.toggle("card__like-button_is-active");
  }

  #handleDeleteButton() {
    this._element.remove();
  }

  generateCard() {
    this._element = this.#getTemplate();

    this._title = this._element.querySelector(".card__title");
    this._image = this._element.querySelector(".card__image");
    this._likeButton = this._element.querySelector(".card__like-button");
    this._deleteButton = this._element.querySelector(".card__delete-button");

    this._title.textContent = this._name;
    this._image.src = this._link;
    this._image.alt = this._name;

    this.#setEventListeners();

    return this._element;
  }
}

export { Card };
