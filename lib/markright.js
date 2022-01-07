class Markright {
  constructor(opts = {}) {
    this.delimiter = opts.delimiter || ' ';
    this.opener = opts.opener || '(';
    this.closer = opts.closer || ')';
  }

  html(str) {
    let ret;
    let arr;

    let strFlat = this.flatten(str);
    arr = this.branch(strFlat);
    ret = this.render(arr);

    return ret;
  }

  render(tree) {
    let ret = '';
    let tmp;

    tree.forEach((elm) => {
      if (typeof elm === 'string') {
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
    let res;
    let longest = this.getLongest(str);

    res = str.split(this.constantSpace(longest));

    return res;
  }

  getLongest(str) {
    let longest = 0;

    let len = str.length;
    let i;
    let longTmp = 0;

    for (i = 0; i < len; i++) {
      if (str[i] === this.delimiter) {
        longTmp++;
      } else {
        longTmp = 0;
      }

      longest = Math.max(longest, longTmp);
    }

    return longest;
  }

  constantSpace(len) {
    return Array(len).fill(this.delimiter).join('');
  }

  sameArrQ(arr1, arr2) {
    return JSON.stringify(arr1) === JSON.stringify(arr2);
  }

  flatten(str) {
    let longest = this.getLongest(str);

    let tmp = str.replace(/[\)\(]+/g, (bracketArr) => {
      let rep = bracketArr.length || 0;

      return this.constantSpace(longest + rep);
    });

    tmp = tmp.replace(/[\(\)]*/g, '');

    let ret = tmp.trim();

    console.log(ret);

    return ret;
  }

  branch(str) {
    let ret = [];

    if (str.indexOf(this.delimiter) !== -1) {
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
