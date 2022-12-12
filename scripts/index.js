// функции открытия и закрытия попапов
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

const changeProfile = document.querySelector('.profile__info-change-button'); // ищем кнопку редактирования профиля
const popupEdit = document.querySelector('.popup-edit'); // ищем попап редактирования профиля
const formEditClose = document.querySelector('.popup-edit__close-button'); // ищем кнопку закрытия попапа редактирования профиля
const formEditSave = document.querySelector('.form-edit'); // ищем форму редактирования профиля
const infoName = document.querySelector('.profile__name'); // ищем имя в профиле 
const infoProfession = document.querySelector('.profile__profession'); // ищем профессию в профиле
const nameContainer = document.querySelector('.form__input_data_name'); // ищем input для имени
const professionContainer = document.querySelector('.form__input_data_profession'); //ищем input для профессии

// функция открытия попапа редактирования профиля с присвоением изначальных значений в поля ввода
function OpenEditPopup() {
    openPopup(popupEdit);
    nameContainer.value = infoName.textContent;
    professionContainer.value = infoProfession.textContent;
}

// слушатель открытия попапа по кнопке
changeProfile.addEventListener('click', OpenEditPopup);

// слушатель закрытия попапа по кнопке
formEditClose.addEventListener('click', function() { 
  closePopup(popupEdit)
});

// функция изменения имени и професии пользователя с закрытием попапа
function changeInfo(evt) {
    evt.preventDefault()
    infoName.textContent = nameContainer.value;
    infoProfession.textContent = professionContainer.value;
    closePopup(popupEdit);

}

// слушатель редактирования профиля по кнопке
formEditSave.addEventListener('submit', changeInfo);

const addElementButton = document.querySelector('.profile__add-button'); // ищем кнопку добавления новых мест
const popupAdd = document.querySelector('.popup-add'); // ищем попап доавления новых мест
const formAddClose = document.querySelector('.popup-add__close-button'); // ищем кнопку закрытия попапа добавления

// слушатель закрытия попапа добавления мест
formAddClose.addEventListener('click', function() {
  closePopup(popupAdd)
});

// слушатель открытия попапа добавления мест
addElementButton.addEventListener('click', function() {
  openPopup(popupAdd)
});


// массив предзагрузки карточек с местами
const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

const elementsContainer = document.querySelector('.elements__items'); //ищем список карточек с местами


// функция предзагрузки массива карточек с местами и добавления новых карт с функционалом лайка, открытия попапа картинки и удаления места
const createElement = (item) => {
    const template = document.querySelector('#elements-items-template'); // ищем шаблон
    const element = template.content.querySelector('.elements__item').cloneNode(true); //копируем элемент списка
    const likeButton = element.querySelector('.elements__like-button'); // добавляем кнопки и отклики
    const deleteButton = element.querySelector('.elements__delete-button');
    const cardImage = element.querySelector('.elements__image');
    element.querySelector('.elements__title').textContent = item.name;
    cardImage.src = item.link;
    cardImage.alt = item.name;
    likeButton.addEventListener('click', () => {
        likeButton.classList.toggle('elements__like-button_active');
    });
    deleteButton.addEventListener('click', () => {
        element.remove();
    });
    cardImage.addEventListener('click', openPhoto);
    return element;
};

const renderElement = item => {
    elementsContainer.append(createElement(item));
};

initialCards.forEach(item => {
    renderElement(item);
});

// ищем поля ввода для новых мест
const inputElementName = document.querySelector('.form__input_element_name');
const inputElementLink = document.querySelector('.form__input_element_link');
//ищем форму добавления новых мест
const formAddSave = document.querySelector('.form-add');

//функция добавления нового места с объявлением объекта
function createNewElement(evt) {
  evt.preventDefault()
  const newCard = {}
  newCard.name = inputElementName.value;
  newCard.link = inputElementLink.value;
  elementsContainer.prepend(createElement(newCard));
  closePopup(popupAdd);
  evt.target.reset();
}

//слушатель добавления нового места
formAddSave.addEventListener('submit', createNewElement);

//ищем попап места
const popupPhoto = document.querySelector('.popup-photo');

//функция открытия попапа места
function openPhoto(evt) {
  openPopup(popupPhoto);
  const popupImage = document.querySelector('.popup-photo__image');
  const caption = document.querySelector('.popup-photo__figcaption');
  popupImage.src = evt.currentTarget.src;
  popupImage.alt = evt.currentTarget.alt;
  caption.textContent = evt.currentTarget.alt;

};

//закрытие попапа места
const closePhoto = document.querySelector('.popup-photo__close-button');
closePhoto.addEventListener('click', function() {
  closePopup(popupPhoto)
});