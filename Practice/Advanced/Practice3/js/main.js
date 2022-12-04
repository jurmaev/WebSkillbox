(() => {

  setTimeout(() => {
    gsap.from('.hero__left', {
      opacity: 0,
      y: 100,
      duration: 1
    });
  }, 200);

  setTimeout(() => {
    gsap.to('.hero__descr', {
      opacity: 1,
      duration: 1.5
    });
  }, 1300);

  setTimeout(() => {
    gsap.to('#photo1', {
      opacity: 1,
      duration: 1
    });
  }, 1500);

  setTimeout(() => {
    gsap.to('#photo2', {
      opacity: 1,
      duration: 1
    });
  }, 1800);

  setTimeout(() => {
    gsap.to('#photo3', {
      opacity: 1,
      duration: 1
    });
  }, 2000);

  setTimeout(() => {
    gsap.to('.photos__author', {
      opacity: 1,
      duration: 1.5
    });
  }, 2100);


  const openBurger = document.querySelector('.burger');
  const closeBurger = document.querySelector('.close');
  const tl = gsap.timeline({ paused: true });

  openBurger.addEventListener('click', () => tl.play());
  closeBurger.addEventListener('click', () => tl.reverse());

  tl
    .fromTo('.menu', {
      display: 'none',
      y: 100,
      opacity: 0
    }, {
      display: 'block',
      y: 0,
      opacity: 1,
      duration: .7,
      ease: 'circle'
    })
    .from('.menu__top', {
      opacity: 0,
      duration: .5,
      ease: 'circle'
    })
    .from('.social, .menu__right', {
      delay: 0.3,
      opacity: 0,
      y: 25,
      duration: 0.5,
      ease: 'circle'
    });
})()
