import { initialCards } from "./initial-cards.js";
import { elementsContainer, openPopup, popupPhoto, popupOpenImageCaption, popupImage } from "./script.js";

class Card {
    constructor(data, template) {
        this._title = data.name;
        this._image = data.link;
        this._template = template;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._template).content
            .querySelector(".elements__card")
            .cloneNode(true);

        return cardElement;
    }

    generateCard() {
        this._element = this._getTemplate();

        this._setEventListeners();

        this._element.querySelector(".elements__pic").style.backgroundImage = `url(${this._image})`;
        this._element.querySelector(".elements__title").textContent = this._title;
        return this._element;
    }

    _handleOpenPopup() {
        openPopup(popupPhoto);
        popupImage.src = this._image;
        popupImage.alt = this._title;
        popupOpenImageCaption.textContent = this._title;
    }

    _setEventListeners() {
        // Open popup image.
        this._element.querySelector(".elements__pic").addEventListener("click", () => {
            this._handleOpenPopup();
        });

        // Like button.
        this._element.querySelector(".elements__like-button").addEventListener("click", () => {
            this._toggleLike();
        });

        // remove card from the gallery.
        this._element.querySelector(".elements__delete-button").addEventListener("click", () => {
            this._removeCard();
        });
    }

    _removeCard() {
        this._element.remove();
    }

    _toggleLike() {
        this._element.querySelector(".elements__like-button").classList.toggle("elements__like-button_active");
    }
}

initialCards.forEach(cardData => {
    const cardInstance = new Card(cardData, "#elements__template");
    const cardElement = cardInstance.generateCard();
    elementsContainer.prepend(cardElement);
})

export default Card;