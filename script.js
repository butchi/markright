import Markright from './lib/markright.js';

const $wrapper = $('.wrapper');

const markright = new Markright({
  delimiter: ' ',
  opener: '(',
  closer: ')',
});

const mark = str => {
  const $elm = $(`<div><span>${markright.html(str)}</span></div>`);
  $wrapper.append($elm);
}

mark(`I   have  a pen`);
mark(`(((I))((have)((a)(pen))))`);
mark(`(I)((have)(a pen))`);

mark(`今日 は  晴れ まし た`);
mark(`(今日 は)(晴れ まし た)`);

mark(`頭が 赤い   魚を 食べた  猫`);
mark(`(頭が 赤い)((魚を 食べた)(猫))`);
mark(`頭が 赤い  魚を   食べた    猫`);
mark(`頭が   赤い 魚を  食べた    猫`);
mark(`頭が    赤い 魚を  食べた   猫`);
mark(`頭が    赤い   魚を 食べた  猫`);
mark(`(頭が)((赤い)(魚を 食べた  猫))`);
