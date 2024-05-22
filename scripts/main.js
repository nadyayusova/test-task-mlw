// intro
// всплывает текст
// появляется изображение по бокам
// странная штука в центре увеличивается и параллакс по мышке

// video
// выключение воспроизведения при выходе из блока, включение при входе

// parallax
// галерея изображений с параллаксом

document.addEventListener('DOMContentLoaded', () => {
  new SplitType('#str-1', {types: 'words', tagName: 'span'});
  new SplitType('#str-2', {types: 'words', tagName: 'span'});
  new SplitType('#str-3', {types: 'words', tagName: 'span'});

  gsap.set(['#str-1', '#str-2', '#str-3'], {opacity: 1});

  gsap
    .timeline()
    .addLabel('start')
    .to('.intro__bg', {
      clipPath: 'polygon(0 100%, 100% 100%, 100% 0, 0 0)',
      duration: 1.5,
      ease: 'linear',
    })
    .to(
      '.word',
      {
        y: 0,
        stagger: 0.05,
        duration: 0.5,
      },
      'start+=0.5',
    )
    .to('.intro__ellipse', {scale: 0.9, ease: 'none'}, '<');

  const video = document.querySelector('.video [data-video-media]');
  if (video) {
    ScrollTrigger.create({
      trigger: document.querySelector('.video'),
      start: 'top bottom',
      end: 'bottom top',
      onEnter: () => video.play(),
      onEnterBack: () => video.play(),
      onLeave: () => video.pause(),
      onLeaveBack: () => video.pause(),
    });
  }

  const container = document.querySelector('.parallax');
  const items = gsap.utils.toArray('.parallax__item');
  if (container && items.length) {
    gsap.set(items, {
      x: (_, elem) => elem.dataset.from,
    });

    /* Не используем pin, с ним есть проблемы на тач устройствах.
     * Поскольку современные планшеты имеют разрешение ~1200px,
     * то мы не можем отделять их брейкпоинтом (max-width: 1023px).
     * Так же не рационально делать отдельную анимацию под тач устройства,
     * используя (pointer: coarse).
     * Вместо фиксирования элементов используем нативный position: sticky; .
     * Это свойство максимально предсказуемое и поддерживается всеми современными браузерами.
     */
    gsap.to(items, {
      x: (_, elem) => elem.dataset.to,
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        scrub: true,
        start: 'top top',
        end: 'bottom bottom',
      },
    });
  }
});
