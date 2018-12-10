import $ from 'jquery';
import { TweenMax } from 'gsap';
// import classie from 'classie';

import { mobilecheck, getUrlVars } from './globals';
import { Base, storageValue, orderLink, styleNum } from './base';
import ColourFunction from './BaseColour';
import { loaderOut } from './Loader';
import { scrollEvents, orderMenu } from './Components';

const Encoding = require('encoding-japanese');

const fontServer = 'https://mark.arena-jp.com/simulation/servlet/MarkSample';
const eventtype2 = mobilecheck() ? 'touchstart' : 'click';


export default class SimulationCommon extends Base {
  constructor(options) {
    super(options);

    this.path = '/simulation/wpcms/wp-content/uploads/';
    this.markPickActive = false;
    this.markOptions = ['a', 'b', 'c', 'j', 'k', 'd', 'i', 'l', 'e', 'm', 'n', 'f', 'l', 'g', 'o'];
  }

  default() {
    // set the url for the json
    const slug = window.location.href.split('?')[0].split('/').pop();
    this.jsonPath = `/simulation/wp-json/wp/v2/posts/?slug=${slug}`;

    this.events();
    this.render();
  }

  render() {
    this.setStyleByCookie();
    this.colour = new ColourFunction({
      jsonUrl: this.jsonPath,
      callback: () => {
        this.markSetAsStart();
        TweenMax.to('.js-base-display', 0.4, {
          autoAlpha: 1,
          onComplete: () => { loaderOut(); },
        });
      },
    });
  }

  events() {
    $(document).on(eventtype2, '.js-rotation', (event) => {
      event.preventDefault();
      this.rotation(event);
    });
    $(document).on(window.eventtype, '.js-modal', (event) => {
      this.modals(event);
    });

    // mark events
    $('.js-colour--mark').on(window.eventtype, 'li', (event) => {
      this.changeColours(event);
      return false;
    });

    $('.js-mark-pick').on(window.eventtype, 'a', (event) => {
      this.markPick(event);
      return false;
    });

    $('.custom-pick__input').on(window.eventtype, '.js-mark-submit', (event) => {
      this.markText(event);
      return false;
    });

    $('.js-mark-pos').on(window.eventtype, 'a', (event) => {
      this.markPosPick(event);
      return false;
    });

    $('.js-mark-family').on('change', 'input', (event) => {
      this.markFamily(event);
    });

    $('.custom-menu__tabs').on(window.eventtype, 'li', (event) => {
      this.tabs(event);
    });

    if (mobilecheck()) {
      $(document).on(eventtype2, '.custom-menu__head', (event) => {
        this.tapMenu(event);
      });
    }
  }

  tabs = (event) => {
    const tabName = $(event.currentTarget).attr('data-tab');

    $('.custom-menu__tabs li').removeClass('active');
    $('.custom-menu__content').removeClass('active');
    $(event.currentTarget).addClass('active');
    $(tabName).addClass('active');
    scrollEvents.scrollNavDisplay();

    // update the scrollbar height
    scrollEvents.updateScrollBar();
  };

  tapMenu = (event) => {
    const $el = $('.custom-menu__content');
    const $tar = $(event.currentTarget).next().next();
    const $tapNav = $('.custom-menu__tap');
    const $tapTar = $(event.currentTarget).next();

    $el.removeClass('active');
    $tar.addClass('active');
    $tapNav.removeClass('is-hidden');
    $tapTar.addClass('is-hidden');
  };

  modals(event) {
    event.preventDefault();

    const modalTar = $(event.currentTarget).attr('data-modal');

    if (!$(event.currentTarget).hasClass('active')) {
      $(event.currentTarget).addClass('active');
      TweenMax.to(modalTar, 0.4, { autoAlpha: 1 });
    } else {
      $(event.currentTarget).removeClass('active');
      TweenMax.to(modalTar, 0.4, { autoAlpha: 0 });
    }

    $('.content').on(window.eventtype, ':not(.modal)', () => {
      this.modalClose(event.currentTarget, modalTar);
    });
  }

  modalClose = (el, target) => {
    $(el).removeClass('active');
    TweenMax.to(target, 0.4, { autoAlpha: 0 });
  };

  rotation() {
    const data = $('.js-rotation').attr('data-svg');
    const rotationDir = $('.js-rotation').attr('data-rotation');

    // front or back
    if (rotationDir === 'front') {
      $('.js-base-display').load(`${this.path}${data}_back.svg`, () => {
        this.restyle();
      });

      $('.js-rotation').attr('data-rotation', 'back');
    } else {
      $('.js-base-display').load(`${this.path}${data}.svg`, () => {
        this.restyle();
      });

      $('.js-rotation').attr('data-rotation', 'front');
    }
  }

  markSetAsStart() {
    // add mark text info at start
    if (getUrlVars().mark && getUrlVars().mark !== '') {
      storageValue.mark = getUrlVars().mark;
      orderLink.mark = getUrlVars().mark;
    }
    // apply if there are queries
    if (getUrlVars().pos && getUrlVars().pos !== '') {
      // set initial localStrage
      console.log('with query');

      if (getUrlVars().mark && getUrlVars().mark !== '') {
        console.log('show order');
        orderMenu.orderInfo();
      }

      this.reloadPage();
    } else {
      // apply no-mark option to dom and localStrage
      console.log('initial start');
      this.markPick($('.js-mark-pick .active'));
    }

    if ($('.js-mark-family input:checked').attr('data-max-lang') === 'en') {
      $('.js-mark-text').addClass('disabled');
    }
  }

  markPick(event) {
    const $tarEl = (event.currentTarget) ? $(event.currentTarget) : event;

    $('.js-mark-pick a').removeClass('active');
    $tarEl.addClass('active');

    const condition = $($tarEl).attr('data-mark');

    // apply if [マーク有り] picked
    if (condition === 'on') {
      // remove overlay
      $('.custom-mark-simulation').css('overflow', 'auto');
      $('.overlay--inactive').remove();

      // retrive mark info
      const pos = $('.js-mark-pos .active').attr('data-pos');

      if (pos) {
        const markFont = $('.js-mark-family input:checked').val();
        const colour = $('.js-colour--mark').find('li.active').attr('data-colour');
        const posTar = `#position-${pos.toLowerCase()}`;
        const $posEl = $(posTar).children(markFont).find('path');

        TweenMax.set($posEl, { fill: colour });
        $('.js-colour--mark').attr('data-target', posTar);
      }

      // apply if mark data already exists in localStrage
      if (orderLink.mark) {
        // update the order link following the stored localStrage info
        this.orderLinkChange();
      } else {
        // pop up order menu
        orderMenu.orderInfoHide();
      }

      // apply initial localStrage
      this.reloadPage();
      this.markSVGShow();
      this.markPickActive = false;
    } else if (!this.markPickActive) {
      // apply just once
      // add overlay on the layer
      const overlay = document.createElement('div');
      overlay.className = 'overlay overlay--inactive';
      document.querySelector('.custom-mark-simulation').appendChild(overlay);
      $('.custom-mark-simulation').css('overflow', 'hidden');

      // update the order link (remove mark data)
      this.currentURL = this.currentURL.split(/[?#]/)[0];
      const styleNumData = styleNum || '';
      const styleData = this.styleName || '';
      const baseColourData = orderLink.bcol || '';
      const orderLinkOrginal = `${this.currentURL}?style${styleNumData}=${styleData}&bcol=${baseColourData}`;
      $('.js-order-save').attr('href', orderLinkOrginal);

      // update scrollbar
      scrollEvents.updateScrollBar();
      // set value on localStrage and change the order link
      if (!orderMenu.orderInfoActive) orderMenu.orderInfo();

      this.markSVGRemove();
      this.markPickActive = true;
    }

    scrollEvents.updateScrollBar();
  }

  markText(event) {
    const text = $('.js-mark-text').val();
    const posData = storageValue.pos || $('.js-mark-pos .active').attr('data-pos');
    const $tar = $('.js-mark-pos').find(`[data-pos="${posData}"]`);
    const $tar2 = $('.js-mark-family input:checked');
    const lang = $tar2.attr('data-max-lang');
    const textLength = $tar.attr(`data-max-${lang}`);

    const encodedText = encodeURIComponent(text);
    const jdata = `/simulation/validation/?lang=${lang}&max=${textLength}&text=${encodedText}&json`;

    $.ajax({
      url: jdata,
      dataType: 'json',
    })
      .done((data) => {
        const { validate, message } = data;

        if (validate) {
          const markPopup = $(event.currentTarget).attr('data-popup');

          TweenMax.to(markPopup, 0.4, { y: '0%' });
          this.markTextToCanvas(text);
          $('.form-message').html('');
        } else {
          $('.form-message').html(message);
        }
      })
      .fail(() => {
        console.log('error');
      })
      .always(() => {
        console.log('complete');
      });

    return false;
  }

  markTextToCanvas(text) {
    const { pos, font, bcol, col } = storageValue;

    // convert text from UTF-8 to SJIS
    const str = text;

    if (str) {
      const imageElem = document.querySelector('.js-mark-check-image');
      const strArray = Encoding.stringToCode(str);
      const sjisArray = Encoding.convert(strArray, 'SJIS', 'UNICODE');
      // const convertedText = Encoding.codeToString(sjisArray);
      const sjisText = Encoding.urlEncode(sjisArray);

      imageElem.src = `${fontServer}?bcol=${bcol}&pos=${pos}&font=${font}&col=${col}&mark=${sjisText}`;
    }

    // show order info menu on the bottom right side
    if (!orderMenu.orderInfoActive && text) orderMenu.orderInfo();

    // set value on localStrage and change the order link
    storageValue.mark = text;
    this.setLocalStrage();
    this.orderLinkChange('mark', text);
  }

  markPosPick(event) {
    const $tarEl = event.currentTarget ? $(event.currentTarget) : event;
    const cate = $tarEl.parents('ul').attr('data-cate');
    const pos = $tarEl.attr('data-pos');
    const side = $tarEl.attr('data-side');
    const rotationInfo = $('.js-rotation').attr('data-rotation');
    const markFont = $('.js-mark-family input:checked').val();
    const colour = $('.js-colour--mark').find('li.active').attr('data-colour');

    $.each(this.markOptions, (index, el) => {
      const $path = $(`#position-${el}`);
      TweenMax.set($path.children().find('path'), { fill: 'none' });
    });

    if (pos) {
      const tar = `#position-${pos.toLowerCase()}`;
      const $el = $(tar).children(markFont).find('path');
      TweenMax.set($el, { fill: colour });
      $('.js-colour--mark').attr('data-target', tar);

      // rotation the item if the mark is positioned on the opposite side
      if (side !== rotationInfo) this.rotation();
    }

    $('.js-mark-pos a').removeClass('active');
    $tarEl.addClass('active');

    // update localStrage and the order link
    this.orderLinkChange(cate, pos);
    storageValue[cate] = pos;
    this.setLocalStrage();
  }

  markFamily(event) {
    const $tarEl = event.currentTarget ? $(event.currentTarget) : event;
    const pos = $('.js-mark-pos a.active').attr('data-pos');
    const code = $('.js-mark-family input:checked').attr('data-code');
    const colour = $('.js-colour--mark').find('li.active').attr('data-colour');
    const markFont = $('.js-mark-family input:checked').val();

    $('.js-mark-family input').prop('checked', false);
    $('.js-mark-family li').removeClass('active');
    $tarEl.prop('checked', true);
    $tarEl.parent().addClass('active');

    if ($tarEl.attr('data-max-lang') === 'en') {
      $('.js-mark-text').addClass('disabled');
      console.log('en');
    } else {
      $('.js-mark-text').removeClass('disabled');
      console.log('em');
    }

    $.each(this.markOptions, (index, el) => {
      const $path = $(`#position-${el}`);
      TweenMax.set($path.children().find('path'), { fill: 'none' });
    });

    if (pos) {
      const tar = `#position-${pos.toLowerCase()}`;
      const $el = $(tar).children(markFont).find('path');
      TweenMax.set($el, { fill: colour });
    }

    // update localStrage and the order link
    this.orderLinkChange('font', code);
    storageValue.font = code;
    this.setLocalStrage();
  }

  markTab = (event) => {
    const target = $(event.currentTarget).attr('data-tab');

    $('.js-custom-pick-tab').add('.js-mark-tab-trigger').removeClass('active');
    $(target).add(event.currentTarget).addClass('active');
  };

  markSVGRemove() {
    $.each(this.markOptions, (index, el) => {
      const $path = $(`#position-${el}`);
      TweenMax.set($path.children().find('path'), { display: 'none' });
    });
  }

  markSVGShow() {
    $.each(this.markOptions, (index, el) => {
      const $path = $(`#position-${el}`);
      TweenMax.set($path.children().find('path'), { display: 'inherit' });
    });
  }

  reloadPage() {
    let $posEl;
    let $familyEl;
    let $colEl;

    if (getUrlVars().pos) {
      $posEl = $('.js-mark-pos').find(`*[data-pos=${getUrlVars().pos}]`);
    } else {
      $posEl = $('.js-mark-pos .active');
    }

    if (getUrlVars().font) {
      $familyEl = $('.js-mark-family li').find(`*[data-code=${String(getUrlVars().font)}]`);
    } else {
      $familyEl = $('.js-mark-family input:checked');
    }

    if (getUrlVars().col) {
      $colEl = $('.js-colour--mark').find(`*[data-code=${getUrlVars().col}]`);
    } else {
      $colEl = $('.js-colour--mark').find('li.active');
    }

    this.markPosPick($posEl);
    this.markFamily($familyEl);
    this.changeColours($colEl);
  }
}

