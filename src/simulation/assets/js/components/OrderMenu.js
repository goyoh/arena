import $ from 'jquery';
import { TweenMax } from 'gsap';
import { mobilecheck, readCookie, getOrientation } from '../app/globals';

import Component from './Component';

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
    const $container = mobilecheck() ? $('.navigation-style__list') : $('.header-style__list');
    const tar = mobilecheck() ? '.button--remove' : '.icon--style-close';

    $container.on(window.eventtype, tar, (e) => {
      console.log(this);
      OrderMenu.removeFn(e);
    });
  },

  orderInfo: () => {
    if (mobilecheck() && getOrientation() === 'Portrait') {
      TweenMax.to('.js-order-info', 0.4, { y: '0%' });
      TweenMax.to('.js-order-info-close--sp', 0.4, { autoAlpha: 1 });
    } else {
      TweenMax.to('.js-order-info', 0.4, { autoAlpha: 1 });
    }

    OrderMenu.orderInfoActive = true;
  },

  orderInfoHide: () => {
    if (mobilecheck() && getOrientation() === 'Portrait') {
      TweenMax.to('.js-order-info', 0.4, { y: '100%' });
      TweenMax.to('.js-order-info-close--sp', 0.4, { autoAlpha: 0 });
    } else {
      TweenMax.to('.js-order-info', 0.4, { autoAlpha: 0 });
    }

    OrderMenu.orderInfoActive = false;
  },

  orderInfoShow: (e) => {
    e.preventDefault();

    const yValue = OrderMenu.orderInfoActive ? '100%' : '0%';
    TweenMax.to('.js-order-info', 0.4, { y: yValue });
    $(e.currentTarget).toggleClass('show');

    OrderMenu.orderInfoActive = !OrderMenu.orderInfoActive;
  },

  orderSheet: (e) => {
    e.preventDefault();

    window.history.pushState({}, 'order', Component.newOrderLink);
    OrderMenu.orderLinkActive = true;
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

export default OrderMenu;
