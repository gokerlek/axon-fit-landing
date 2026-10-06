(() => {
  const motion = window.Motion;
  if (!motion) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reducedMotion.matches) {
    document.documentElement.dataset.motion = 'reduced';
    return;
  }

  const { animate, inView, scroll, stagger } = motion;
  const ease = [0.16, 1, 0.3, 1];
  const up = distance => [
    `translate3d(0, ${distance}px, 0)`,
    'translate3d(0, 0, 0)',
  ];

  document.documentElement.dataset.motion = 'active';

  // The two real app screens arrive after the message, as the next step in the story.
  animate(
    document.querySelectorAll('.hero-copy > *'),
    { opacity: [0, 1], transform: up(26) },
    { duration: 0.7, delay: stagger(0.09), ease },
  );
  animate(
    '.hero-pt',
    {
      opacity: [0, 1],
      transform: ['translate3d(52px, 10px, 0) scale(.96)', 'translate3d(0, 0, 0) scale(1)'],
    },
    { duration: 0.85, delay: 0.16, ease },
  );
  animate(
    '.hero-client',
    {
      opacity: [0, 1],
      transform: ['translate3d(34px, 40px, 0) scale(.94)', 'translate3d(0, 0, 0) scale(1)'],
    },
    { duration: 0.85, delay: 0.34, ease },
  );
  animate(
    document.querySelectorAll('.media-note, .media-caption'),
    { opacity: [0, 1] },
    { duration: 0.55, delay: 0.65, ease },
  );
  scroll(
    animate(
      '.hero-media',
      { transform: ['translate3d(0, 0, 0)', 'translate3d(0, -48px, 0)'] },
      { ease: 'linear' },
    ),
    { target: document.querySelector('.hero'), offset: ['start start', 'end start'] },
  );

  // Walk through two states captured from the real demo. The frames remain links to it.
  const media = document.querySelector('.hero-media');
  const ptAction = media?.querySelector('.hero-pt .preview-state-action');
  const clientAction = media?.querySelector('.hero-client .preview-state-action');
  const pointer = media?.querySelector('.preview-pointer');
  const ptPress = media?.querySelector('.hero-pt .preview-press');
  const clientPress = media?.querySelector('.hero-client .preview-press');
  if (media && ptAction && clientAction && pointer && ptPress && clientPress) {
    let visible = false;
    let paused = false;
    let timers = [];
    let animations = [];

    const resetPreview = () => {
      animations.forEach(animation => animation.cancel());
      animations = [];
      ptAction.style.opacity = '0';
      clientAction.style.opacity = '0';
      pointer.style.opacity = '0';
      ptPress.style.opacity = '0';
      clientPress.style.opacity = '0';
    };
    const stopPreview = () => {
      timers.forEach(clearTimeout);
      timers = [];
      resetPreview();
    };
    const later = (callback, delay) => {
      timers.push(setTimeout(() => {
        if (visible && !paused) callback();
      }, delay));
    };
    const play = (element, keyframes, options) => {
      animations.push(animate(element, keyframes, options));
    };
    const press = element => {
      play(element, {
        opacity: [0, .95, 0],
        transform: ['translate(-50%, -50%) scale(.35)', 'translate(-50%, -50%) scale(1.45)'],
      }, { duration: .52, ease: 'easeOut' });
    };
    const cycle = () => {
      stopPreview();
      play(pointer, {
        opacity: [0, 1],
        transform: ['translate3d(95px, -52px, 0)', 'translate3d(0, 0, 0)'],
      }, { duration: .82, ease });
      later(() => press(ptPress), 1050);
      later(() => play(ptAction, { opacity: [0, 1] }, { duration: .48, ease }), 1220);
      later(() => play(pointer, { opacity: [1, 0] }, { duration: .3 }), 1450);
      later(() => press(clientPress), 3450);
      later(() => play(clientAction, { opacity: [0, 1] }, { duration: .48, ease }), 3620);
      later(cycle, 6600);
    };
    const startPreview = () => {
      if (visible && !paused) later(cycle, 1200);
    };

    media.addEventListener('mouseenter', () => {
      paused = true;
      stopPreview();
    });
    media.addEventListener('mouseleave', () => {
      paused = false;
      startPreview();
    });
    media.addEventListener('focusin', () => {
      paused = true;
      stopPreview();
    });
    media.addEventListener('focusout', event => {
      if (!media.contains(event.relatedTarget)) {
        paused = false;
        startPreview();
      }
    });
    inView(media, () => {
      visible = true;
      startPreview();
      return () => {
        visible = false;
        stopPreview();
      };
    }, { amount: .4 });
  }

  const reveal = (selector, distance = 24, options = {}) => {
    inView(selector, element => {
      animate(
        element,
        { opacity: [0, 1], transform: up(distance) },
        { duration: 0.62, ease, ...options },
      );
    }, { amount: 0.2, margin: '0px 0px -6% 0px' });
  };

  inView('.quick-line', () => {
    animate(
      document.querySelectorAll('.quick-line p'),
      { opacity: [0, 1], transform: up(15) },
      { duration: 0.5, delay: stagger(0.11), ease },
    );
  }, { amount: 0.3 });

  reveal('.section-heading');
  inView('.feature-group', group => {
    animate(
      group.querySelector('.feature-group-heading'),
      { opacity: [0, 1], transform: up(22) },
      { duration: 0.58, ease },
    );
    animate(
      group.querySelectorAll('.feature-item'),
      { opacity: [0, 1], transform: up(20) },
      { duration: 0.58, delay: stagger(0.08), ease },
    );
  }, { amount: 0.18, margin: '0px 0px -5% 0px' });
  reveal('.feature-outro');
  reveal('.camera-copy', 28);
  inView('.camera-image', element => {
    animate(
      element,
      { opacity: [0, 1], transform: ['translate3d(36px, 0, 0)', 'translate3d(0, 0, 0)'] },
      { duration: 0.75, ease },
    );
  }, { amount: 0.15 });
  reveal('.ownership-main');
  reveal('.ownership-list');
  reveal('.about-grid > div');
  reveal('.setup-intro > div');
  reveal('.setup-step', 18, { duration: 0.5 });
  reveal('.setup-footer');
  reveal('.last-grid > div');

  const progress = document.querySelector('.reading-progress span');
  if (progress) {
    scroll(
      animate(progress, { transform: ['scaleX(0)', 'scaleX(1)'] }, { ease: 'linear' }),
    );
  }
})();
