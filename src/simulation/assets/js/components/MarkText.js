import $ from 'jquery';
import { TweenMax } from 'gsap';

import Component from './Component';
import OrderMenu from './OrderMenu';

const Encoding = require('encoding-japanese');

const fontServer = 'https://mark.arena-jp.com/simulation/servconst/MarkSample';

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
      this.setData(e);
    });
  }

  load(...props) {
    $.ajax({
      url: props.jdata,
      dataType: 'json',
    })
      .done((data) => {
        const validation = data.validate;

        if (validation) {
          this.markTextToCanvas(props.text);

          const markPopup = $(props.e.currentTarget).data('popup');

          TweenMax.to(markPopup, 0.4, { y: '0%' });

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
        console.log('compconste');
      });
  }

  setData(e) {
    const text = $('.js-mark-text').val();
    const encodedText = encodeURIComponent(text);

    this.getMarkData().then((data) => {
      const jdata = `/simulation/validation/?lang=${data.language}&max=${data.length}&text=${encodedText}&json`;
      this.load({ e, jdata, text });
    });
  }

  markTextToCanvas(text) {
    const { pos, font, bcol, col } = Component.storageValue;

    // convert text from UTF-8 to SJIS
    const str = text;
    if (str) {
      const imageElem = document.querySelector('.js-mark-check-image'); // Image element
      const strArray = Encoding.stringToCode(str);
      const sjisArray = Encoding.convert(strArray, 'SJIS', 'UNICODE');
      const sjisText = Encoding.urlEncode(sjisArray);

      imageElem.src = `${fontServer}?bcol=${bcol}&pos=${pos}&font=${font}&col=${col}&mark=${sjisText}`;
    }

    // show order info menu on the bottom right side
    if (OrderMenu.orderInfoActive && text) OrderMenu.orderInfo();

    // set value on localStrage and change the order link
    Component.storageValue.mark = text;
    this.setLocalStrage();
    this.orderLinkChange('mark', text);
  }
}

Component.MarkText = MarkText;
