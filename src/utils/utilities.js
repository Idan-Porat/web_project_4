import FormValidator from '../components/FormValidator.js';

export const fullName = document.querySelector('.profile__full-name');
export const career = document.querySelector('.profile__career');
export const openEditProfilePopupBtn = document.querySelector('.profile__button');
export const openAddCardPopupBtn = document.querySelector('.profile__rectangle');

export const inputName = document.querySelector('.popup__item_type_name');
export const inputCareer = document.querySelector('.popup__item_type_career');
export const newPhotoTitle = document.querySelector('.popup__item_type_photo-title');
export const newPhotoUrl = document.querySelector('.popup__item_type_url');
export const inputAvatar = document.querySelector('.popup__item_type_avatar');

export const editForm = document.querySelector(".popup_theme_edit");
export const editAvatarForm = document.querySelector(".popup_theme_edit-avatar");
export const closeEditForm = editForm.querySelector('.popup__close-button');
export const popupPhoto = document.querySelector(".popup_theme_open-photo");
export const closePopupImage = popupPhoto.querySelector('.popup__close-button');
export const addPhotoForm = document.querySelector(".popup_theme_add-photo");
export const closeAddPhotoForm = addPhotoForm.querySelector('.popup__close-button');

export const popup = document.querySelector(".popup");
export const popupContainer = document.querySelector('.popup__container');
export const popupImage = popupPhoto.querySelector(".popup__open-image");
export const popupOpenImageCaption = document.querySelector(".popup__open-image-caption");


export const elementsTemplate = document.querySelector("#elements__template").content;
export const elementsContainer = document.querySelector(".elements__container");
export const popupInputContainer = document.querySelector(".popup__input-container");
export const cardImage = document.querySelectorAll(".elements__pic");
export const deleteCardBtn = document.querySelector(".elements__delete-button");


export const popupConfig = {
    formSelector: ".popup",
    inputSelectorSet: ".popup__set",
    inputSelector: ".popup__item",
    submitButtonSelector: ".popup__submit-button",
    inactiveButtonClass: "popup__submit-button_disabled",
    inputErrorClass: "popup__item-error",
    errorClass: "popup__item-error_active",
    errorInputSelector: "popup__item_theme_red",
    imageModalWindow: '.popup_theme_open-photo',
    editModalWindow:'.popup_theme_edit',
    addPhotoModalWindow:'.popup_theme_add-photo',
    editAvatarModalWindow:'.popup_theme_edit-avatar',
    deleteCardModalWindow:'.popup_theme_delete-photo',
    elementsContainer: ".elements__container",
};

export const profileConfig = {
    profileTitle: '.profile__full-name',
    profileDescription: '.profile__career',
    avatarImage:'.avatar__image',
};

export const editValidator = new FormValidator(popupConfig, editForm);
export const addValidator = new FormValidator(popupConfig, addPhotoForm);
export const avatarValidator = new FormValidator(popupConfig, editAvatarForm);



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