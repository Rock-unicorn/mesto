const changeProfile = document.querySelector('.profile__info-change-button');
const popup = document.querySelector('.popup');
const formClose = document.querySelector('.form__close-button');
const saveButton = document.querySelector('.form');
let infoName = document.querySelector('.profile__name');
let infoProfession = document.querySelector('.profile__profession');
let nameContainer = document.querySelector('.form__input-name');
let professionContainer = document.querySelector('.form__input-profession');
nameContainer.defaultValue = infoName.textContent;
professionContainer.defaultValue = infoProfession.textContent;

changeProfile.addEventListener('click', function() {
    popup.classList.add('popup_opened');
})

formClose.addEventListener('click', function() {
    popup.classList.remove('popup_opened');
})

function changeInfo(evt) {
    evt.preventDefault()
    infoName.textContent = nameContainer.value;
    infoProfession.textContent = professionContainer.value;
    popup.classList.remove('popup_opened');

}

saveButton.addEventListener('submit', changeInfo);


