// показ спана с текстом ошибки
function showInputError(formElement, inputElement, config) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    errorElement.classList.add(config.errorClass);
    errorElement.textContent = inputElement.validationMessage;
    inputElement.classList.add(config.inputErrorClass);
}

// скрытие спана с текстом ошибки
function hideInputError(formElement, inputElement, config) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = '';
    inputElement.classList.remove(config.inputErrorClass);
}

// показ или скрытие ошибки при проверке валидности инпутов
function checkInputValidity(formElement, inputElement, config) {
    if (inputElement.validity.valid) {
        hideInputError(formElement, inputElement, config);
    } else {
        showInputError(formElement, inputElement, config);
    }
}

// проверка валидности импута
function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => !inputElement.validity.valid);
}

// функция дизейбла кнопки
function disableButtonState(buttonElement, config) {
        buttonElement.classList.add(config.inactiveButtonClass);
        buttonElement.disabled = true;
}

// функция энейбла кнопки
function enableButtonState(buttonElement, config) {
      buttonElement.classList.remove(config.inactiveButtonClass);
      buttonElement.disabled = false;
}

//функция энейбла или дизейбла при проверке валидности
function toggleButtonState(inputList, buttonElement, config) {
    if (hasInvalidInput(inputList)) {
        disableButtonState(buttonElement, config);
    } else {
        enableButtonState(buttonElement, config);
    }
}

// создание коллекции инпутов и кнопок с присвоением им слушателей инпута. изначально сабмит задизейблен
function setEventListeners(formElement, config) {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);

    toggleButtonState(inputList, buttonElement, config);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement, config);
            toggleButtonState(inputList, buttonElement, config);
        })
    })
}

// функция создания коллекции всех форм с присвоением каждой выполнение и вызов функции выше
function enableValidation(config) {
    const formList = document.querySelectorAll(config.formSelector);

    formList.forEach((formElement) => {
        setEventListeners(formElement, config)
    });
}