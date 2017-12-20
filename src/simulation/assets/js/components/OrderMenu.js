import $ from 'jquery';
import { TweenMax } from 'gsap';
import { mobilecheck, readCookie, getOrientation } from '../app/globals';

import Component from './Component';

const eventtype = mobilecheck() ? 'touchstart' : 'click';

const OrderMenu = {
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
    const $container = (mobilecheck()) ? $('.navigation-style__list') : $('.header-style__list');
    const tar = (mobilecheck()) ? '.button--remove' : '.icon';

    $container.on(eventtype, tar, (e) => {
      this.removeFn(e);
    });
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

    const yValue = this.orderInfoActive ? '100%' : '0%';
    TweenMax.to('.js-order-info', 0.4, { y: yValue });
    $(e.currentTarget).toggleClass('show');

    this.orderInfoActive = !this.orderInfoActive;
  },

  orderSheet: (e) => {
    e.preventDefault();

    window.history.pushState({}, 'order', Component.newOrderLink);
    this.orderLinkActive = true;
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
      styleInfo = `${styleInfo}&${decodeURIComponent($(el).data('style'))}`;
    });

    if ($items.length > 0) window.location.href = `https:${sendURL}${styleInfo}`;
  },
};

export default OrderMenu;
