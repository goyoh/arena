import $ from 'jquery';
import { TweenMax } from 'gsap';
import { readCookie } from '../app/globals';
import ScrollEvents from './ScrollEvents';

export default class Component {
  constructor() {
    this.currentURL = window.location.href;
    this.uploadPath = '/simulation/wpcms/wp-content/uploads/';
    this.markOptions = ['a', 'b', 'c', 'j', 'k', 'd', 'i', 'l', 'e', 'm', 'n', 'f', 'l', 'g', 'o'];
    this.pageID = $('.custom-menu').attr('id');
    this.styleName = $('.js-order-save').data('style');
  }

  static component = {};
  static styleNum = 0;
  static orderLink = {};
  static newOrderLink = {};
  static storageValue = {};

  getStyleByCookie = () => {
    const cookies = ['style1', 'style2', 'style3', 'style4', 'style5'];
    let styleLinkURL = '';

    $.each(cookies, (i) => {
      // apply the style which ain't 0 in Cookie
      if (readCookie.getItem(`style${i + 1}`) !== '0') {
        const val = readCookie.getItem(`style${i + 1}`);
        const res = decodeURIComponent(val);

        styleLinkURL = `${styleLinkURL}&style${i + 1}=${res}`;
      }
    });
    return styleLinkURL;
  }

  setStyleByCookie = () => {
    const cookies = ['style1', 'style2', 'style3', 'style4', 'style5'];
    $.each(cookies, (i) => {
      // apply the style which ain't 0 in Cookie
      if (readCookie.getItem(`style${i + 1}`) === '0') {
        Component.styleNum = i + 1;
        // return false;
      }
    });
  }

  setLocalStrage() {
    localStorage.setItem(this.pageID, JSON.stringify(Component.storageValue));
  }

  orderLinkChange(key, val) {
    Component.orderLink[key] = val;
    this.currentURL = this.currentURL.split(/[?#]/)[0];

    const styleNumData = Component.styleNum || '';
    const styleData = this.styleName || '';

    const posData = Component.orderLink.pos || '';
    const familyData = Component.orderLink.font || '';
    const baseColourData = Component.orderLink.bcol || '';
    const colourData = Component.orderLink.col || '';
    const markData = Component.orderLink.mark || '';

    Component.newOrderLink = `${this.currentURL}?style${styleNumData}=${styleData}&bcol=${baseColourData}&pos=${posData}&font=${familyData}&col=${colourData}&mark=${markData}`;

    const directLink = `
      https://custom.arena-jp.com/order/index.php?module=Flash&action=CreateStyle&style1=
      ${styleData},${baseColourData},${posData},${familyData},${colourData},${markData}
    `;

    $('.js-order-sheet-direct').attr('href', directLink);
    $('.js-order-save').attr('href', Component.newOrderLink);

    $('.js-facebook-link').attr('href', `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${this.currentURL}?bcol=${baseColourData}&pos=${posData}&font=${familyData}&col=${colourData}&mark=${markData}`)}`);
    $('.js-twitter-link').attr('href', `https://twitter.com/home?status=${encodeURIComponent(`${this.currentURL}?bcol=${baseColourData}&pos=${posData}&font=${familyData}&col=${colourData}&mark=${markData}`)}`);
    $('.js-line-link').attr('href', `http://line.me/R/msg/text/?${encodeURIComponent(`${this.currentURL}?bcol=${baseColourData}&pos=${posData}&font=${familyData}&col=${colourData}&mark=${markData}`)}`);
  }

  getMarkData = () => (
    new Promise((resolve) => {
      const colourData = $('.js-colour--mark').find('li.active').data('colour');
      const posData = $('.js-mark-position .active').data('pos');
      const rotationData = $('.js-rotation').data('rotation');
      const markText = $('.js-mark-text').val();

      const $position = $('.js-mark-position').find(`[data-pos="${posData}"]`);

      const $family = $('.js-mark-family input:checked');
      const lang = $family.data('max-lang');
      const familyData = $family.val();
      const familyCode = $family.data('code');

      const textLength = $position.attr(`data-max-${lang}`);

      const data = {
        // condition: markCondition,
        colour: colourData,
        text: markText,
        position: posData,
        family: familyData,
        code: familyCode,
        language: lang,
        length: textLength,
        rotation: rotationData,
      };

      resolve(data);
    })
  )

  colourDraw = (chilel, colour) => {
    // for the svg drawing purpose
    // const stroke = $(chilel).css('stroke');
    // const fill = $(chilel).css('fill');

    TweenMax.set(chilel, { fill: colour });
  }

  changeColours(e) {
    const $tarEl = (e.currentTarget) ? $(e.currentTarget) : e;

    // const $svg = $('.js-base-display').find('svg');
    const tar = $tarEl.parent().data('target');
    let $svgPath;
    console.log($tarEl.parent());

    const cate = $tarEl.parent().data('cate');
    const colour = $tarEl.data('colour');
    const code = $tarEl.data('code');

    const $colourEl = $tarEl.parents('.js-colour');

    // apply if it's the cololour for the mark
    if ($colourEl.is('.js-colour--mark')) {
      const markFont = $('.js-mark-family input:checked').val();

      $colourEl.find('li').removeClass('active');
      $tarEl.addClass('active');

      $svgPath = $(tar).children(markFont).find('path');
      // set localStrage and change the order link
      Component.storageValue[cate] = code;
      this.setLocalStrage();
    } else {
      $svgPath = $(tar).children();
    }

    this.orderLinkChange(cate, code);
    // draw svg
    $svgPath.each((index, el) => {
      this.colourDraw(el, colour);
    });
  }

  restyle() {
    // const $svg = $('.js-base-display').find('svg');
    const storageKey = JSON.parse(localStorage.getItem(this.pageID));

    if (storageKey) {
      // loop all the selector which can be used for restyling the svg item
      $('*[data-cate]').each((index, el) => {
        const tar = $(el).data('target');
        const cate = $(el).data('cate');
        const key = storageKey[cate];

        // apply if it's a category for colouring
        if ($(el).is('.js-colour')) {
          // apply if it's a mark
          if ($(el).is('.js-colour--mark')) {
            const markFont = $('.js-mark-family input:checked').val();
            const $tarEl = $(tar).children(markFont).find('path');

            const colour = $(el).find(`[data-code="${key}"]`).data('colour');

            $tarEl.each((i, chilel) => {
              this.colourDraw(chilel, colour);
            });
          } else if ($(el).is('.js-colour--gradation')) {
            const colour = $(el).find('.active').data('colour');

            $('#a-color > path').css('opacity', 0);
            $(`#colourg${colour}`).css('opacity', 1);
          } else {
            const colour = $(el).find('.active').data('colour');

            $(tar).children().each((i, chilel) => {
              this.colourDraw(chilel, colour);
            });
          }
        }
      });
    }
  }

  updateScrollBar = () => {
    ScrollEvents.updateScrollBar();
  }

  turnOff() { }

  turnOn() { }

  resize(wdt, hgt) { }

  destroy() {
    super.destroy();
  }
}
