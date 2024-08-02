import { defaultTo, isEmpty, isNil, toLength, repeat } from 'lodash-es'
import { divide, round, multiply } from 'mathjs/number'

const cjkNumber = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']

export const numberToLowercaseCJK = number => {
  number = parseInt(number)
  if (isNaN(number)) {
    return ''
  }
  return [...number.toString()].map(currentValue => cjkNumber[currentValue]).join('')
}

export const percentage = (value, total, n = 2) => {
  return isNil(total) || isNil(value) || total === 0 ? 0 : round(multiply(divide(value, total), 100), n)
}

export const division = (x, y, n = 2) => {
  return isNil(x) || isNil(y) || y === 0 ? 0 : round(divide(x, y), n)
}

const defaultTextMaskConfig = {
  mask: '*',
  length: 4,
  start: null,
}
export const textMask = (text, config) => {
  const textValue = toValue(text)
  if (isEmpty(textValue)) {
    return ''
  }
  const resolvedConfig = Object.assign({}, defaultTextMaskConfig, toValue(config))
  const textLength = textValue?.length
  const maskStart = Math.max(0, defaultTo(resolvedConfig.start, textLength - resolvedConfig.length))
  const maskLength = Math.min(resolvedConfig.length, textLength - maskStart)
  return (
    textValue.substr(0, maskStart) +
    repeat(resolvedConfig.mask, maskLength) +
    textValue.substr(maskStart + maskLength, textLength)
  )
}
