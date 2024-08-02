import { last } from 'lodash-es'
import { destroyAll } from '@/utils/toast'

const STACK_VIEW_CONTROL_KEY = Symbol('stackViewControl')

export const useProvideStackView = () => {
  const stackViews = shallowRef([])
  const { scrollToTop } = useAppScroll()

  watch(stackViews, () => {
    scrollToTop()
    destroyAll()
  })

  const popViewComponent = count => {
    const stackViewsValue = toValue(stackViews)
    const to = Math.min(count > 0 ? count : 1, stackViewsValue.length - 1)
    stackViewsValue.splice(-to, to)
    triggerRef(stackViews)
  }

  const pushViewComponent = (view, keepProps) => {
    const stackViewsValue = toValue(stackViews)
    stackViewsValue.push(view)
    const keepPropsValue = toValue(keepProps)
    if (keepPropsValue) {
      stackViewsValue[stackViewsValue.length - 2].props = keepPropsValue
    }
    triggerRef(stackViews)
  }

  const replaceCurrentViewComponent = view => {
    const stackViewsValue = toValue(stackViews)
    pushViewComponent(Object.assign({}, stackViewsValue.pop(), view))
  }

  const toFirstViewComponent = () => {
    const stackViewsValue = toValue(stackViews)
    stackViews.value = [stackViewsValue[0]]
    triggerRef(stackViews)
  }

  const updateCurrentViewTitle = title => {
    const stackViewsValue = toValue(stackViews)
    if (stackViewsValue?.length > 0) {
      last(stackViewsValue).title = title
      triggerRef(stackViews)
    }
  }

  provide(STACK_VIEW_CONTROL_KEY, {
    popViewComponent,
    pushViewComponent,
    replaceCurrentViewComponent,
    updateCurrentViewTitle,
    toFirstViewComponent,
  })

  useErrorCaptured(() => {
    popViewComponent()
  })

  return {
    stackViews,
    popViewComponent,
    pushViewComponent,
    replaceCurrentViewComponent,
    updateCurrentViewTitle,
    toFirstViewComponent,
  }
}

export const useStackView = () => inject(STACK_VIEW_CONTROL_KEY, null)
