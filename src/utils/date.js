import {
  addDays,
  addYears,
  differenceInDays,
  endOfYear,
  format,
  isDate,
  isEqual,
  isWithinInterval,
  parse,
  startOfMonth,
  startOfToday,
  startOfYear,
} from 'date-fns'
import { isEmpty, isString } from 'lodash-es'

const isValidString = value => isString(value) && !isEmpty(value)
const safeParse = (date, ...rest) => {
  if (isValidString(date)) {
    return parse(date, ...rest)
  }
  return null
}
const safeAddYears = (date, ...rest) => {
  if (isDate(date)) {
    return addYears(date, ...rest)
  }
  return null
}
const safeAddDays = (date, ...rest) => {
  if (isDate(date)) {
    return addDays(date, ...rest)
  }
  return null
}
const safeFormat = (date, ...rest) => {
  if (isDate(date)) {
    return format(date, ...rest)
  }
  return null
}

export const parseISODate = date => safeParse(date, 'yyyy-MM-dd', startOfToday())

export const parseISODateTime = (date, hasSecond = true) =>
  safeParse(date, `yyyy-MM-dd HH:mm${hasSecond ? ':ss' : ''}`, new Date())

export const parseMinguoYearMonth = (date, pattern = 'yyy/MM') =>
  safeAddYears(safeParse(date, pattern, startOfToday()), 1911)

export const parseMinguoDate = date => safeAddYears(safeParse(date, 'yyy/MM/dd', startOfToday()), 1911)

export const parseMinguoDateTime = (date, hasSecond = false) =>
  safeAddYears(safeParse(date, `yyy/MM/dd HH:mm${hasSecond ? ':ss' : ''}`, new Date()), 1911)

export const customParseMinguoDate = (date, pattern) => safeAddYears(safeParse(date, pattern, startOfToday()), 1911)

export const formatISODate = date => safeFormat(date, 'yyyy-MM-dd')

export const formatISODateTime = (date, hasSecond = true) =>
  safeFormat(date, `yyyy-MM-dd HH:mm${hasSecond ? ':ss' : ''}`)

export const formatMinguoYear = date => safeFormat(safeAddYears(date, -1911), 'yyy')

export const formatMinguoYearMonth = (date, pattern = 'yyy/MM') => safeFormat(safeAddYears(date, -1911), pattern)

export const formatMinguoDate = date => safeFormat(safeAddYears(date, -1911), 'yyy/MM/dd')

export const customFormatMinguoDate = (date, pattern) => safeFormat(safeAddYears(date, -1911), pattern)

export const formatMinguoLocalDate = date => safeFormat(safeAddYears(date, -1911), 'yyy 年 M 月 d 日')

export const formatMinguoDateTime = (date, hasSecond = false) =>
  safeFormat(safeAddYears(date, -1911), `yyy/MM/dd HH:mm${hasSecond ? ':ss' : ''}`)

export const formatMinguoLocalDateTime = (date, hasSecond = false) =>
  safeFormat(safeAddYears(date, -1911), `yyy 年 M 月 d 日 H 時 m 分${hasSecond ? ' s 秒' : ''}`)

export const isCurrentWithinInterval = range => {
  const [start, end] = range ?? []
  return isDate(start) && isDate(end) ? isWithinInterval(new Date(), { start, end }) : false
}

export const getCurrentMinguoYear = () => startOfToday().getFullYear() - 1911

export const getCurrentMinguoYearMonth = () => formatMinguoYearMonth(startOfMonth(startOfToday()))

export const getThisYearMinguoDuration = () => {
  const now = new Date()
  return [formatMinguoDate(startOfYear(now)), formatMinguoDate(endOfYear(now))]
}

export const getMinguoYear = date =>
  isDate(date)
    ? date.getFullYear() - 1911
    : isValidString(date) && date.length === 7
      ? parseMinguoYearMonth(date).getFullYear() - 1911
      : isValidString(date) && date.length === 9
        ? parseMinguoDate(date).getFullYear() - 1911
        : null

export const differenceInDaysByMinguoDate = (dateLeft, dateRight, defaultValue = 0) =>
  dateLeft && dateRight
    ? Math.max(differenceInDays(parseMinguoDate(dateLeft), parseMinguoDate(dateRight)), 1)
    : defaultValue

export const addDaysByMinguoDate = (date, days) => formatMinguoDate(safeAddDays(parseMinguoDate(date), days))

export const isFullOverlapDate = ([s1, e1], [s2, e2]) => {
  const start = s1 > s2 ? s1 : s2
  const end = e1 < e2 ? e1 : e2
  if (start < end) {
    return (isEqual(start, s1) && isEqual(end, e1)) || (isEqual(start, s2) && isEqual(end, e2))
  }
  return false
}
