const changeProfile = document.querySelector('.profile__info-change-button'); // ищем кнопку редактирования профиля
const popupEdit = document.querySelector('.popup-edit'); // ищем попап редактирования профиля
const formEditSave = document.querySelector('.form-edit'); // ищем форму редактирования профиля
const infoName = document.querySelector('.profile__name'); // ищем имя в профиле 
const infoProfession = document.querySelector('.profile__profession'); // ищем профессию в профиле
const nameContainer = document.querySelector('.form__input_data_name'); // ищем input для имени
const professionContainer = document.querySelector('.form__input_data_profession'); //ищем input для профессии
const popupImage = document.querySelector('.popup-photo__image'); //ищем фото попапа места
const caption = document.querySelector('.popup-photo__figcaption'); // ищем подпись попапа места
const addElementButton = document.querySelector('.profile__add-button'); // ищем кнопку добавления новых мест
const popupAdd = document.querySelector('.popup-add'); // ищем попап доавления новых мест
const elementsContainer = document.querySelector('.elements__items'); //ищем список карточек с местами
// ищем поля ввода для новых мест
const inputElementName = document.querySelector('.form__input_element_name');
const inputElementLink = document.querySelector('.form__input_element_link');
//ищем форму добавления новых мест
const formAddSave = document.querySelector('.form-add');
//ищем попап места
const popupPhoto = document.querySelector('.popup-photo');
// находим все кнопки закрытия попапа
const closeButtons = document.querySelectorAll('.popup__close-button');
// ищем все попапы
const popups = document.querySelectorAll('.popup');

// функции открытия и закрытия попапов
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
}

// функция открытия попапа редактирования профиля с присвоением изначальных значений в поля ввода
function openEditPopup() {
    openPopup(popupEdit);
    nameContainer.value = infoName.textContent;
    professionContainer.value = infoProfession.textContent;
}

// слушатель открытия попапа по кнопке
changeProfile.addEventListener('click', openEditPopup);

// функция изменения имени и професии пользователя с закрытием попапа
function changeInfo(evt) {
    evt.preventDefault()
    infoName.textContent = nameContainer.value;
    infoProfession.textContent = professionContainer.value;
    closePopup(popupEdit);

}

// слушатель редактирования профиля по кнопке
formEditSave.addEventListener('submit', changeInfo);

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

//функция открытия попапа места
function openPhoto(evt) {
  openPopup(popupPhoto);
  popupImage.src = evt.currentTarget.src;
  popupImage.alt = evt.currentTarget.alt;
  caption.textContent = evt.currentTarget.alt;

};

// функция закрытия попапов по кнопке закрытия
closeButtons.forEach((button) => {
  // находим 1 раз ближайший к крестику попап 
  const popup = button.closest('.popup');
  // устанавливаем обработчик закрытия на крестик
  button.addEventListener('click', () => closePopup(popup));
});

// функция закрытия попапов по клавише ESC
function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
}

// функция закрытия попапов по темному фону при условии, что он открыт
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if(evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    }
  });
});

// объект с необходимымми селекорами для дальнейшей валидации
const validationConfig = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__save-button',
  inactiveButtonClass: 'form__save-button_disabled',
  inputErrorClass: 'form__input_error',
  errorClass: 'form__error_visible'
};
// вызов функции валидации
enableValidation(validationConfig);