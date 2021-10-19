import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitForm) {
        super(popupSelector);
        this._submitForm = submitForm;
        this._form = this._popup.querySelector(".popup__input-container");
    }

    closePopup() {
        super.closePopup();
        this._form.reset();
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitForm(this._getInputValues());
        });
    }

    _getInputValues() {
        const textPopupInputs = [...this._form.querySelectorAll('.popup__item')];
        const inputPopupValues = {};

        textPopupInputs.forEach((input) => {
            inputPopupValues[input.name] = input.value;
        })

        return inputPopupValues;
    }
}
