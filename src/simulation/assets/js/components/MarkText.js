import $ from 'jquery';
import { TweenMax } from 'gsap';

import Component from './Component';
import OrderMenu from './OrderMenu';
import { spinner } from '../app/Loader';

const Encoding = require('encoding-japanese');

export default class MarkText extends Component {
  constructor(props) {
    super(props);

    this.render();
  }

  render() {
    this.events();
  }

  events() {
    $('.mark-text__form').on(window.eventtype, '.js-mark-submit', (e) => {
      e.preventDefault();
      spinner.in();
      this.setData(e);
    });
  }

  load(props) {
    const { e, jdata, text, line } = props;

    $.ajax({
      url: jdata,
      dataType: 'json',
    })
      .done((data) => {
        const validation = data.validate;

        if (validation) {
          this.markTextToCanvas(text, line);
          // Popup.popup(e);
          $('.form-message').html('');
        } else {
          const message = data.message;

          $('.form-message').html(message);
        }
      })
      .fail(() => {
        console.log('error');
      })
      .always(() => {
        spinner.out();
        console.log('complete');
      });
  }

  setData(e) {
    const $container = $(e.currentTarget).parent();
    const text = $container.find('.js-mark-text').val();
    const encodedText = encodeURIComponent(text);
    const line = Number($container.find('.js-mark-text').data('line'));

    this.getMarkData().then((data) => {
      const { language, length } = data;
      const jdata = `/simulation/validation/?lang=${language}&max=${length}&text=${encodedText}&json`;
      this.load({ e, jdata, text, line });
    });
  }

  markTextToCanvas(text, line) {
    const { pos, font, bcol, col } = Component.storageValue;
    const rotationDir = $('.mark-simulation').find('.js-rotation').data('rotation');
    const dir = rotationDir === 'front' ? 'back' : 'front';
    const markNum = dir === 'front' ? 'markA' : 'markB';
    const mark = `${markNum}${line}`;

    const str = text || Component.storageValue[mark];

    // convert text from UTF-8 to SJIS
    if (str) {
      const strArray = Encoding.stringToCode(str);
      const sjisArray = Encoding.convert(strArray, 'SJIS', 'UNICODE');
      const sjisText = Encoding.urlEncode(sjisArray);
      const fontServer = 'https://mark.arena-jp.com/simulation/servlet/MarkSample3';

      const posID = pos.toLowerCase();
      const svg = `#mark-${posID}`;
      const url = `${fontServer}?bcol=${bcol}&pos=${pos}&font=${font}&col=${col}&mark=${sjisText}`;

      TweenMax.set('.mark-group g', { autoAlpha: 0 });
      TweenMax.to(svg, 0.4, { autoAlpha: 1 });

      if (line && line === 2) {
        const image = $(svg).children('image').clone();
        image.attr('xlink:href', url);

        $(svg).append(image);
      } else {
        $(svg).children('image').attr('xlink:href', url);
      }
    }

    // show order info menu on the bottom right side
    if (!OrderMenu.orderInfoActive && text) OrderMenu.orderInfo();

    // set value on localStrage and change the order link
    Component.storageValue[mark] = str;
    this.setLocalStrage();
    this.orderLinkChange(mark, str);
  }
}

Component.MarkText = MarkText;
