import $ from 'jquery';
import { TweenMax } from 'gsap';

import Component from './Component';
import OrderMenu from './OrderMenu';
import Popup from './Popup';
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
    const { e, jdata, text } = props;

    $.ajax({
      url: jdata,
      dataType: 'json',
    })
      .done((data) => {
        const validation = data.validate;

        if (validation) {
          this.markTextToCanvas(text);
          Popup.popup(e);
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
    const text = $('.js-mark-text').val();
    const encodedText = encodeURIComponent(text);

    this.getMarkData().then((data) => {
      const { language, length } = data;
      const jdata = `/simulation/validation/?lang=${language}&max=${length}&text=${encodedText}&json`;
      this.load({ e, jdata, text });
    });
  }

  markTextToCanvas(text) {
    const { pos, font, bcol, col } = Component.storageValue;

    // convert text from UTF-8 to SJIS
    if (text) {
      const image = document.querySelector('.js-mark-check-image'); // Image element
      const strArray = Encoding.stringToCode(text);
      const sjisArray = Encoding.convert(strArray, 'SJIS', 'UNICODE');
      const sjisText = Encoding.urlEncode(sjisArray);
      const fontServer = 'https://mark.arena-jp.com/simulation/servlet/MarkSample2';

      image.src = `${fontServer}?bcol=${bcol}&pos=${pos}&font=${font}&col=${col}&mark=${sjisText}`;
    }

    // show order info menu on the bottom right side
    if (!OrderMenu.orderInfoActive && text) OrderMenu.orderInfo();

    // set value on localStrage and change the order link
    Component.storageValue.mark = text;
    this.setLocalStrage();
    this.orderLinkChange('mark', text);
  }
}

Component.MarkText = MarkText;
