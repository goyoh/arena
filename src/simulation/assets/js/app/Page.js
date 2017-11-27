import $ from 'jquery';
import route from 'riot-route';
import imagesLoaded from 'imagesloaded';
import { TweenMax } from 'gsap';

import { mobilecheck } from '../app/globals';

import Component from '../components/Component';
import ScrollEvents from '../components/ScrollEvents';
import Popup from '../components/Popup';
import OrderMenu from '../components/OrderMenu';
import SimulationCommon from '../components/SimulationCommon';

import MarkCondition from '../components/MarkCondition';
import MarkFamily from '../components/MarkFamily';
import MarkText from '../components/MarkText';
import MarkPosition from '../components/MarkPosition';

'use strict';

const globalEvents = () => {
  // $(document).on(window.eventtype2, '.js-rotation', (event) => {
  //   this.rotation(event);
  // });
  // $(document).on(window.eventtype, '.js-modal', (event)=> {
  //   this.modals(event);
  // });
};

export default class Page {
  constructor() {
    this.$view = $('.main');

    this.components = Component.component;
    this.templates = [];

    route((collection) => {
      this.render(collection);
    });

    route.base('/simulation');
    route.start(true);
  }

  render(slug) {
    this.loadComponent();
    this.preLoad().then(() => {
      ScrollEvents.scrollNavDisplay();
      this.events();

      if (slug && slug !== '') {
        OrderMenu.styleRegistration();

        if (!mobilecheck()) ScrollEvents.scrollBarStyle();
      }
    });
  }

  events = () => {
    $(document).on(window.eventtype, '.js-popup-trigger', Popup.popup);
    $(document).on(window.eventtype, '.js-popup-close', Popup.popupClose);
    $(document).on(window.eventtype, '.js-read-more', ScrollEvents.scrollBottom);
    $(document).on(window.eventtype, '.js-scroll-link', ScrollEvents.topScroll);
    $(document).on(window.eventtype, '.js-order-sheet', OrderMenu.orderSheet);
    $(document).on(window.eventtype, '.js-order-link-make', OrderMenu.orderLinkMake);
    $('.js-order-sheet-list').on(window.eventtype, 'li', OrderMenu.orderSheetList);
    $('.js-order-info').on('click', '.js-order-info-close--sp', OrderMenu.orderInfoShow);
    $('.custom-menu').on('scroll', ScrollEvents.scrollNav);
  }

  loadComponent() {
    const $components = this.$view.parent().find('[data-component]');

    for (let i = $components.length - 1; i >= 0; i -= 1) {
      const $component = $components.eq(i);
      const componentName = $component.data('component');

      if (Component[componentName] !== undefined) {
        const options = $component.data('options');
        const component = new Component[componentName]($component, options);

        this.components[componentName] = component;
      } else {
        window.console.warn('There is no "%s" component!', componentName);
      }
    }
  }

  loaderProgress = (amount) => {
    const val = Math.round(amount);
    $('.js-loader-count').html(val);
  }

  loaderOut = () => {
    TweenMax.to('.loader', 0.6, { autoAlpha: 0 });
  }

  preLoad() {
    const loadingImages = imagesLoaded(this.$view.find('.js-preload').toArray(), { background: true });

    // for (const component of this.components) {
    //   images = images.concat(component.preloadImages());
    // }
    // for (const url of images) {
    //   loadingImages.addBackground(url, null);
    // }

    return new Promise((resolve) => {
      $('body').addClass('load-start');
      this.loader = loadingImages;

      if (this.loader.images.length > 0) {
        this.loader.on('progress', (instance) => {
          const progress = (instance.progressedCount / instance.images.length) * 100;
          this.loaderProgress(progress);
        }).on('always', () => {
          $('body').removeClass('load-start').addClass('load-completed');
          this.loaderOut();

          resolve(true);
        });
      } else {
        this.loaderProgress(100);
        this.loaderOut();
        $('body').removeClass('load-start').addClass('load-completed');

        resolve(true);
      }
    });
  }
}
