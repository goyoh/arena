export default class markText extends Base {
  constructor(props) {
    super(props);
  }

  load(e, url) {
    $.ajax({
      url: jdata,
      dataType: 'json',
    })
    .done((data) => {
      const validation = data.validate;

      if (validation) {
        this.markTextToCanvas(text);

        const markPopup = $(e.currentTarget).data('popup');

        TweenMax.to(markPopup, 0.4, { y: '0%' });

        $('.form-message').html('');
      } else {
        const message = data.message;

        $('.form-message').html(message);
      }
    })
    .fail(()=> {
      console.log("error");
    })
    .always(()=> {
      console.log("compconste");
    });
  }

  setData(e) {
    const encodedText = encodeURIComponent(text);

    this.getMarkData().then((data) => {
      const jdata = `
        /simulation/validation/
        ?lang=${data.language}
        &max=${data.length}
        &text=${encodedText}&json
      `;

      this.load(e, jdata);
    });
  }

  markTextToCanvas(text) {
    const posData = Base.storageValue['pos'];
    const familyData = Base.storageValue['font'];
    const baseColourData = Base.storageValue['bcol'];
    const colourData = Base.storageValue['col'];

    // convert text from UTF-8 to SJIS
    const str = text;
    if (str) {
      const imageElem = document.querySelector('.js-mark-check-image'); //Image element
      const str_array = Encoding.stringToCode(str);
      const sjis_array = Encoding.convert(str_array, "SJIS", "UNICODE");
      const convertedText = Encoding.codeToString(sjis_array);
      const sjisText = Encoding.urlEncode(sjis_array);

      imageElem.src = `
        ${fontServer}
        ?bcol=${baseColourData}
        &pos=${posData}
        &font=${familyData}
        &col=${colourData}
        &mark=${sjisText}
      `;
    }

    // show order info menu on the bottom right side
    if (this.orderInfoActive && text) OrderMenu.orderInfo();

    // set value on localStrage and change the order link
    this.storageValue['mark'] = text;
    this.setLocalStrage();
    this.orderLinkChange('mark', text);
  }
}
