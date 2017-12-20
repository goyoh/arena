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

    $(document).on(window.eventtype, '.js-modal', this.modals);

    if (mobilecheck()) {
      $(document).on('touchstart', '.custom-menu__head', this.tapMenu);
    }
  }

  tabs(e) {
    const tabName = $(e.currentTarget).data('tab');
    $('.custom-menu__tabs li').add('.custom-menu__content').removeClass('active');
    $(e.currentTarget).add(tabName).addClass('active');

    ScrollEvents.scrollNavDisplay();
    this.updateScrollBar();
  }

  tapMenu = (e) => {
    const $el = $('.custom-menu__content');
    const $tar = $(e.currentTarget).next().next();
    const $tapNav = $('.custom-menu__tap');
    const $tapTar = $(e.currentTarget).next();

    $el.removeClass('active');
    $tar.addClass('active');
    $tapNav.removeClass('is-hidden');
    $tapTar.addClass('is-hidden');
  }

  modals = (e) => {
    e.preventDefault();

    const $tar = $(e.currentTarget);
    const modal = $tar.data('modal');
    const alphaVal = !$tar.hasClass('active') ? 1 : 0;

    $tar.toggleClass('active');
    TweenMax.to(modal, 0.4, { autoAlpha: alphaVal });

    const modalClose = () => {
      $tar.removeClass('active');
      TweenMax.to(modal, 0.4, { autoAlpha: 0 });
      $('.content').off(window.eventtype, modalClose);
    };

    $('.content').on(window.eventtype, ':not(.modal)', modalClose);
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

    const svg = rotationDir === 'front' ? '_back.svg' : '';
    const dir = rotationDir === 'front' ? 'back' : 'front';

    $('.js-base-display').load(`${uploadPath}${data}${svg}`, () => {
      callback();
    });

    $('.js-rotation').data('rotation', dir);
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

  markTab = (e) => {
    const target = $(e.currentTarget).data('tab');

    $('.js-custom-pick-tab').add('.js-mark-tab-trigger').removeClass('active');
    $(target).add(e.currentTarget).addClass('active');
  }

  reloadPage() {
    const vars = getUrlVars();
    const $posEl = vars.pos ? $('.js-mark-position').find(`*[data-pos="${vars.pos}"]`) : $('.js-mark-position .active');
    const $familyEl = vars.font ? $('.js-mark-family li').find(`*[data-code="${String(vars.font)}"]`) : $('.js-mark-family input:checked');
    const $colEl = vars.col ? $('.js-colour--mark').find(`*[data-code="${vars.col}"]`) : $('.js-colour--mark').find('li.active');

    Component.component.MarkPosition.setData($posEl);
    Component.component.MarkFamily.setData($familyEl);
    this.changeColours($colEl);

    if (vars.mark) Component.component.MarkText.markTextToCanvas();
  }
}

Component.SimulationCommon = SimulationCommon;
