import $ from 'jquery';
import { TweenMax } from 'gsap';
import PerfectScrollbar from 'perfect-scrollbar';

import { mobilecheck, getOrientation, readCookie } from './globals';
import { newOrderLink } from './base';

const headerHeight = $('.header').outerHeight();

const scrollEvents = {
  topScroll: function topScroll() {
    $(document).on(window.eventtype, '.js-scroll-link', (event) => {
      event.preventDefault();

      const tar = $(event.currentTarget).attr('href');
      const bannerHeight = $(tar).find('.item-head').outerHeight();
      const tarTop = $(tar).offset().top + bannerHeight - headerHeight + 2;

      $('html, body').animate({ scrollTop: tarTop });
    });
  },

  scrollNavDisplay: function scrollNavDisplay() {
    const elHeight = $('.custom-menu').height() - $('.custom-menu__tabs').height();
    const innerElHeight = $('.custom-menu__content.active').height();

    if (elHeight < innerElHeight) {
      TweenMax.set('.js-read-more', { autoAlpha: 1 });
    } else {
      TweenMax.set('.js-read-more', { autoAlpha: 0 });
    }
  },

  scrollNav: function scrollNav() {
    $('.custom-menu').on('scroll', (event) => {
      const elTop = $(event.currentTarget).scrollTop();
      // const elHeight = $(event.currentTarget).height();

      if (elTop === 0) {
        TweenMax.to('.js-read-more', 0.4, { autoAlpha: 1 });
      } else {
        TweenMax.to('.js-read-more', 0.4, { autoAlpha: 0 });
      }
    });
  },

  scrollBottom: function scrollBottom() {
    $(document).on('click', '.js-read-more', () => {
      const elHeight = $(event.currentTarget).height();
      $('.custom-menu').animate({ scrollTop: elHeight });
    });
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
};

const popups = {
  popup: function popup(event) {
    const popupTar = $(event.currentTarget).attr('data-popup');
    TweenMax.to(popupTar, 0.4, { y: '0%' });
  },
  popupClose: function popupClose() {
    TweenMax.to('.js-popup', 0.4, { y: '100%' });
  },
};

const orderMenu = {
  orderInfoActive: false,
  orderLinkActive: false,
  styleRegistration: function styleRegistration() {
    $('.header-style__list').on(window.eventtype, '.icon', (event) => {
      // event.preventDefault();
      const $tar = $(event.currentTarget).parent().find('a');
      const styleName = $tar.text().toLowerCase();
      const num = $(event.currentTarget).parent().attr('data-number');
      const $styleList = $(`.js-order-sheet-list li[data-number=${num}]`);

      $styleList.remove();

      $tar.removeClass('registered').removeClass('active');
      readCookie.setItem(styleName, 0, null, '/simulation/');

      if (mobilecheck()) {
        $(event.currentTarget).find('.navigation-style__desc').html('- 未保存 -');
        $(event.currentTarget).find('.button--remove').remove();
      }
    });
  },
  orderInfo: function orderInfo() {
    if (mobilecheck() && getOrientation() === 'Portrait') {
      TweenMax.to('.js-order-info', 0.4, { y: '0%' });
      TweenMax.to('.js-order-info-close--sp', 0.4, { autoAlpha: 1 });
    } else {
      TweenMax.to('.js-order-info', 0.4, { autoAlpha: 1 });
    }

    orderMenu.orderInfoActive = true;
  },
  orderInfoHide: function orderInfoHide() {
    if (mobilecheck() && getOrientation() === 'Portrait') {
      TweenMax.to('.js-order-info', 0.4, { y: '100%' });
      TweenMax.to('.js-order-info-close--sp', 0.4, { autoAlpha: 0 });
    } else {
      TweenMax.to('.js-order-info', 0.4, { autoAlpha: 0 });
    }

    orderMenu.orderInfoActive = false;
  },
  orderInfoShow: function orderInfoShow() {
    $('.js-order-info').on('click', '.js-order-info-close--sp', (event) => {
      if (orderMenu.orderInfoActive) {
        TweenMax.to('.js-order-info', 0.4, { y: '100%' });
        $(event.currentTarget).addClass('show');
        orderMenu.orderInfoActive = false;
      } else {
        TweenMax.to('.js-order-info', 0.4, { y: '0%' });
        $(event.currentTarget).removeClass('show');
        orderMenu.orderInfoActive = true;
      }

      return false;
    });
  },
  orderSheet: function orderSheet() {
    $(document).on(window.eventtype, '.js-order-sheet', () => {
      // output the values set in the localStrage
      window.history.pushState({}, 'order', newOrderLink);
      orderMenu.orderLinkActive = true;

      return false;
    });

    $('.js-order-sheet-list').on(window.eventtype, 'li', (event) => {
      // const $pick = $('.js-order-sheet-pick');

      if (!$(event.currentTarget).hasClass('active')) {
        $(event.currentTarget).addClass('active');
      } else {
        $(event.currentTarget).removeClass('active');
      }
    });
  },
  orderLinkMake: function orderLinkMake() {
    $(document).on(window.eventtype, '.js-order-link-make', () => {
      const sendURL = $(event.currentTarget).attr('data-send');
      let styleInfo = '';

      $('.js-order-sheet-list li.active').each((i, el) => {
        styleInfo = `${styleInfo}&${decodeURIComponent($(el).attr('data-style'))}`;
      });
      // let base = new Base;
      if ($('.js-order-sheet-list li.active').length > 0) {
        window.location.href = `https:${sendURL}${styleInfo}`;
      }

      return false;
    });
  },
};

export { scrollEvents, popups, orderMenu };
