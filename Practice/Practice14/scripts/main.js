(() => {
    document.addEventListener('DOMContentLoaded', () => {
        new Swiper('.swiper-container', {
            loop: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            }
        });

        const tabsButtons = document.querySelectorAll('.work__link');
        const contentBlocks = document.querySelectorAll('.work__container');

        tabsButtons.forEach(tabsBtn => {
            tabsBtn.addEventListener('click', event => {
                tabsButtons.forEach(tabsBtn => tabsBtn.classList.remove('work__link--active'));
                const path = event.currentTarget.dataset.path;
                const content = document.querySelector(`[data-target="${path}"]`);

                contentBlocks.forEach(tabContent => {
                    tabContent.classList.remove('work__container--active');
                });

                tabsBtn.classList.add('work__link--active');
                content.classList.add('work__container--active');
            });
        });

        $(function () {
            $("#accordion").accordion({
                icons: false,
                collapsible: true,
                active: false,
                heightStyle: "content"
            });
        });

        const faqItems = document.querySelectorAll('.faq__item');
        faqItems.forEach(element => {
            element.addEventListener('click', () => {
                element.classList.toggle('faq__item--active');
                console.log(element)
            })
        });

        const burger = document.querySelector('.burger');
        const menu = document.querySelector('.header__nav');
        const menuLinks = document.querySelectorAll('.header__link');

        burger.addEventListener('click', () => {
            burger.classList.toggle('burger--active');
            menu.classList.toggle('header__nav--active');
            document.body.classList.toggle('stop-scroll');
        });

        menuLinks.forEach(el => {
            el.addEventListener('click', () => {
                burger.classList.remove('burger--active');
                menu.classList.remove('header__nav--active');
                document.body.classList.remove('stop-scroll');
            })
        });

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
            searchInput.value = '';
        });
    })
})()