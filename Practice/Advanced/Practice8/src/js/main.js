ymaps.ready(init);
function init(){
    // Создание карты.
    var myMap = new ymaps.Map("map", {
        // Координаты центра карты.
        // Порядок по умолчанию: «широта, долгота».
        // Чтобы не определять координаты центра карты вручную,
        // воспользуйтесь инструментом Определение координат.
        center: [55.760004, 37.600070],
        // Уровень масштабирования. Допустимые значения:
        // от 0 (весь мир) до 19.
        zoom: 13
    });

    var myPlacemark = new ymaps.Placemark([55.769534, 37.638440], {}, {
        iconLayout: 'default#image',
        iconImageHref: './images/placemark.svg',
        iconImageSize: [12, 12]
    });

    myMap.geoObjects.add(myPlacemark);
}

function createBurger() {
    

    const burger = document.querySelector('.burger');
    const menu = document.querySelector('.header__nav');
    const menuLinks = document.querySelectorAll('.header__item');
    const closeBtn = document.getElementById('close-burger');

    burger.addEventListener('click', () => {
        burger.classList.toggle('burger--active');
        menu.classList.toggle('header__nav--active');
        document.body.classList.toggle('stop-scroll');
    });

    menuLinks.forEach(el => {
        el.addEventListener('click', () => {burger.classList.remove('burger--active');
        menu.classList.remove('header__nav--active');
        document.body.classList.remove('stop-scroll');})
    });

    closeBtn.addEventListener('click', () => {burger.classList.remove('burger--active');
    menu.classList.remove('header__nav--active');
    document.body.classList.remove('stop-scroll');})

    
}

createBurger();

function createSearch() {
    const search = document.querySelector('.search');
    const searchBtn = document.querySelector('.search__btn');
    const searchInput = document.querySelector('.search__input');
    const closeBtn = document.querySelector('.close__btn');

    searchBtn.addEventListener('click', () => {
        search.classList.toggle('search--active');
        searchBtn.classList.toggle('search__btn--active');
        searchInput.classList.toggle('search__input--active');
        closeBtn.classList.toggle('close__btn--active');
    });

    closeBtn.addEventListener('click', () => {
        search.classList.toggle('search--active');
        searchBtn.classList.toggle('search__btn--active');
        searchInput.classList.toggle('search__input--active');
        closeBtn.classList.toggle('close__btn--active');
    });
}

createSearch();