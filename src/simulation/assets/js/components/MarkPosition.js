import $ from 'jquery';
import { TweenMax } from 'gsap';

import Component from './Component';

export default class MarkPosition extends Component {
  constructor(props) {
    super(props);
    this.render();
  }

  render() {
    this.events();
  }

  events() {
    $('.js-mark-position').on(window.eventtype, 'a', (e) => {
      e.preventDefault();
      this.setData(e);
    });
  }

  setData(e) {
    const $tarEl = (e.currentTarget) ? $(e.currentTarget) : e;
    const cate = $tarEl.parents('ul').data('cate');
    const side = $tarEl.data('side');

    $('.js-mark-position a').removeClass('active');
    $tarEl.addClass('active');

    this.getMarkData().then((data) => {
      $.each(this.markOptions, (index, el) => {
        const $path = $(`#position-${el}`);
        TweenMax.set($path.children().find('path'), { fill: 'none' });
      });

      if (data.position) {
        const tar = `#position-${data.position.toLowerCase()}`;
        const $el = $(tar).children(data.family).find('path');
        TweenMax.set($el, { fill: data.colour });

        $('.js-colour--mark').data('target', tar);

        // rotation the item if the mark is positioned on the opposite side
        if (side !== data.rotation) this.rotation();
      }

      // update localStrage and the order link
      this.orderLinkChange(cate, data.position);
      Component.storageValue[cate] = data.position;
      this.setLocalStrage();
    });
  }
}

Component.MarkPosition = MarkPosition;
