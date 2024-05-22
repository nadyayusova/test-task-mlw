// слежение блоков за мышью
// data-animate-parallax-container - обертка, в пределах которой отслеживается движение мыши
// data-animate-parallax-element - перемещаемый элемент, значение = скорости перемещения
// data-direction - по направлению мыши или противоположно (значения 1, -1)
// data-speed - скорость перемещения элемента

const followMouseAnimation = () => {
  if (ScrollTrigger.isTouch === 1) {
    return;
  }

  const containers = [...document.querySelectorAll('[data-animate-parallax-container]')];

  if (!containers.length) {
    return;
  }

  containers.forEach((container) => {
    let rect = container.getBoundingClientRect();

    const mouse = {x: 0, y: 0, moved: false, leave: false};

    container.addEventListener('mousemove', function (e) {
      mouse.moved = true;
      mouse.leave = false;
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });

    container.addEventListener('mouseleave', function (e) {
      mouse.moved = false;
      mouse.leave = true;
    });

    gsap.ticker.add(function () {
      if (mouse.moved) {
        const parallaxEl = container.querySelectorAll('[data-animate-parallax-element]');
        parallaxEl.forEach((element) => {
          const paraValue = mouse.leave ? 0 : element.dataset.animateParallaxElement;
          const easing = 'power2';
          const speed = mouse.leave ? 1 : element.dataset.speed;
          parallaxIt(element, paraValue, speed, easing, element.dataset.direction);
        });
      }
      mouse.moved = false;
    });

    function parallaxIt(target, movement, speed, easing, direction) {
      gsap.to(target, {
        duration: speed,
        ease: easing,
        x: direction * ((mouse.x - rect.width / 2) / rect.width) * movement,
        y: direction * ((mouse.y - rect.height / 2) / rect.height) * movement,
      });
    }

    window.addEventListener('resize', updateRect);
    window.addEventListener('scroll', updateRect);

    function updateRect() {
      rect = container.getBoundingClientRect();
    }
  });
};

followMouseAnimation();
