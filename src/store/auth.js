import { defineStore, acceptHMRUpdate } from 'pinia'
import { cloneDeep, defaultTo, isNil, find, filter, forEach, groupBy, reduce, sortBy, map } from 'lodash-es'
import { urlSearchParamsToObject } from '@/utils/common'

export const useAuthStore = defineStore(
  'auth',
  () => {
    const route = useRoute()

    const guestMode = ref(false)

    const token = ref(null)
    const account = ref(null)
    const accType = ref(null)
    const accountTypeName = ref(null)
    const accountTypes = ref(null)
    const personName = ref(null)
    const unit = ref(null)
    const email = ref(null)
    const tel = ref(null)
    const ext = ref(null)

    const permissions = ref(null)

    const logout = () => {
      token.value = null
      account.value = null
      accType.value = null
      accountTypeName.value = null
      accountTypes.value = null
      personName.value = null
      email.value = null
      tel.value = null
      ext.value = null
      permissions.value = null
    }

    const logoutGuest = t => {
      if (t) {
      // if (toValue(guestMode)) {
        token.value = null
        guestMode.value = false
      }
    }

    const loginGuest = value => {
      token.value = value
      guestMode.value = true
    }

    const flattenMenus = computed(() =>
      map(sortBy(permissions.value, ['parentSn', 'itemOrder']), permission => {
        return {
          key: permission.sn,
          parentKey: defaultTo(permission.parentSn, '__root__'),
          label: permission.nameText,
          href: permission.actionPath?.replace('Action.do', ''),
          query: permission.linkParameter ? urlSearchParamsToObject(permission.linkParameter) : null,
          visibility: isNil(permission.visibility) || permission.visibility === 1,
        }
      }),
    )
    const menuGroupMapping = computed(() => groupBy(flattenMenus.value, permission => permission.parentKey))
    const menuCacheMapping = computed(() =>
      reduce(
        flattenMenus.value,
        (mapping, menu) => {
          mapping[`KEY-${menu.key}`] = menu
          if (menu.href) {
            mapping[`HREF-${menu.href}`] = menu
          }
          return mapping
        },
        {},
      ),
    )

    const menus = computed(() => {
      const groupMapping = menuGroupMapping.value
      const filterVisibility = items => {
        if (items?.length > 0) {
          const result = filter(items, { visibility: true })
          if (result?.length > 0) {
            return cloneDeep(result)
          }
        }
        return undefined
      }
      const setChildrenMenu = parentMenus => {
        forEach(parentMenus, parentMenu => {
          parentMenu.children = filterVisibility(groupMapping[parentMenu.key])
          setChildrenMenu(parentMenu.children)
        })
      }
      const rootMenus = filterVisibility(groupMapping['__root__'])
      setChildrenMenu(rootMenus)
      return rootMenus
    })

    const secondaryMenus = computed(() => {
      const cacheMapping = menuCacheMapping.value
      for (let menu = cacheMapping[`HREF-${route.path}`]; !isNil(menu); menu = cacheMapping[`KEY-${menu.parentKey}`]) {
        if (menu.parentKey === '__root__') {
          return map(find(menus.value, { key: menu.key })?.children, child => {
            return {
              root: true,
              ...child,
            }
          })
        }
      }
      return []
    })

    const breadcrumbItems = computed(() => {
      const cacheMapping = menuCacheMapping.value
      const result = []
      for (let menu = cacheMapping[`HREF-${route.path}`]; !isNil(menu); menu = cacheMapping[`KEY-${menu.parentKey}`]) {
        result.push({
          label: menu.label,
          href: menu.href,
        })
      }
      result.push({
        label: '首頁',
        href: '/main',
      })
      return result.reverse()
    })

    const currentMenu = computed(() => {
      const cacheMapping = menuCacheMapping.value
      let path = route.path
      let menu = cacheMapping[`HREF-${path}`]
      for (; isNil(menu) && path.indexOf('/') !== -1; menu = cacheMapping[`HREF-${path}`]) {
        path = path.substring(0, path.lastIndexOf('/'))
      }
      return menu
    })

    const currentMenuKeys = computed(() => {
      const menu = currentMenu.value
      const keys = []
      if (menu) {
        keys.push(menu.key)
        for (let parentKey = menu.parentKey; parentKey !== '__root__'; ) {
          keys.push(parentKey)
          parentKey = menuCacheMapping.value[`KEY-${parentKey}`].parentKey
        }
      }
      return keys.reverse()
    })

    const isLogin = computed(() => {
      return !isNil(toValue(token))
    })
    const homePath = computed(() => (toValue(isLogin) ? '/main' : '/'))
    const isMatchMainPage = computed(() => route.path === '/main')

    const hasPermission = path => toValue(flattenMenus)?.some(({ href }) => href === path) === true

    return {
      token,
      account,
      accType,
      accountTypeName,
      accountTypes,
      personName,
      unit,
      permissions,
      menus,
      secondaryMenus,
      breadcrumbItems,
      currentMenu,
      currentMenuKeys,
      isLogin,
      homePath,
      isMatchMainPage,
      logout,
      logoutGuest,
      loginGuest,
      hasPermission,
    }
  },
  {
    persist: true,
  },
)

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}
