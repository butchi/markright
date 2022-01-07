const spChar = "\\*+.?{}()[]^$-| /"

class Markright {
  constructor(optLi = {}) {
    // デフォルトのデリミター以外だとバグが生じるのを確認済み
    this.delimiter = optLi.delimiter || " "
    this.opener = optLi.opener || "("
    this.closer = optLi.closer || ")"
  }

  html(str) {
    let ret
    let arr

    let strFlat = this.flatten(str)

    arr = this.branch(strFlat)
    ret = this.render(arr)

    return ret
  }

  render(tree) {
    if (typeof tree === "string") {
      return tree
    } else if (tree instanceof Array) {
      return tree.map(elm => {
        let tmp

        if (typeof elm === "string") {
          tmp = elm
        } else {
          tmp = this.render(elm)
        }

        return this.wrap(tmp)
      }).join("")
    } else {
      return
    }
  }

  wrap(str) {
    return `<span>${str}</span>`
  }

  splitStr(str) {
    let ret
    let longest = this.getLongest(str)

    ret = str.split(this.constantDelimiter(longest))

    return ret
  }

  getLongest(str) {
    let longest = 0

    str.split("").reduce((cnt, char) => {
      let tmp = char === this.delimiter ? cnt + 1 : 0

      longest = Math.max(longest, tmp)

      return tmp
    }, 0)

    return longest
  }

  constantDelimiter(len) {
    return Array(len).fill(this.delimiter).join("")
  }

  sameArrQ(arr1, arr2) {
    return JSON.stringify(arr1) === JSON.stringify(arr2)
  }

  flatten(str) {
    let longest = this.getLongest(str)

    const opener = this.opener
    const closer = this.closer

    const openerExp = (spChar.includes(opener) ? "\\" : "") + opener
    const closerExp = (spChar.includes(closer) ? "\\" : "") + closer

    const regExp = new RegExp(`[${closerExp}${openerExp}]+`, "g")

    let tmp = str.replace(regExp, bracketArr => {
      let rep = bracketArr.length || 0

      return this.constantDelimiter(longest + rep)
    })

    tmp = tmp.replace(regExp, "")

    let ret = tmp.trim()

    console.log(ret)

    return ret
  }

  branch(str) {
    if (str.includes(this.delimiter)) {
      const arr = this.splitStr(str)

      return arr.map(elm => this.branch(elm))
    } else {
      return str
    }
  }
}

export default Markright
