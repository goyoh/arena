import $ from 'jquery';
import { TweenMax } from 'gsap';

import Component from './Component';
import OrderMenu from './OrderMenu';

export default class MarkCondition extends Component {
  constructor(props) {
    super(props);

    this.markPickActive = false;
    this.reloadPage = props.reloadPage;
    this.render();
  }

  render() {
    this.events();
  }

  events() {
    $('.js-mark-condition').on(window.eventtype, 'a', (e) => {
      e.preventDefault();
      this.setData(e);
    });
  }

  setData(e) {
    const $tarEl = (e.currentTarget) ? $(e.currentTarget) : e;
    const condition = $tarEl.data('mark');

    $('.js-mark-condition a').removeClass('active');
    $tarEl.addClass('active');

    this.getMarkData().then((data) => {
      if (condition === 'on') {
        this.markOn(data);
      } else {
        if (!this.markPickActive) {
          this.markOff(data);
        }
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
    const styleNumData = Component.styleNum || '';
    const styleData = this.styleName || '';
    const baseColourData = Component.orderLink.bcol || '';

    this.currentURL = this.currentURL.split(/[?#]/)[0];
    const orderLinkOrginal = `${this.currentURL}?style${styleNumData}=${styleData}&bcol=${baseColourData}`;
    $('.js-order-save').attr('href', orderLinkOrginal);

    // set value on localStrage and change the order link
    if (!OrderMenu.orderInfoActive) OrderMenu.orderInfo();

    this.markSVGRemove();
    this.markPickActive = true;
  }

  markOn(data) {
    // remove overlay
    $('.mark-simulation').css('overflow', 'auto');
    $('.overlay--inactive').remove();

    if (data.position) {
      const posTar = `#position-${data.position.toLowerCase()}`;
      const $posEl = $(posTar).children(data.family).find('path');

      TweenMax.set($posEl, { fill: data.colour });
      $('.js-colour--mark').attr('data-target', posTar);
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
    this.markPickActive = false;
  }
}

Component.MarkCondition = MarkCondition;
