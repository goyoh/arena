import $ from 'jquery';
import { TweenMax } from 'gsap';
import { mobilecheck, getUrlVars } from '../app/globals';
import { loaderOut, spinner } from '../app/Loader';
import Component from './Component';

import BaseColour from './BaseColour';
import ScrollEvents from './ScrollEvents';
import OrderMenu from './OrderMenu';

// const uploadPath = '1/simulation/wpcms/wp-content/uploads/sites/2/';
const uploadPath = 'https://custom.arena-jp.com/simulation/wpcms/wp-content/uploads/';

export default class SimulationCommon extends Component {
  constructor(props) {
    super(props);

    const slug = window.location.href.split('?')[0].split('/').pop();
    // this.jsonPath = `https://custom.arena-jp.com/simulation/wp-json/wp/v2/posts/?slug=${slug}`;
    this.jsonPath = 'https://custom.arena-jp.com/simulation/wp-json/wp/v2/posts/?slug=oar-7010w';

    this.render();
  }

  render() {
    this.setStyleByCookie();
    this.events();

    this.baseColour = new BaseColour({
      jsonUrl: this.jsonPath,
      callback: () => {
        this.markSetAsStart();
        TweenMax.to('.js-base-display', 0.4, {
          autoAlpha: 1,
          onComplete: () => {
            loaderOut();
          },
        });
      },
    });
  }

  events() {
    // mark events
    $('.js-colour--mark').on(window.eventtype, 'li', (e) => {
      this.changeColours(e);
      return false;
    });

    $('.custom-menu__tabs').on(window.eventtype, 'li', (e) => {
      this.tabs(e);
    });

    $(document).on(window.eventtype, '.js-rotation', (e) => {
      this.rotation(e);
    });

    if (mobilecheck()) {
      $(document).on('touchstart', '.custom-menu__head', (e) => {
        this.tapMenu(e);
      });
    }
  }

  tabs(event) {
    const tabName = $(event.currentTarget).data('tab');
    $('.custom-menu__tabs li').add('.custom-menu__content').removeClass('active');
    $(event.currentTarget).addClass('active');
    $(tabName).addClass('active');

    ScrollEvents.scrollNavDisplay();
    this.updateScrollBar();
  }

  tapMenu = (event) => {
    const $el = $('.custom-menu__content');
    const $tar = $(event.currentTarget).next().next();
    const $tapNav = $('.custom-menu__tap');
    const $tapTar = $(event.currentTarget).next();

    $el.removeClass('active');
    $tar.addClass('active');
    $tapNav.removeClass('is-hidden');
    $tapTar.addClass('is-hidden');
  }

  modalClose = (el, target) => {
    $(el).removeClass('active');
    TweenMax.to(target, 0.4, { autoAlpha: 0 });
  }

  modals(e) {
    e.preDefault();

    const modalTar = $(e.currentTarget).data('modal');

    if (!$(e.currentTarget).hasClass('active')) {
      $(e.currentTarget).addClass('active');
      TweenMax.to(modalTar, 0.4, { autoAlpha: 1 });
    } else {
      $(e.currentTarget).removeClass('active');
      TweenMax.to(modalTar, 0.4, { autoAlpha: 0 });
    }

    $('.content').on(window.eventtype, ':not(.modal)', () => {
      this.modalClose(e.currentTarget, modalTar);
    });
  }

  rotation(e) {
    e.preventDefault();

    spinner.in();

    const data = $('.js-rotation').data('svg');
    const rotationDir = $('.js-rotation').data('rotation');

    const storageKey = JSON.parse(localStorage.getItem(this.pageID));
    const key = storageKey.mark;

    const callback = () => {
      this.restyle();
      Component.component.MarkText.markTextToCanvas(key);
      spinner.out();
    };

    // front or back
    if (rotationDir === 'front') {
      $('.js-base-display').load(`${uploadPath}${data}_back.svg`, () => {
        callback();
      });

      $('.js-rotation').data('rotation', 'back');
    } else {
      $('.js-base-display').load(`${uploadPath}${data}.svg`, () => {
        callback();
      });

      $('.js-rotation').data('rotation', 'front');
    }
  }

  markSetAsStart() {
    const vars = getUrlVars();

    // add mark text info at start
    if (vars.mark && vars.mark !== '') {
      Component.storageValue.mark = vars.mark;
      Component.orderLink.mark = vars.mark;
    }

    // apply if there are queries
    if (vars.pos && vars.pos !== '') {
      // set initial localStrage
      if (vars.mark && vars.mark !== '') {
        OrderMenu.orderInfo();
      }

      this.reloadPage();
    } else {
      // apply no-mark option to dom and localStrage
      const $el = $('.js-mark-condition .active');
      Component.component.MarkCondition.setData($el);
    }

    if ($('.js-mark-family input:checked').data('max-lang') === 'en') {
      $('.js-mark-text').addClass('disabled');
    }
  }

  markTab = (event) => {
    const target = $(event.currentTarget).data('tab');

    $('.js-custom-pick-tab').add('.js-mark-tab-trigger').removeClass('active');
    $(target).add(event.currentTarget).addClass('active');
  }

  reloadPage() {
    const vars = getUrlVars();
    const $posEl = vars.pos ? $('.js-mark-position').find(`*[data-pos="${vars.pos}"]`) : $('.js-mark-position .active');
    const $familyEl = vars.font ? $('.js-mark-family li').find(`*[data-code="${String(vars.font)}"]`) : $('.js-mark-family input:checked');
    const $colEl = vars.col ? $('.js-colour--mark').find(`*[data-code="${vars.col}"]`) : $('.js-colour--mark').find('li.active');

    Component.component.MarkPosition.setData($posEl);
    Component.component.MarkFamily.setData($familyEl);
    this.changeColours($colEl);

    if (getUrlVars().mark) Component.component.MarkText.markTextToCanvas();
  }
}

Component.SimulationCommon = SimulationCommon;
