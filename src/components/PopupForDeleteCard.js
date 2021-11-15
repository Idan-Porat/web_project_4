import Popup from "./Popup.js"

export default class PopupForDeleteCard extends Popup {
    setAction = (func) => {
        this._submitHandler = func;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popup.querySelector(".popup__input-container").addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitHandler();
        });
    }
}