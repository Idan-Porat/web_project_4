import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }

    openPopup({ title, pic }) {
        const picElement = this._popup.querySelector(".popup__open-image");
        const captionpicElement = this._popup.querySelector(".popup__open-image-caption");

        picElement.src = pic;
        picElement.alt = title;
        captionpicElement.textContent = title;

        super.openPopup();
    }
}