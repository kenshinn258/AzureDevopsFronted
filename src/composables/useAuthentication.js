import { difference, includes, isNumber, map, some } from 'lodash-es'
import { useAuthStore } from '@/store/auth'

export const useAuthentication = () => {
  const auth = useAuthStore()

  const safeAccTypes = roles => map(roles, item => (isNumber(item) ? item : item.accType))

  const hasAllRoles = (...roles) => {
    const accTypes = safeAccTypes(roles)
    return difference(accTypes, auth.accountTypes).length === 0
  }

  const hasAnyRoles = (...roles) => {
    const accTypes = safeAccTypes(roles)
    return some(auth.accountTypes, item => includes(accTypes, item))
  }

  const isSameAccount = someAccount => auth.account === someAccount

  return {
    hasAllRoles,
    hasAnyRoles,
    isSameAccount,
  }
}
