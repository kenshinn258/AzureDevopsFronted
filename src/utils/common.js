export const generateUUID = () => {
  if (typeof crypto?.randomUUID === 'function') {
    return crypto.randomUUID()
  } else {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0
      const v = c == 'x' ? r : (r & 0x3) | 0x8
      return v.toString(16)
    })
  }
}

export const urlSearchParamsToObject = init =>
  [...new URLSearchParams(init).entries()].reduce((prev, [key, value]) => {
    if (prev[key]) {
      if (isArray(prev[key])) {
        prev[key].push(value)
      } else {
        prev[key] = [prev[key], value]
      }
    } else {
      prev[key] = value
    }
    return prev
  }, {})
