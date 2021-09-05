const showInputError = (formElement, inputElement, errorMessage, settings) => {
  const {errorClass, errorInputSelector} = settings;
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
  inputElement.classList.add(errorInputSelector);
};

const hideInputError = (formElement, inputElement, settings) => {
  const {inputErrorClass, errorClass, errorInputSelector} = settings;
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  inputElement.classList.remove(errorInputSelector);
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement, settings) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, settings);
  } else {
    hideInputError(formElement, inputElement, settings);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, settings) => {
  const {inactiveButtonClass} = settings;
  console.log(hasInvalidInput(inputList));
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

const setEventListeners = (formElement, settings) => {
  const {inputSelector, submitButtonSelector, ...rest} = settings;
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  
  toggleButtonState(inputList, buttonElement, settings);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, rest);
       toggleButtonState(inputList, buttonElement, rest);
    });
  });
};

function enableValidation(settings) {
  const {formSelector, inputSelectorSet, ...rest} = settings;
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });

    const fieldsetList = Array.from(formElement.querySelectorAll(inputSelectorSet));

    fieldsetList.forEach((fieldset) => {
      setEventListeners(fieldset, rest);
    });
  });
};

const config = {
  formSelector: ".popup",
  inputSelectorSet: ".popup__set",
  inputSelector: ".popup__item",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_disabled",
  inputErrorClass: "popup__item-error",
  errorClass: "popup__item-error_active",
  errorInputSelector: "popup__item_theme_red"
};

enableValidation(config);


function resetPopup(popup) {
  const resetButton = popup.querySelector(".popup__submit-button");
  if (!popupPhoto.classList.contains('popup_open')) {
    resetButton.classList.add("popup__submit-button_disabled");
    resetButton.disabled = true;
  }
}


 















  




 





