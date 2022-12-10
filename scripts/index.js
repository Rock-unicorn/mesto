const changeProfile = document.querySelector('.profile__info-change-button'); // ищем кнопку редактирования профиля
const popupEdit = document.querySelector('.popup-edit'); // ищем попап редактирования профиля
const formEditClose = document.querySelector('.popup-edit__close-button'); // ищем кнопку закрытия попапа редактирования профиля
const formEditSave = document.querySelector('.form-edit'); // ищем форму редактирования профиля
let infoName = document.querySelector('.profile__name'); // ищем имя в профиле 
let infoProfession = document.querySelector('.profile__profession'); // ищем профессию в профиле
let nameContainer = document.querySelector('.form__input_data_name'); // ищем input для имени
let professionContainer = document.querySelector('.form__input_data_profession'); //ищем input для профессии

// функция открытия попапа редактирования профиля с присвоением изначальных значений в поля ввода
function popupEditOpen() {
    popupEdit.classList.add('popup_opened');
    nameContainer.value = infoName.textContent;
    professionContainer.value = infoProfession.textContent;
}

// функция закрытия попапа редактирования профиля
function popupEditClose() {
    popupEdit.classList.remove('popup_opened');
}

// слушатель открытия попапа по кнопке
changeProfile.addEventListener('click', popupEditOpen);

// слушатель закрытия попапа по кнопке
formEditClose.addEventListener('click', popupEditClose);

// функция изменения имени и професии пользователя с закрытием попапа
function changeInfo(evt) {
    evt.preventDefault()
    infoName.textContent = nameContainer.value;
    infoProfession.textContent = professionContainer.value;
    popupEditClose();

}

// слушатель редактирования профиля по кнопке
formEditSave.addEventListener('submit', changeInfo);

const addElementButton = document.querySelector('.profile__add-button'); // ищем кнопку добавления новых мест
const popupAdd = document.querySelector('.popup-add'); // ищем попап доавления новых мест
const formAddClose = document.querySelector('.popup-add__close-button'); // ищем кнопку закрытия попапа добавления

// функция открытия попапа добавления мест
function popupAddOpen() {
    popupAdd.classList.add('popup_opened');
}

// функция закрытия попапа добавления мест
function popupAddClose() {
    popupAdd.classList.remove('popup_opened');
}

// слушатель закрытия попапа добавления мест
formAddClose.addEventListener('click', popupAddClose);

// слушатель открытия попапа добавления мест
addElementButton.addEventListener('click', popupAddOpen);


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
const createElement = (elements) => {
    const template = document.querySelector('#elements-items-template'); // ищем шаблон
    const element = template.content.querySelector('.elements__item').cloneNode(true); //копируем элемент списка
    const likeButton = element.querySelector('.elements__like-button'); // добавляем кнопки и отклики
    const deleteButton = element.querySelector('.elements__delete-button');
    const imgButton = element.querySelector('.elements__image');
    element.querySelector('.elements__title').textContent = elements.name;
    element.querySelector('.elements__image').src = elements.link;
    element.querySelector('.elements__image').alt = elements.name;
    likeButton.addEventListener('click', () => {
        likeButton.classList.toggle('elements__like-button_active');
    });
    deleteButton.addEventListener('click', () => {
        element.remove();
    });
    imgButton.addEventListener('click', openPhoto);
    return element;
};

const renderElement = elements => {
    elementsContainer.append(createElement(elements));
};

initialCards.forEach(elements => {
    renderElement(elements);
});

// ищем поля ввода для новых мест
let inputElementName = document.querySelector('.form__input_element_name');
let inputElementLink = document.querySelector('.form__input_element_link');
//ищем форму добавления новых мест
const formAddSave = document.querySelector('.form-add');

// массив для нового элемента
const newCard = [
  {
    name: '',
    link: ''
  }
];


//функция добавления нового места
function createNewElement(evt) {
  evt.preventDefault()
  newCard.name = inputElementName.value;
  newCard.link = inputElementLink.value;
  elementsContainer.prepend(createElement(newCard));
  popupAddClose();
  inputElementName.value = '';
  inputElementLink.value = '';
}

//слушатель добавления нового места
formAddSave.addEventListener('submit', createNewElement);

//ищем попап места
const popupPhoto = document.querySelector('.popup-photo');

//функция открытия попапа места
function openPhoto(evt) {
  popupPhoto.classList.add('popup_opened');
  document.querySelector('.popup-photo__image').src = evt.currentTarget.closest('.elements__image').src;
  document.querySelector('.popup-photo__figcaption').textContent = evt.currentTarget.closest('.elements__image').alt;
};

//закрытие попапа места
const closePhoto = document.querySelector('.popup-photo__close-button');
closePhoto.addEventListener('click', () => {
  popupPhoto.classList.remove('popup_opened');
});
