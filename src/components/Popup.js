export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._openPopupClass = 'popup_open';
    }


    _closeOverlayByEsc = (e) => {
        if (e.key === "Escape") {
            this.closePopup()
        }
    }

    openPopup() {
        document.addEventListener("keydown", this._closeOverlayByEsc);
        this._popup.classList.add(this._openPopupClass);
    }

    closePopup() {
        this._popup.classList.remove(this._openPopupClass);
        document.removeEventListener("keydown", this._closeOverlayByEsc);
    }

    setEventListeners() {
        this._popup.addEventListener('click', (evt) => {
            if (evt.target.classList.contains(this._openPopupClass) || evt.target.classList.contains('popup__close-button')) {
                this.closePopup();
            }
        });
    }
}