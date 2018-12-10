import $ from 'jquery';
import { TweenMax } from 'gsap';

import { decodeHtmlEntity, mobilecheck, getOrientation, getUrlVars, readCookie } from './globals';

export const storageValue = {};
export const orderLink = {};
export let styleNum;
export let newOrderLink = {};

const cookies = ['style1', 'style2', 'style3', 'style4', 'style5'];

export class Base {
  constructor() {
    this.currentURL = window.location.href;
    this.pageID = $('.custom-menu').attr('id');
    this.styleName = $('.js-order-save').attr('data-style');
  }

  get getStyleByCookie() {
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
    $.each(cookies, (i) => {
      // apply the style which ain't 0 in Cookie
      if (readCookie.getItem(`style${i + 1}`) == '0') {
        styleNum = i + 1;
        // return false;
      }
    });
  }

  setLocalStrage() {
    localStorage.setItem(this.pageID, JSON.stringify(storageValue));
  }

  orderLinkChange(key, val) {
    orderLink[key] = val;
    this.currentURL = this.currentURL.split(/[?#]/)[0];

    const styleNumData = styleNum || '';
    const styleData = this.styleName || '';
    const { pos = '', font = '', bcol = '', col = '', mark = '' } = orderLink;
    // let posData = orderLink['pos'] || '';
    // let familyData = orderLink['font'] || '';
    // let baseColourData = orderLink['bcol'] || '';
    // let colourData = orderLink['col'] || '';
    // let markData = orderLink['mark'] || '';

    newOrderLink = `${this.currentURL}?style${styleNumData}=${styleData}&bcol=${bcol}&pos=${pos}&font=${font}&col=${col}&mark=${mark}`;
    const directLink = `https://custom.arena-jp.com/order/index.php?module=Flash&action=CreateStyle&style1=${styleData},${bcol},${pos},${font},${col},${mark}`;

    $('.js-order-sheet-direct').attr('href', directLink);
    $('.js-order-save').attr('href', newOrderLink);

    $('.js-facebook-link').attr('href', `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${this.currentURL}?bcol=${bcol}&pos=${pos}&font=${font}&col=${col}&mark=${mark}`)}`);
    $('.js-twitter-link').attr('href', `https://twitter.com/home?status=${encodeURIComponent(`${this.currentURL}?bcol=${bcol}&pos=${pos}&font=${font}&col=${col}&mark=${mark}`)}`);
    $('.js-line-link').attr('href', `http://line.me/R/msg/text/?${encodeURIComponent(`${this.currentURL}?bcol=${bcol}&pos=${pos}&font=${font}&col=${col}&mark=${mark}`)}`);
  }

  colourDraw = (chilel, colour) => {
    // for the svg drawing purpose
    // const stroke = $(chilel).css('stroke');
    // const fill = $(chilel).css('fill');

    TweenMax.set(chilel, { fill: colour });
  }

  changeColours(event) {
    const $tarEl = (event.currentTarget) ? $(event.currentTarget) : event;

    // const svg = $('.js-base-display').find('svg');
    const tar = $tarEl.parent().attr('data-target');
    const cate = $tarEl.parent().attr('data-cate');

    const colour = $tarEl.attr('data-colour');
    const code = $tarEl.attr('data-code');
    let svgPath;

    // apply if it's the cololour for the mark
    if ($tarEl.parents('.js-colour').hasClass('js-colour--mark')) {
      const markFont = $('.js-mark-family input:checked').val();

      svgPath = $(tar).children(markFont).find('path');
      $('.js-colour--mark li').removeClass('active');
      $tarEl.addClass('active');

      // set localStrage and change the order link
      this.orderLinkChange(cate, code);
      storageValue[cate] = code;
      this.setLocalStrage();
    } else {
      svgPath = $(tar).children();
      this.orderLinkChange(cate, code);
    }

    // draw svg
    svgPath.each((index, el) => {
      this.colourDraw(el, colour);
    });
  }

  restyle() {
    // const svg = $('.js-base-display').find('svg');
    const strageKey = JSON.parse(localStorage.getItem(this.pageID));

    if (strageKey) {
      // loop all the selector which can be used for restyling the svg item
      $('*[data-cate]').each((index, el) => {
        const tar = $(el).attr('data-target');
        const cate = $(el).attr('data-cate');
        const key = strageKey[cate];
        // apply if it's a category for colouring
        if ($(el).hasClass('js-colour')) {
          // apply if it's for the mark
          if ($(el).hasClass('js-colour--mark')) {
            const markFont = $('.custom-pick__fonts input:checked').val();
            const $tarEl = $(tar).children(markFont).find('path');
            const colour = $(el).find(`[data-code="${key}"]`).attr('data-colour');

            $tarEl.each((i, chilel) => {
              this.colourDraw(chilel, colour);
            });
          } else if ($(el).hasClass('js-colour--gradation')) {
            const colour = $(el).find('.active').attr('data-colour');

            $('#a-color > path').css('opacity', 0);
            $(`#colourg${colour}`).css('opacity', 1);
          } else {
            const colour = $(el).find('.active').attr('data-colour');

            $(tar).children().each((i, chilel) => {
              this.colourDraw(chilel, colour);
            });
          }
        }
      });
    }
  }
}