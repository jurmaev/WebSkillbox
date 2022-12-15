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
        iconImageHref: '../images/placemark.svg',
        iconImageSize: [12, 12]
    });

    myMap.geoObjects.add(myPlacemark);

    // myPlacemark.events.add('click', addressInfo);
}