import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._picElement = this._popup.querySelector(".popup__open-image");
        this._captionpicElement = this._popup.querySelector(".popup__open-image-caption");
        
    }

    openPopup({ link, name }) {
        this._picElement.src = link;
        this._picElement.alt = name;
        this._captionpicElement.textContent = name;
        super.openPopup();
    }
}