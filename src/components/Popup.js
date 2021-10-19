export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._openedPopupClass = 'popup_open';
    }


    _closeOverlayByEsc = (e) => {
        if (e.key === "Escape") {
            this.closePopup(document.querySelector('.popup_open'))
        }
    }

    openPopup() {
        document.addEventListener("keydown", this._closeOverlayByEsc);
        this._popup.classList.add('popup_open');
    }

    closePopup() {
        this._popup.classList.remove('popup_open');
        document.removeEventListener("keydown", this._closeOverlayByEsc);
    }

    setEventListeners() {
        this._popup.querySelector('.popup__close-button').addEventListener('click', () => this.closePopup());
        this._popup.addEventListener('click', (e) => {
            if (e.target.classList.contains("popup_open")) {
                closePopup(e.target);
            }
        })
    }
}