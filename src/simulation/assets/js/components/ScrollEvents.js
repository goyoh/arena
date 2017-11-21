export default const ScrollEvents = {
  topScroll: (e) => {
    e.preventDefault();

    const tar = $(e.currentTarget).attr('href');
    const headerHeight = $('.header').outerHeight();
    const bannerHeight = $(tar).find('.item-head').outerHeight();

    const tarTop = $(tar).offset().top + bannerHeight - headerHeight + 2;

    $('html, body').animate({ scrollTop: tarTop });
  },

  scrollNavDisplay: () => {
    const elHeight = $('.custom-menu').height() - $('.custom-menu__tabs').height();
    const innerElHeight = $('.custom-menu__content.active').height();

    const alphaVal = elHeight < innerElHeight ? 1 : 0;

    TweenMax.set('.js-read-more', { autoAlpha: alphaVal });
  },

  scrollNav: (e) => {
    let elTop = $(e.currentTarget).scrollTop();
    let elHeight = $(e.currentTarget).height();

    const alphaVal = elTop === 0 ? 1 : 0;
    TweenMax.to('.js-read-more', 0.4, { autoAlpha: alphaVal });
  },

  scrollBottom: (e) => {
    const elHeight = $(e.currentTarget).height();
    $('.custom-menu').animate({ scrollTop: elHeight });
  },

  scrollBarStyle: () => {
    const el = document.querySelector('.custom-menu');

    setTimeout(() => {
      Ps.initialize(el, {
        wheelSpeed: 3,
        minScrollbarLength: 5
      });
    }, 400);
  },
}
