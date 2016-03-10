class Markright {
  constructor(opts = {}) {
    this.delimiter = opts.delimiter || ' ';
  }

  html(str) {
    var ret;
    var arr;

    arr = this.branch(str);
    ret = this.render(arr);

    return ret;
  }

  render(tree) {
    var ret = '';
    var tmp;

    tree.forEach((elm) => {
      if(typeof elm === 'string') {
        tmp = elm;
      } else {
        tmp = this.render(elm);
      }

      ret += this.wrap(tmp);
    });

    return ret;
  }

  wrap(str) {
    return `<span>${str}</span>`;
  }

  splitStr(str) {
    var res;
    var longest = 0;

    let len = str.length;
    let i;
    let longTmp = 0;

    for(i = 0; i < len; i++) {
      if(str[i] === this.delimiter) {
        longTmp++;
      } else {
        longTmp = 0;
      }

      longest = Math.max(longest, longTmp);
    }

    res = str.split(this.constantSpace(longest));

    return res;
  }

  constantSpace(len) {
    var ret = '';
    let i;

    for(i = 0; i < len; i++) {
      ret += this.delimiter;
    }

    return ret;
  }

  sameArrQ(arr1, arr2) {
    return JSON.stringify(arr1) === JSON.stringify(arr2);
  }

  branch(str) {
    var ret = [];
    if(str.indexOf(this.delimiter) !== -1) {
      this.splitStr(str).forEach((elm) => {
        ret.push(this.branch(elm));
      });
    } else {
      ret = str;
    }

    return ret;
  }
}

export default Markright;
global.Markright = Markright;
