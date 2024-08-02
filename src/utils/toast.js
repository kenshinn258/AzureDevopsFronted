import { createDiscreteApi } from 'naive-ui'
import AppToast from '@/components/AppToast.vue'

const { message } = createDiscreteApi(['message'], {})

const renderMessage = (title, props, content) => {
  return h(AppToast, {
    closable: props.closable,
    onClose: props.onClose,
    type: props.type,
    title: title,
    content: content,
  })
}

export const success = (title, content = '') => {
  nextTick(() => {
    message.success(null, {
      render: props => renderMessage(title, props, content),
      closable: true,
      duration: 5000,
      type: 'success',
    })
  })
}

export const info = (title, content = '') => {
  nextTick(() => {
    message.info(null, {
      render: props => renderMessage(title, props, content),
      closable: true,
      duration: 5000,
      type: 'info',
    })
  })
}

export const failure = (title, content = '') => {
  nextTick(() => {
    message.error(null, {
      render: props => renderMessage(title, props, content),
      closable: true,
      duration: 0,
      type: 'error',
    })
  })
}

export const destroyAll = () => {
  message.destroyAll()
}

export const instance = message
