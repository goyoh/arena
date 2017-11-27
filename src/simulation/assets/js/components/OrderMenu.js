import $ from 'jquery';
import { TweenMax } from 'gsap';
import { mobilecheck, readCookie, getOrientation } from '../app/globals';

import Component from './Component';

const eventtype = mobilecheck() ? 'touchstart' : 'click';

const OrderMenu = {
  orderInfoActive: false,
  orderLinkActive: false,

  removeFn: (e) => {
    const $tar = (mobilecheck()) ? $(e.currentTarget).parent() : $(e.currentTarget).parent().find('a');
    const styleName = (mobilecheck()) ? $tar.children('.navigation-style__head').text().toLowerCase() : $tar.text().toLowerCase();
    const num = $(e.currentTarget).parent().data('number');
    const $styleList = $(`.js-order-sheet-list li[data-number=${num}]`);

    $styleList.remove();

    $tar.removeClass('registered').removeClass('active');
    readCookie.setItem(styleName, 0, null, '/simulation/');

    if (mobilecheck()) {
      $(e.currentTarget).parent().find('.navigation-style__desc').html('- 未保存 -');
      $(e.currentTarget).remove();
    }
  },

  styleRegistration: () => {
    if (mobilecheck()) {
      $('.navigation-style__list').on(eventtype, '.button--remove', (e) => {
        this.removeFn(e);
      });
    } else {
      $('.header-style__list').on(eventtype, '.icon', (e) => {
        this.removeFn(e);
      });
    }
  },

  orderInfo: () => {
    if (mobilecheck() && getOrientation() === 'Portrait') {
      TweenMax.to('.js-order-info', 0.4, { y: '0%' });
      TweenMax.to('.js-order-info-close--sp', 0.4, { autoAlpha: 1 });
    } else {
      TweenMax.to('.js-order-info', 0.4, { autoAlpha: 1 });
    }

    this.orderInfoActive = true;
  },

  orderInfoHide: () => {
    if (mobilecheck() && getOrientation() === 'Portrait') {
      TweenMax.to('.js-order-info', 0.4, { y: '100%' });
      TweenMax.to('.js-order-info-close--sp', 0.4, { autoAlpha: 0 });
    } else {
      TweenMax.to('.js-order-info', 0.4, { autoAlpha: 0 });
    }

    this.orderInfoActive = false;
  },

  orderInfoShow: (e) => {
    e.preventDefault();

    if (this.orderInfoActive) {
      TweenMax.to('.js-order-info', 0.4, { y: '100%' });
      $(e.currentTarget).addClass('show');
      this.orderInfoActive = false;
    } else {
      TweenMax.to('.js-order-info', 0.4, { y: '0%' });
      $(e.currentTarget).removeClass('show');
      this.orderInfoActive = true;
    }
  },

  orderSheet: (e) => {
    e.preventDefault();

    window.history.pushState({}, 'order', Component.newOrderLink);
    this.orderLinkActive = true;
  },

  orderSheetList: (e) => {
    if ($(e.currentTarget).hasClass('active')) {
      $(e.currentTarget).removeClass('active');
    } else {
      $(e.currentTarget).addClass('active');
    }
  },

  orderLinkMake: (e) => {
    e.preventDefault();
    const sendURL = $(e.currentTarget).data('send');
    let styleInfo = '';

    $('.js-order-sheet-list li.active').each((i, el) => {
      styleInfo = `${styleInfo}&${decodeURIComponent($(el).attr('data-style'))}`;
    });

    if ($('.js-order-sheet-list li.active').length > 0) {
      window.location.href = `https:${sendURL}${styleInfo}`;
    }
  },
};

export default OrderMenu;
