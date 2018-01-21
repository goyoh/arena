import $ from 'jquery';
import { TweenMax } from 'gsap';

import Component from './Component';
import OrderMenu from './OrderMenu';

export default class MarkCondition extends Component {
  constructor(props) {
    super(props);

    this.markConditionActive = false;
    this.render();
  }

  render() {
    this.events();
  }

  events() {
    $('.js-mark-condition').on(window.eventtype, 'a', (e) => {
      e.preventDefault();
      const $el = $(e.currentTarget);
      this.setData($el);
    });
  }

  setData($e) {
    const condition = $e.data('mark');

    $('.js-mark-condition a').removeClass('active');
    $e.addClass('active');

    this.getMarkData().then((data) => {
      if (condition === 'on') {
        this.markOn(data);
      } else if (!this.markConditionActive) {
        this.markOff();
      }
    });

    this.updateScrollBar();
  }

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

  markOff() {
    // add overlay on the layer
    const overlay = document.createElement('div');
    overlay.className = 'overlay overlay--inactive';

    document.querySelector('.mark-simulation').appendChild(overlay);
    $('.mark-simulation').css('overflow', 'hidden');

    // update the order link (remove mark data)
    const styleNum = Component.styleNum || '';
    const style = this.styleName || '';
    const bcol = Component.orderLink.bcol || '';

    this.currentURL = this.currentURL.split(/[?#]/)[0];
    const orderLinkOrginal = `${this.currentURL}?style${styleNum}=${style}&bcol=${bcol}`;
    $('.js-order-save').attr('href', orderLinkOrginal);

    // set value on localStrage and change the order link
    if (!OrderMenu.orderInfoActive) OrderMenu.orderInfo();

    this.markSVGRemove();
    this.markConditionActive = true;
  }

  markOn(data) {
    const { position, colour, family } = data;
    // remove overlay
    $('.mark-simulation').css('overflow', 'auto');
    $('.overlay--inactive').remove();

    if (position) {
      const tar = `#position-${position.toLowerCase()}`;
      const $posEl = $(tar).children(family).find('path');

      TweenMax.set($posEl, { fill: colour });
      $('.js-colour--mark').data('target', tar);
      $('.js-colour--edge').data('target', tar);
    }

    // apply if mark data already exists in localStrage
    if (Component.orderLink.mark) {
      // update the order link following the stored localStrage info
      this.orderLinkChange();
    } else {
      // pop up order menu
      OrderMenu.orderInfoHide();
    }

    // apply initial localStrage
    Component.component.SimulationCommon.reloadPage();

    this.markSVGShow();
    this.markConditionActive = false;
  }
}

Component.MarkCondition = MarkCondition;
