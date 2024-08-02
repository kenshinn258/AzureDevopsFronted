import App from './App.vue'
import { get, isString } from 'lodash-es'
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'
import { VueQueryPlugin, MutationCache } from '@tanstack/vue-query'
import VueDOMPurifyHTML from 'vue-dompurify-html'
import './assets/index.postcss'
import router from './router'
import directive from './directive'
import { urlSearchParamsToObject } from '@/utils/common'
import { success, failure } from '@/utils/toast'
import { VueReCaptcha } from 'vue-recaptcha-v3';
import fontawesome from '@fortawesome/fontawesome'
import solid from '@fortawesome/fontawesome-free-solid'

fontawesome.library.add(solid)
const pinia = createPinia()
pinia.use(
  createPersistedState({
    storage: sessionStorage,
  }),
)
const url = window.location.origin;
const environments = {
  uat: {
    back: 'https://pmplusmgt.moda.idv.tw',
    siteKey: '6Lf9M7spAAAAAF10r8b4HPjG8LhllZ_71VpbpvmD',
  },
  prod: {
    back: 'https://pmplusmgt.adi.gov.tw',
    siteKey: '6Ld_M7spAAAAAPUzGxilLe1fPDUXbaTAFRJ2P-AX',
  },
};
const currentEnv = Object.keys(environments).find(key => environments[key].back === url);
const siteKeyValue = currentEnv ? environments[currentEnv].siteKey : environments.uat.siteKey;
const meta = document.createElement('meta')
meta.name = 'naive-ui-style'
document.head.appendChild(meta)
const app = createApp(App)
  .use(pinia)
  .use(router)
  .use(VueReCaptcha, {
    siteKey: siteKeyValue,
    loaderOptions: {
      useRecaptchaNet: true,
      autoHideBadge: true,
    },
  })
  .use(VueQueryPlugin, {
    queryClientConfig: {
      defaultOptions: {
        queries: {
          staleTime: 0,
          gcTime: 0,
          refetchOnWindowFocus: false,
          throwOnError: true,
          structuralSharing: false,
          retry: false,
        },
      },
      mutationCache: new MutationCache({
        onSuccess: (data, variables, context, mutation) => {
          const need = get(mutation?.meta, 'includeGlobalSuccess', true)
          if (need) {
            if (data && isString(data)) {
              success(data)
            } else if (isString(data?.message)) {
              success(data?.message)
            }
          }
        },
        onError: (error, variables, context, mutation) => {
          const need = get(mutation?.meta, 'includeGlobalError', true)
          if (need && error?.displayMessage) {
            failure(error?.displayMessage)
          }
        },
      }),
    },
  })
  .use(VueDOMPurifyHTML)
  .use(directive)
  .mount('#app')

router.replace({
  path: window.location.pathname,
  query: urlSearchParamsToObject(window.location.search),
})
