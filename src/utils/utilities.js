export function openPopup(popup) {
    document.addEventListener("keydown", closeOverlayByEsc);
    popup.addEventListener("click", handleRemoteClick);
    popup.classList.add('popup_open');
}


export function closePopup(popup) {
    popup.classList.remove('popup_open');
    document.removeEventListener("keydown", closeOverlayByEsc);
    popup.removeEventListener("click", handleRemoteClick);
}


export const handleRemoteClick = (e) => {
    if (e.target.classList.contains("popup_open")) {
        closePopup(e.target);
    }
}

export const closeOverlayByEsc = (e) => {
    if (e.key === "Escape") {
        closePopup(document.querySelector('.popup_open'))
    }
}