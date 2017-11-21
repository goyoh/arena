export default class markCondition extends Base {
  constructor(props) {
    super(props);

    this.markPickActive = false;
  }

  setData(event) {
    const $tarEl = (event.currentTarget) ? $(event.currentTarget) : event;
    const condition = $tarEl.data('mark');

    $('.js-mark-pick a').removeClass('active');
    $tarEl.addClass('active');

    this.getMarkData().then((data) => {
      if (condition === 'on') {
        this.markOff();
      } else {
        if (!this.markPickActive) {
          this.markOn(data);
        }
      }
    }

    this.updateScrollBar();
  }

  markOff() {
    //add overlay on the layer
    let overlay = document.createElement('div');
    overlay.className = 'overlay overlay--inactive';
    document.querySelector('.custom-mark-simulation').appendChild(overlay);
    $('.custom-mark-simulation').css('overflow', 'hidden');

    //update the order link (remove mark data)
    const styleNumData = Base.styleNum || '';
    const styleData = Base.styleName || '';
    const baseColourData = Base.orderLink['bcol'] || '';

    this.currentURL = this.currentURL.split(/[?#]/)[0];

    const orderLinkOrginal = `
      ${this.currentURL}
      ?style${styleNumData}=${styleData}
      &bcol=${baseColourData}
    `;

    $('.js-order-save').attr('href', orderLinkOrginal);

    //update scrollbar
    Ps.update(document.querySelector('.custom-menu'));
    // set value on localStrage and change the order link
    if (!orderInfoActive) orderMenu.orderInfo();

    this.markSVGRemove();
    this.markPickActive = true;
  }

  markOn(data) {
    //remove overlay
    $('.custom-mark-simulation').css('overflow', 'auto');
    $('.overlay--inactive').remove();

    if (data.pos) {          
      const $posEl = $(posTar).children(data.family).find('path');
      const posTar = `#position-${data.pos.toLowerCase()}`;

      TweenMax.set($posEl, { fill: data.colour });
      $('.js-colour--mark').attr('data-target', posTar);
    }

    //apply if mark data already exists in localStrage
    if (Base.orderLink['mark']) {
      //update the order link following the stored localStrage info
      this.orderLinkChange();
    } else {
      //pop up order menu
      OrderMenu.orderInfoHide();
    }
    
    //apply initial localStrage
    this.reloadPage();

    this.markSVGShow();
    this.markPickActive = false;
  }
}
