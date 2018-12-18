import $ from 'jquery';
import classie from 'classie';
import { TweenMax } from 'gsap';
import PerfectScrollbar from 'perfect-scrollbar';

import { mobilecheck, getOrientation, readCookie } from './globals';
import { newOrderLink } from './base';

const navigationMenu = () => {
  const nav = document.getElementById('navigation');
  const trigger = document.getElementById('navigation-trigger');

  const resetMenu = (callback) => {
    TweenMax.to(nav, 0.4, {
      autoAlpha: 0,
      x: '100%',
      onComplete: () => {
        classie.remove(trigger, 'active');
        classie.remove(nav, 'navigation--show');
        if (callback) callback();
      },
    });
  };

  trigger.addEventListener(window.eventtype, (e) => {
    e.preventDefault();

    if (classie.has(trigger, 'active')) {
      resetMenu();
    } else {
      classie.add(trigger, 'active');
      classie.add(nav, 'navigation--show');
      TweenMax.to(nav, 0.3, { x: '0%', autoAlpha: 1 });
    }
  });
};

const scrollEvents = {
  scrollPosition: 0,

  headerHeight: $('.header').outerHeight(),

  topScroll: (e) => {
    e.preventDefault();

    const tar = $(e.currentTarget).attr('href');
    const headerHeight = $('.header').outerHeight();
    const bannerHeight = $(tar).find('.item-head').outerHeight();
    const tarTop = ($(tar).offset().top + bannerHeight) - headerHeight;

    $('html, body').animate({ scrollTop: tarTop });
  },

  scrollNavDisplay: () => {
    // const elHeight = $('.custom-menu').height() - $('.custom-menu__tabs').height();
    // const innerElHeight = $('.custom-menu__content.active').height();

    const elTop = $('.custom-menu').scrollTop();
    const alphaVal = elTop === 0 ? 1 : 0;

    TweenMax.set('.js-read-more', { autoAlpha: alphaVal });
  },

  scrollNav: (e) => {
    const elTop = $(e.currentTarget).scrollTop();
    const alphaVal = elTop === 0 ? 1 : 0;

    TweenMax.set('.js-read-more', { autoAlpha: alphaVal });
  },

  scrollBottom: (e) => {
    const elHeight = $(e.currentTarget).height();

    $('.custom-menu').animate({ scrollTop: elHeight });
  },

  scrollBarStyle: () => {
    const el = document.querySelector('.custom-menu');

    if (el) {
      this.ps = new PerfectScrollbar(el, {
        wheelSpeed: 3,
        minScrollbarLength: 5,
      });
    }
  },

  updateScrollBar: () => {
    // update the scrollbar height
    // const el = document.querySelector('.custom-menu');
    if (this.ps) this.ps.update();
  },

  headerReveal: () => {
    const st = $(window).scrollTop();

    if (st > 10 && scrollEvents.scrollPosition < st) {
      TweenMax.to('.header, .content-navigation', 0.4, { y: -scrollEvents.headerHeight });
    } else if (scrollEvents.scrollPosition > st) {
      TweenMax.to('.header, .content-navigation', 0.4, { y: 0 });
    } else {
      TweenMax.to('.header, .content-navigation', 0.4, { y: 0 });
    }

    scrollEvents.scrollPosition = st;
  },
};

const popups = {
  popup: (e) => {
    e.preventDefault();
    this.popupTar = $(e.currentTarget).data('popup');

    TweenMax.to(this.popupTar, 0.4, { y: '0%' });
  },

  popupClose: (e) => {
    e.preventDefault();
    TweenMax.to(this.popupTar, 0.4, { y: '100%' });
  },
};

const orderMenu = {
  orderInfoActive: false,
  orderLinkActive: false,

  removeFn: (e) => {
    const $tar = $(e.currentTarget);
    const $el = (mobilecheck()) ? $tar.parent() : $tar.parent().find('a');
    const $style = (mobilecheck()) ? $el.children('.navigation-style__head') : $el;
    const styleName = $style.text().toLowerCase();
    const num = $tar.parent().data('number');
    const $styleList = $(`.js-order-sheet-list li[data-number=${num}]`);

    $styleList.remove();

    $el.removeClass('registered').removeClass('active');
    readCookie.setItem(styleName, 0, null, '/simulation/');

    if (mobilecheck()) {
      $tar.parent().find('.navigation-style__desc').html('- 未保存 -');
      $tar.remove();
    }
  },

  styleRegistration: () => {
    const $container = mobilecheck() ? $('.navigation-style__list') : $('.header-style__list');
    const tar = mobilecheck() ? '.button--remove' : '.icon--style-close';

    $container.on(window.eventtype, tar, (e) => {
      orderMenu.removeFn(e);
    });
  },

  orderInfo: () => {
    if (mobilecheck() && getOrientation() === 'Portrait') {
      TweenMax.to('.js-order-info', 0.4, { y: '0%' });
      TweenMax.to('.js-order-info-close--sp', 0.4, { autoAlpha: 1 });
    } else {
      TweenMax.to('.js-order-info', 0.4, { autoAlpha: 1 });
    }

    orderMenu.orderInfoActive = true;
  },

  orderInfoHide: () => {
    if (mobilecheck() && getOrientation() === 'Portrait') {
      TweenMax.to('.js-order-info', 0.4, { y: '100%' });
      TweenMax.to('.js-order-info-close--sp', 0.4, { autoAlpha: 0 });
    } else {
      TweenMax.to('.js-order-info', 0.4, { autoAlpha: 0 });
    }

    orderMenu.orderInfoActive = false;
  },

  orderInfoShow: (e) => {
    e.preventDefault();

    const yValue = orderMenu.orderInfoActive ? '100%' : '0%';
    TweenMax.to('.js-order-info', 0.4, { y: yValue });
    $(e.currentTarget).toggleClass('show');

    orderMenu.orderInfoActive = !orderMenu.orderInfoActive;
  },

  orderSheet: (e) => {
    e.preventDefault();

    window.history.pushState({}, 'order', newOrderLink);
    orderMenu.orderLinkActive = true;
  },

  orderSheetList: (e) => {
    $(e.currentTarget).toggleClass('active');

    // if ($(e.currentTarget).hasClass('active')) {
    //   $(e.currentTarget).removeClass('active');
    // } else {
    //   $(e.currentTarget).addClass('active');
    // }
  },

  orderLinkMake: (e) => {
    e.preventDefault();

    const sendURL = $(e.currentTarget).data('send');
    const $items = $('.js-order-sheet-list li.active');
    let styleInfo = '';

    $items.each((i, el) => {
      const style = decodeURIComponent($(el).data('style'));
      styleInfo = `${styleInfo}&${style}`;
    });

    if ($items.length > 0) window.location.href = `https:${sendURL}${styleInfo}`;
  },
};

export { scrollEvents, popups, orderMenu, navigationMenu };
