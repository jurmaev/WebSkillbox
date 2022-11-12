(() => {
    const elem = document.querySelector('#customSelect');
    const choices = new Choices(elem, {
        searchEnabled: false,
        placeholder: true,
        itemSelectText: ''
    });

    ymaps.ready(init);
    function init() {
        var myMap = new ymaps.Map("map", {
            center: [48.872185073737896, 2.354223999999991],
            zoom: 7
        });

        var myGeoObject = new ymaps.Placemark([48.872185073737896, 2.354223999999991], {}, {
            iconLayout: 'default#image',
            iconImageHref: './img/subtract.svg',
            iconImageSize: [28, 40],
            iconImageOffset: [-14, -20],
        });
        myMap.geoObjects.add(myGeoObject);
    };

    const selector = document.querySelector("input[type='tel']");
    const im = new Inputmask("+7 (999) 999-99-99");
    im.mask(selector);

    new JustValidate('.form', {
        rules: {
            name: {
                required: true,
                minLength: 2,
                maxLength: 10
            },
            tel: {
                required: true,
                function: (name, value) => {
                    const phone = selector.inputmask.unmaskedvalue();
                    return Number(phone) && phone.length === 10;
                }
            },
            email: {
                required: true,
                email: true
            }
        },
        messages: {
            name: {
                required: 'Вы не ввели имя'
            },
            tel: {
                required: 'Вы не ввели телефон',
                function: 'Некорректный номер телефона'
            },
            email: {
                required: 'Вы не ввели e-mail'
            }
        }
    });

    tippy('#myTooltip', {
        content: 'Глава 2, страница 176',
      });
})()