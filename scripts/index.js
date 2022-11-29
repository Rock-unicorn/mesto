const changeProfile = document.querySelector('.profile__info-change-button');
const popup = document.querySelector('.popup');
const formClose = document.querySelector('.popup__close-button');
const formSave = document.querySelector('.form');
let infoName = document.querySelector('.profile__name');
let infoProfession = document.querySelector('.profile__profession');
let nameContainer = document.querySelector('.form__input_data_name');
let professionContainer = document.querySelector('.form__input_data_profession');

function popupOpen() {
    popup.classList.add('popup_opened');
    nameContainer.value = infoName.textContent;
    professionContainer.value = infoProfession.textContent;
}

function popupClose() {
    popup.classList.remove('popup_opened');
}

changeProfile.addEventListener('click', popupOpen);

formClose.addEventListener('click', popupClose);

function changeInfo(evt) {
    evt.preventDefault()
    infoName.textContent = nameContainer.value;
    infoProfession.textContent = professionContainer.value;
    popupClose();

}

formSave.addEventListener('submit', changeInfo);


