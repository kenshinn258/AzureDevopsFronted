import { getScrollParent } from 'seemly'

export const useAppScroll = () => {
  const vm = getCurrentInstance()

  const findScrollElement = () => {
    const element = vm?.proxy?.$el
    if (element) {
      return getScrollParent(element)
    }
    return undefined
  }

  const scrollToTop = () => {
    findScrollElement()?.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const scrollToBottom = () => {
    const element = findScrollElement()
    element?.scrollTo({
      top: element?.scrollHeight,
      behavior: 'smooth',
    })
  }

  const scrollToSelector = selectors => {
    findScrollElement()?.querySelector(selectors)?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'nearest',
    })
  }

  const scrollToComponent = component => {
    nextTick(() => {
      const element = toValue(component)?.$el
      element?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      })
    })
  }

  return {
    scrollToTop,
    scrollToBottom,
    scrollToSelector,
    scrollToComponent,
  }
}
