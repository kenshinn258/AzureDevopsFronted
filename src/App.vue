<template>
  <n-config-provider :locale="localeOverrides" :date-locale="dateZhTW" :theme-overrides="themeOverrides"
    :breakpoints="breakpoints" abstract>
    <n-dialog-provider>
      <div class="flex" v-if="authStore.token">
        <CommonMenu :menuItems="menuItems"></CommonMenu>
        <div class="main">
          <router-view />
        </div>
      </div>
      <router-view v-else />
    </n-dialog-provider>
  </n-config-provider>
</template>

<script setup>
import { useEventListener } from '@vueuse/core'
import { blueColor, grayColor, greenColor, primaryColor, secondaryColor } from '/color'
import { zhTW, dateZhTW } from 'naive-ui'
import { destroyAll } from './utils/toast'
import { useAuthStore } from '@/store/auth'
import CommonMenu from '@/private/components/CommonMenu.vue'
import { getMenuList } from '@/api/common'

const localeOverrides = Object.assign({}, zhTW, {
  Input: { placeholder: '' },
  InputNumber: { placeholder: '' },
  Select: { placeholder: '' },
})

/**
 * @type import('naive-ui').GlobalThemeOverrides
 */
const themeOverrides = {
  Breadcrumb: {
    fontSize: '1rem',
    separatorColor: 'rgba(51, 54, 57, 1)',
    itemTextColor: 'rgba(51, 54, 57, 1)',
    itemLineHeight: '1.6',
    itemTextColorActive: 'rgba(108, 117, 125, 1)',
  },
  Button: {
    fontWeightStrong: '700',
  },
  DataTable: {
    thColor: blueColor['03'],
    thColorModal: blueColor['03'],
    thColorPopover: blueColor['03'],
    thTextColor: 'rgba(255, 255, 255, 1)',
    thFontWeight: '700',
    thPaddingSmall: '4px',
    thPaddingMedium: '8px',
    thPaddingLarge: '8px',
    tdPaddingSmall: '4px',
    tdPaddingMedium: '8px',
    tdPaddingLarge: '8px',
  },
  common: {
    fontFamily: 'Microsoft JhengHei',
  },
  Form: {
    labelFontSizeLeftMedium: '1rem',
    labelFontWeight: '600',
  },
  Layout: {
    textColor: '#212529',
  },
  Steps: {
    indicatorTextColorFinish: blueColor['03'],
    indicatorBorderColorProcess: blueColor['03'],
    indicatorBorderColorFinish: blueColor['03'],
    indicatorColorProcess: blueColor['03'],
    splitorColorFinish: blueColor['03'],
  },
  Select: {
      peers: {
        InternalSelection: {
          borderActive: `1px solid ${blueColor['03']}`,
          borderFocus: `1px solid ${blueColor['03']}`,
          borderHover: `1px solid ${blueColor['03']}`,
          caretColor: blueColor['03'],
          boxShadowActive: '0 0 0 2px rgba(54, 143, 163, 0.2)',
          boxShadowFocus: '0 0 0 2px rgba(54, 143, 163, 0.2)'
        },
      }
  },
  Input: {
    groupLabelColor: 'initial',
    borderFocus: `1px solid ${blueColor['03']}`,
    borderHover: `1px solid ${blueColor['03']}`,
    loadingColor: blueColor['03'],
    caretColor: blueColor['03'],
    boxShadowFocus: '0 0 0 2px rgba(54, 143, 163, 0.2)'
  },
  Switch: {
    loadingColor: blueColor['03'],
    railColorActive: blueColor['03'],
    railColor: primaryColor['02'],
  },
  Spin: {
    textColor: blueColor['03'],
    color: blueColor['03'],
  },
  Radio: {
    dotColorActive: blueColor['03'],
    buttonBorderColorActive: blueColor['03'],
    buttonTextColorActive: blueColor['03'],
    buttonTextColorHover: blueColor['03'],
  },
  Tabs: {
    barColor: blueColor['03'],
    tabTextColorActiveCard: blueColor['03'],
    tabTextColorHoverBar: blueColor['03'],
    tabTextColorActiveBar: blueColor['03'],
    tabTextColorHoverLine: blueColor['03'],
    tabTextColorActiveLine: blueColor['03'],
    tabColorSegment: blueColor['03'],
  },
  Table: {
    thColor: blueColor['03'],
    thColorModal: blueColor['03'],
    thTextColor: 'rgba(255, 255, 255, 1)',
    thFontWeight: '600',
    thPaddingMedium: '6px',
    tdPaddingMedium: '6px',
  },
  Checkbox: {
    colorChecked: blueColor['03'],
  },
  Descriptions: {
    // thColor: "rgba(0, 0, 0, 1)",
    // titleTextColor: primaryColor["07"],
    thColorModal: blueColor['03'],
    thTextColor: 'rgba(255, 255, 255, 1)',
    thFontWeight: '600',
    thPaddingBorderedMedium: '6px 8px',
    tdPaddingBorderedMedium: '6px 8px',
  },
}
const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
}
useProvideAppButtonColorStore({
  primary: {
    color: '#FFFFFF',
    bg: blueColor['02'],
    borderColor: blueColor['02'],
    hoverColor: '#FFFFFF',
    hoverBg: blueColor['01'],
    hoverBorderColor: blueColor['01'],
  },
  secondary: {
    color: '#000000',
    bg: '#FFFFFF',
    borderColor: grayColor['03'],
    hoverColor: 'blue',
    hoverBg: '#FFFFFF',
    hoverBorderColor: 'blue',
  },
  tertiary: {
    color: '#FFFFFF',
    bg: secondaryColor['02'],
    borderColor: secondaryColor['02'],
    hoverColor: '#FFFFFF',
    hoverBg: secondaryColor['01'],
    hoverBorderColor: secondaryColor['02'],
  },
  quaternary: {
    color: '#FFFFFF',
    bg: greenColor['02'],
    borderColor: greenColor['02'],
    hoverColor: '#FFFFFF',
    hoverBg: greenColor['03'],
    hoverBorderColor: greenColor['02'],
  },
})
const { currentRoute } = useRouter()
const authStore = useAuthStore()
const menuItems = ref([])
const { mutate: handleSubmit } = getMenuList()
watch(currentRoute, () => {
  const noNeedTokeList = ['/login', '/forgotPassword', '/resetPassword', '/register']
  if (noNeedTokeList.find(e => e === currentRoute.value.path)) {
    destroyAll()
    authStore.token = null
  }
  if (authStore.token) {
    handleSubmit(null, {
      onSuccess: data => {
        menuItems.value = data
      },
    })
  }
})

useEventListener(window, ['error', 'unhandledrejection'], err => {
  if (err.reason?.message?.includes('Failed to fetch dynamically imported module:')) {
    location.reload()
  }
  // TODO 紀錄未知的錯誤 ?
})
</script>

<style scoped>
.main {
  background-color: #F2FAFF;
  width: 100%;
  min-height: 100vh;
  padding: 1rem 2.5rem;
}
</style>
