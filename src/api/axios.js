import axios from 'axios'
import { isArray, isArrayBuffer, isString, toLower } from 'lodash-es'
import { saveAs } from 'file-saver'
import { useAuthStore } from '@/store/auth'
import { info, success } from '@/utils/toast'

const axiosConfig = {
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
  timeout: 10000,
  withCredentials: false,
}

export const instance = axios.create(axiosConfig)

instance.interceptors.request.use(
  config => {
    const authStore = useAuthStore()
    if (authStore.token) {
      config.headers = Object.assign(
        {},
        {
          Authorization: `Bearer ${authStore.token}`,
        },
        config.headers,
      )
    }
    if (config.responseType === 'arraybuffer') {
      config.timeout = 0
    }
    return config
  },
  error => Promise.reject(error),
)

instance.interceptors.response.use(
  ({ data, config, headers }) => {
    if (toLower(config.responseType) === 'arraybuffer') {
      if (headers['content-type']?.startsWith('text/plain;')) {
        const message = new TextDecoder().decode(data)
        info(message)
        return message
      }
      const contentDisposition = headers['content-disposition']
      const contentType = headers['content-type']
      const blob = new Blob([data], { type: contentType })
      if (config.autoDownload !== false) {
        if (contentDisposition) {
          const matches = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/.exec(contentDisposition)
          if (matches !== null && matches[1]) {
            let filename = matches[1].replace(/['"]/g, '')
            try {
              filename = decodeURIComponent(filename)
              saveAs(blob, filename)
              success('下載完畢')
              return blob
            } catch (err) {
              console.error('decodeURIComponent error', err)
            }
          }
        }
        const url = window.URL.createObjectURL(blob)
        const anchor = document.createElement('a')
        anchor.href = url
        anchor.target = '_blank'
        anchor.click()
        window.URL.revokeObjectURL(url)
        success('下載完畢')
      }
      return blob
    }
    return data
  },
  async error => {
    if (error.response?.status === 401) {
      const originalRequest = error.config
      const authStore = useAuthStore()
      if (originalRequest._retry || !authStore.isLogin.value) {
        authStore.logout()
        return Promise.reject({
          name: 'AxiosError',
          response: error.response,
          config: error.config,
          displayMessage: '登入逾時，請重新登入',
        })
      } else {
        originalRequest._retry = true
        // TODO: refresh token
        originalRequest.headers.Authorization = `Bearer ${authStore.token}`
        return instance(originalRequest)
      }
    }
    const dataValue = error.response?.data
    let message = null
    if (isArrayBuffer(dataValue)) {
      const text = new TextDecoder().decode(dataValue)
      if (error.response?.headers['content-type']?.startsWith('application/json;')) {
        try {
          const jsonValue = JSON.parse(text)
          message = isArray(jsonValue) || isString(jsonValue) ? jsonValue : jsonValue?.message
        } catch {
          message = text
        }
      } else if (error.response?.headers['content-type']?.startsWith('text/plain;')) {
        message = text
      }
    } else if (isString(dataValue)) {
      message = dataValue
    } else if (dataValue?.title === 'Bad Request') {
      message = dataValue?.detail
    } else {
      message = dataValue?.message
    }
    return Promise.reject({
      name: 'AxiosError',
      response: error.response,
      config: error.config,
      displayMessage:
        message ?? (error.message === 'Network Error' ? '網路連線發生問題，請稍後再試。' : '發生未預期錯誤'),
    })
  },
)

export const adapter = {
  get: ({ queryKey: [url, config] }) => instance.get(url, Object.assign({}, { captureError: true }, config)),
  post: ({ queryKey: [url, data, config] }) =>
    instance.post(url, data, Object.assign({}, { captureError: true }, config)),
  put: ({ queryKey: [url, data, config] }) =>
    instance.put(url, data, Object.assign({}, { captureError: true }, config)),
}
