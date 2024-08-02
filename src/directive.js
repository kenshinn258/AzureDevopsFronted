export const uppercase = (() => {
  const handle = el => {
    const nodes = el?.querySelectorAll('input, textarea')
    const array = nodes ? Array.prototype.slice.call(nodes) : []
    array.forEach(node => {
      if (!node.disabled) {
        const oldValue = node.value
        const newValue = oldValue?.toUpperCase()
        if (oldValue !== newValue) {
          node.value = newValue
          node.dispatchEvent(new Event('input', { bubbles: true }))
        }
      }
    })
  }
  return {
    created(el, binding, vnode, prevVnode) {
      handle(el)
    },
    updated(el, binding, vnode, prevVnode) {
      handle(el)
    },
  }
})()

export default {
  install(app, options) {
    app.directive('uppercase', uppercase)
  },
}
