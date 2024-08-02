import { failure } from '@/utils/toast'

export const useErrorCaptured = additionalCallback => {
  const router = useRouter()
  onErrorCaptured(err => {
    const errorValue = toValue(err)
    if (errorValue?.name === 'AxiosError') {
      if (errorValue.response?.status === 401) {
        router.push('/login')
        failure(errorValue.displayMessage)
      } else if (errorValue.config?.captureError !== false) {
        if (errorValue.config?.captureError === true) {
          additionalCallback?.()
        }
        failure(errorValue.response?.status === 404 ? '伺服器找不到所請求的資源' : errorValue.displayMessage)
      }
      return false
    }
    console.log('onErrorCaptured', errorValue)
  })
}
