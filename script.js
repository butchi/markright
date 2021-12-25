import Markright from './lib/markright.js';

const wrapperElm = document.querySelector('.wrapper');

const markright = new Markright({
  delimiter: ' ',
  opener: '(',
  closer: ')',
});

const mark = str => {
  const elm = document.createElement('div');
  const spanElm = document.createElement('span');

  elm.append(spanElm);
  elm.innerHTML = markright.html(str);

  wrapperElm.append(elm);
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
