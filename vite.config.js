import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueRouter from 'unplugin-vue-router/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { webUpdateNotice } from '@plugin-web-update-notification/vite'
import { sep, resolve } from 'path'

// https://vitejs.dev/config/

const privatePagePath = resolve(__dirname, './src/private').split(sep).join('/')

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  const { VITE_NODE_ENV, VITE_APP_TITLE, VITE_API_BASE_URL } = env
  console.log(VITE_APP_TITLE, VITE_NODE_ENV)
  return defineConfig({
    plugins: [
      VueRouter({
        logs: false, // display router tree
        routesFolder: [
          {
            src: 'src/public',
            path: '',
          },
          {
            src: 'src/private',
            path: '',
          },
        ],
        exclude: ['**/components/**/*.vue'],
      }),
      vue(),
      AutoImport({
        imports: [
          'vue',
          VueRouterAutoImports,
          'pinia',
          {
            'naive-ui': ['useDialog', 'useMessage', 'useNotification', 'useLoadingBar'],
            '@/composables/useAppButtonColor': ['useProvideAppButtonColorStore', 'useAppButtonColorStore'],
            '@/composables/usePagination': ['usePagination'],
            '@/composables/useWatchArrayElementCheckbox': ['useWatchArrayElementCheckbox'],
            '@/composables/useWatchArrayElementModify': ['useWatchArrayElementModify'],
            '@/composables/useAppScroll': ['useAppScroll'],
            '@/composables/useAuthentication': ['useAuthentication'],
            '@/composables/useStackView': ['useProvideStackView', 'useStackView'],
            '@/composables/useErrorCaptured': ['useErrorCaptured'],
            '@/composables/useHiPKI': ['useHiPKI'],
            '@/composables/useRouteReload': ['useRouteReload'],
          },
        ],
        // dts: "src/auto-imports.d.ts",
        eslintrc: {
          enabled: true,
          filepath: './.eslintrc-auto-import.json',
        },
        viteOptimizeDeps: false, // 0.18.0 預設為true 似乎某些情況沒有import 會 xxx is not defined
      }),
      Components({
        dirs: ['src/components'],
        extensions: ['vue'],
        resolvers: [
          NaiveUiResolver(),
          IconsResolver({
            prefix: 'icon',
          }),
        ],
      }),
      Icons({
        autoInstall: true,
        compiler: 'vue3',
      }),
      webUpdateNotice({
        logVersion: version => console.log(`version: %c${version}`, 'color: #598B70'),
        hiddenDismissButton: true,
        notificationProps: {
          title: '通知',
          description: '網頁已更新，請重新整理頁面以取得最新版本',
          buttonText: '重新整理',
        },
      }),
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },
    build: {
      rollupOptions: {
        output: {
          chunkFileNames({ name, facadeModuleId }) {
            if (facadeModuleId?.startsWith(privatePagePath)) {
              const newName = facadeModuleId
                .substring(privatePagePath.length + 1, facadeModuleId.lastIndexOf(name) - 1)
                .split('/')
                .join('-')
              return `assets/${newName}-[name]-[hash].js`
            }
            return 'assets/[name]-[hash].js'
          },
        },
      },
    },
    server: {
      host: '0.0.0.0',
    },
  })
}
