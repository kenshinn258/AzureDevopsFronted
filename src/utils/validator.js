import { isEmpty, isNil, zipWith, sum } from 'lodash-es'

export const issn = (value, required = false) => {
  if (required === false && (isEmpty(value) || isNil(value))) {
    return true
  }
  const matches = value.match(/^(\d{4})-?(\d{3})([\dX])$/)
  if (!matches) {
    return false
  }
  const issnCalculateCheckDigit = digits => {
    const result = [...digits].reverse().reduce((sum, value, index) => sum + value * (index + 2), 0) % 11

    const checkDigit = result === 0 ? 0 : 11 - result
    if (checkDigit === 10) {
      return 'X'
    }
    return checkDigit.toString()
  }
  return issnCalculateCheckDigit(matches[1] + matches[2]) === matches[3]
}

export const idno = (value, required = false) => {
  if (isEmpty(value) || isNil(value)) {
    return required === false
  }
  const matches = value.match(/^[A-Z][1,2]\d{8}$/)
  if (!matches) {
    return false
  }
  /**
   *  A=10 台北市     J=18 新竹縣     S=26 高雄縣
   *  B=11 台中市     K=19 苗栗縣     T=27 屏東縣
   *  C=12 基隆市     L=20 台中縣     U=28 花蓮縣
   *  D=13 台南市     M=21 南投縣     V=29 台東縣
   *  E=14 高雄市     N=22 彰化縣     W=32 金門縣*
   *  F=15 台北縣     O=35 新竹市*    X=30 澎湖縣
   *  G=16 宜蘭縣     P=23 雲林縣     Y=31 陽明山
   *  H=17 桃園縣     Q=24 嘉義縣     Z=33 連江縣*
   *  I=34 嘉義市*    R=25 台南縣
   *
   *  英文字母按照上表轉換為數字之後，十位數 * 1 + 個位數 * 9 相加
   */
  const codeMapping = [
    1, // A -> 10 -> 1 * 1 + 9 * 0 = 1
    10, // B -> 11 -> 1 * 1 + 9 * 1 = 10
    19, // C -> 12 -> 1 * 1 + 9 * 2 = 19
    28, // D
    37, // E
    46, // F
    55, // G
    64, // H
    39, // I -> 34 -> 1 * 3 + 9 * 4 = 39
    73, // J
    82, // K
    2, // L
    11, // M
    20, // N
    48, // O -> 35 -> 1 * 3 + 9 * 5 = 48
    29, // P
    38, // Q
    47, // R
    56, // S
    65, // T
    74, // U
    83, // V
    21, // W -> 32 -> 1 * 3 + 9 * 2 = 21
    3, // X
    12, // Y
    30, // Z -> 33 -> 1 * 3 + 9 * 3 = 30
  ]
  const firstDigit = codeMapping[value.charCodeAt(0) - 'A'.charCodeAt(0)]
  const secondDigit = parseInt(value[1])
  const rest = value
    .substring(2)
    .split('')
    .map(n => parseInt(n))
  const idInDigits = [firstDigit, secondDigit, ...rest]
  return sum(zipWith(idInDigits, [1, 8, 7, 6, 5, 4, 3, 2, 1, 1], (a, b) => a * b)) % 10 === 0
}

export const tel = (value, required = false) => {
  if (required === false && (isEmpty(value) || isNil(value))) {
    return true
  }
  return value.match(/^\d{2}-\d{3,4}-\d{4}$/)
}

export const mobile = (value, required = false) => {
  if (required === false && (isEmpty(value) || isNil(value))) {
    return true
  }
  return value.match(/^09\d{2}\d{3}?\d{3}$/)
}

export const telOrMobile = (value, required = false) => {
  return tel(value, required) || mobile(value, required)
}

export const pascode = (value, required = false) => {
  if (required === false && (isEmpty(value) || isNil(value))) {
    return true
  }
  return value.match(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[~!?@#$%^&/*+=])\S{13,16}$/)
}

export const ishttp = (value, required = false) => {
  const patt = /^http(s)?:/;
  if (!(patt.test(value))) {
      return false;
  } else {
      return true;
  }
}
