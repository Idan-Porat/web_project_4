import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }

    openPopup(cardData) {
        const picElement = this._popup.querySelector(".popup__open-image");
        const captionpicElement = this._popup.querySelector(".popup__open-image-caption");

        picElement.src = cardData.link;
        picElement.alt = cardData.name;
        captionpicElement.textContent = cardData.name;

        super.openPopup();
    }
}