import $ from 'jquery';
import { getUrlVars } from '../app/globals';
import Component from './Component';

export default class ColourFunction extends Component {
  constructor(options) {
    super(options);
    this.jsonUrl = options.jsonUrl || '';
    this.print = options.print || '';
    this.callback = options.callback || '';
    this.colourFunction();
  }
  colourFunction() {
    // JSON データ取得
    fetch(this.jsonUrl, {
      // method: 'get'
      // method: 'POST'
    }).then(response => (
      response.json()
    )).then((data) => {
      // 初期化
      const colourCode = data[0].meta.codes;
      // カラーのレベル数を取得する
      $.each(colourCode, (index, value) => {
        window.totalColour = value.length;
        return false;
      });

      window.keycodeUpper = 65;
      window.keycodeLower = 97;

      for (let i = 1; i <= window.totalColour; i += 1) {
        window[`colour${i}`] = [];
        window[`label${i}`] = [];
        // DOMに設定用
        window[`domColour${i}`] = [];
        window[`domLabel${i}`] = [];
      }
      window.colour = [];
      window.colourCodeName = [];

      $.each(colourCode, (index, value) => {
        // 総合カラーリスト
        const temp = [];
        $.each(value, (i, v) => {
          temp.push(v.hex);
        });
        window.colour.push(temp);
        window.colourCodeName.push(index);
        // レベル毎のカラーリスト
        for (let i = 1; i <= window.totalColour; i += 1) {
          if (typeof (value[i - 1]) != 'undefined') {
            window[`colour${i}`].push(value[i - 1].hex);
            window[`label${i}`].push(value[i - 1].label);
            if ($.inArray(value[i - 1].hex, window[`domColour${i}`]) == -1) {
              window[`domColour${i}`].push(value[i - 1].hex);
              window[`domLabel${i}`].push(value[i - 1].label);
            }
          } else {
            window[`colour${i}`].push('');
            window[`label${i}`].push('');
            console.log(`データが足りていないカラーコードあります：${index}`);
          }
        }
      });
      for (let i = 1; i <= window.totalColour; i += 1) {
        // DOMに設定
        const ttl = String.fromCharCode(window.keycodeUpper + (i - 1));
        const target = String.fromCharCode(window.keycodeLower + (i - 1));
        let txt;

        if (data[0].meta.gradation) {
          if (i === 1) {
            txt = `
              <div class="bcolour__section custom-menu__section--border">
                <h5 class="bcolour__name">${ttl}カラー</h5>
                <ul
                  class="bcolour__list js-colour js-colour--gradation js-colour${i}"
                  data-level="${i}"
                  data-cate="bcol"
                  data-target="#${target}-color">
                </ul>
              </div>
            `;
          } else {
            txt = `
              <div class="bcolour__section custom-menu__section--border">
                <h5 class="bcolour__name">${ttl}カラー</h5>
                <ul class="bcolour__list js-colour js-colour${i}"
                  data-level="${i}"
                  data-cate="bcol"
                  data-target="#${target}-color">
                </ul>
              </div>
            `;
          }
        } else {
          txt = `
            <div class="bcolour__section custom-menu__section--border">
              <h5 class="bcolour__name">${ttl}カラー</h5>
              <ul class="bcolour__list js-colour js-colour${i}"
                data-level="${i}"
                data-cate="bcol"
                data-target="#${target}-color">
              </ul>
            </div>
          `;
        }

        $('.js-colour-scheme').append(txt);
        $.each(window[`domColour${i}`], (index, value) => {
          txt = `<li class="" data-code="" data-colour="${value}" style="background:${value};"></li>`;
          $(`.js-colour${i}`).append(txt);
        });
      }

      const txt = '<div class="bcolour__section"><p id="colour-code" class="colour-code u-text-right"></p></div>';
      $('.js-colour-scheme').append(txt);

      let initialIndex = 0;
      // 初期アクティブ化
      const clickInterval = setInterval(() => {
        if (window.location.search && getUrlVars().bcol) {
          const cData = getUrlVars().bcol;

          $.each(colourCode[cData], (cIndex, cEl)=> {
            const hexCodes = colourCode[cData][cIndex].hex;
            const cElChild = $(`.js-colour-scheme .js-colour${cIndex + 1}`).find(`*[data-colour="${hexCodes}"]`);
            $(cElChild).trigger(window.eventtype);
            initialIndex += 1;
          });
        } else {
          $('.js-colour-scheme .js-colour1 li:first-child').trigger(window.eventtype);
          this.callback();
        }

        clearInterval(clickInterval);
      }, 10);

      // 色のボタンをクリック処理
      $('.js-colour-scheme').on(window.eventtype, 'li', (e) => {
        // e.preventDefault();

        const level = parseInt($(e.currentTarget).parents('ul').attr('data-level'));
        const clickColour = $(e.currentTarget).attr('data-colour');
        let parentColour = clickColour;
        let availableIndex = [];

        $(`.js-colour${level} li`).removeClass('active');
        $(e.currentTarget).addClass('active');

        if (level > 1) {
          let anotherParentColour = $('.js-colour1 li.active').eq(0).attr('data-colour');

          for (let i = 1; i < level; i += 1) {
            const colourIndex = window[`colour${i}`].multiIndexOf(anotherParentColour);

            if (!availableIndex.length) {
              availableIndex = colourIndex;
            } else {
              const temp = [];
              $.each(availableIndex, (index, value) => {
                if ($.inArray(value, colourIndex) !== -1) {
                  temp.push(value);
                }
              });

              availableIndex = temp;
            }

            anotherParentColour = $(`.js-colour${(i + 1)} li.active`).eq(0).attr('data-colour');
          }
        }
        for (let i = level; i < window.totalColour; i += 1) {
          // 下のレベルの色をリセット
          $(`.js-colour${(i + 1)} li`).removeClass('active');
          $(`.js-colour${(i + 1)} li`).addClass('hide');

          const colourIndex = window[`colour${i}`].multiIndexOf(parentColour);

          if (!availableIndex.length) {
            availableIndex = colourIndex;
          }

          if (i !== 1) {
            const temp = [];
            $.each(availableIndex, (index, value) => {
              if ($.inArray(value, colourIndex) !== -1) {
                temp.push(value);
              }
            });

            availableIndex = temp;
          }
          $.each(availableIndex, (index, value) => {
            // 押下可能な下のレベルの色を表示する
            const nextColour = window[`colour${(i + 1)}`][value];
            $(`.js-colour${(i + 1)} li[data-colour="${nextColour}"]`).removeClass('hide');
          });
          // 下のレベルの先頭の色にアクティブ化する
          $(`.js-colour${(i + 1)} li:not(.hide)`).eq(0).addClass('active');
          parentColour = $(`.js-colour${(i + 1)} li:not(.hide)`).eq(0).attr('data-colour');
        }

        availableIndex = [];
        let compareIndex = [];

        for (let i = window.totalColour; i >= 1; i -= 1) {
          const childColour = $(`.js-colour${i} li.active`).eq(0).attr('data-colour');

          if (i == window.totalColour) {
            availableIndex = window[`colour${i}`].multiIndexOf(childColour);
          } else {
            compareIndex = window[`colour${i}`].multiIndexOf(childColour);
            const temp = [];

            $.each(availableIndex, (index, value) => {
              if ($.inArray(value, compareIndex) !== -1) {
                temp.push(value);
              }
            });
            availableIndex = temp;
          }
        }
        availableIndex = availableIndex[0];
        $('#colour-code').text(`色番:${window.colourCodeName[availableIndex]}`);

        Component.storageValue.bcol = window.colourCodeName[availableIndex];
        Component.orderLink.bcol = window.colourCodeName[availableIndex];
        this.orderLinkChange('bcol', window.colourCodeName[availableIndex]);

        this.setLocalStrage();
        this.restyle();

        if (colourCode[getUrlVars().bcol]) {
          if (colourCode[getUrlVars().bcol].length === initialIndex + 1) {
            this.callback();
          }
        }

        return false;
      });
    }).catch((err) => {
      // Error :(
      alert('error!');
    });

    Array.prototype.multiIndexOf = function (el) {
      const idxs = [];
      for (let i = this.length - 1; i >= 0; i -= 1) {
        if (this[i] === el) {
          idxs.unshift(i);
        }
      }
      return idxs;
    };
  }
}
