import $ from 'jquery';
import imagesLoaded from 'imagesloaded';
// import route from 'riot-route';

import { mobilecheck, getSize, navigationMenu, browserDetect } from './globals';

import { loaderProgress, loaderOut } from './Loader';

import Component from '../components/Component';
import ScrollEvents from '../components/ScrollEvents';
import Popup from '../components/Popup';
import OrderMenu from '../components/OrderMenu';
import * as SimulationComponents from '../components/Simulation/';

export default class Page {
  constructor() {
    this.$view = $('.main');

    this.components = Component.component;
    this.templates = [];
  }

  render() {
    getSize();
    navigationMenu();

    this.addBrowserClass();
    this.loadPage();
    this.loadComponent();

    this.preLoad().then(() => {
      ScrollEvents.scrollNavDisplay();
      this.events();

      const pageName = this.$view.data('page');

      if (pageName !== 'Home') {
        // loaderOut();
        OrderMenu.styleRegistration();
        if (!mobilecheck()) ScrollEvents.scrollBarStyle();
      } else {
        loaderOut();
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
    $(window).on('scroll', ScrollEvents.headerReveal);

    window.onresize = getSize;
  }

  addBrowserClass = () => {
    const browserName = browserDetect.toLowerCase();
    document.body.className = `${document.body.className} ${browserName}`;
  }

  loadPage() {
    const pageName = this.$view.data('page');

    if (pageName) {
      $('body').removeClass((index, className) => (className.match(/(^|\s)is-\S+/g) || []).join(' '));
      $('body').addClass(`is-${pageName.toLowerCase()}`);
    }
  }

  loadComponent() {
    const $components = this.$view.parent().find('[data-component]');

    for (let i = $components.length - 1; i >= 0; i -= 1) {
      const $component = $components.eq(i);
      const componentName = $component.data('component');

      if (SimulationComponents[componentName] !== undefined && this.components[componentName] === undefined) {
        const options = $component.data('options');
        const component = new SimulationComponents[componentName]($component, options);

        this.components[componentName] = component;
      } else {
        window.console.warn('There is no "%s" component!', componentName);
      }
    }
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
          loaderProgress(progress);
        }).on('always', () => {
          $('body').removeClass('load-start').addClass('load-completed');

          resolve(true);
        });
      } else {
        loaderProgress(100);
        $('body').removeClass('load-start').addClass('load-completed');

        resolve(true);
      }
    });
  }
}
