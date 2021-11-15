import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitForm) {
        super(popupSelector);
        this._submitForm = submitForm;
        this._form = this._popup.querySelector(".popup__input-container");
        this._submitBtn = this._form.querySelector(".popup__submit-button");
        this._submitBtnContent = this._submitBtn.textContent;
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

    showLoadingProgress = () => {
        this._submitBtn.textContent = "Saving...";
    }

    onLoadFinish = () => {
        this._submitBtn.textContent = this._submitBtnContent;
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
