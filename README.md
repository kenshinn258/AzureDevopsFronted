#  前端
## 前端結構

```
── README.md
├── public
│   ├── vite.svg
├── src                                      
│   ├── assets      // 靜態檔案區
│   │   ├── images
│   │   ├── scss                                   
│   │   └── vue.svg 
│   ├── components       // 共用元件區                                
│   │   ├── Modal.vue
│   │   ├── NavBar.vue
│   │   ├── SearchForm.vue
│   │   ├── HelloWorld.vue
│   │   ├── Table.vue
│   │   └── Toasts.vue
│   ├── pages  // 功能頁面區
│   │   ├── Login // 登入頁面
│   │   ├── mainPage // 登入後首頁
│   │   ├── PNR
│   │   ├── portal  // 登入前首頁
│   │   ├── REM
│   │   ├── Layout
│   │   ├── 404.vue
│   │   └── Home.vue
│   ├── router
│   │   ├── auth.js
│   │   └── index.js
│   ├── services // call api
│   │   ├── Auth
│   │   ├── PNR
│   │   ├── REM
│   │   ├── apiConfig.js
│   │   └── index.js
│   └── store
│       ├── admin-011B01.js
│       ├── sys.js
│       └── user.js
├── .env.dev
├── .env.mock
├── .env.prod
├── .env.sit
├── .eslintignore
├── .eslintrc.js
├── .gitignore
├── .prettiercc.js
├── Dockerfile
├── index.html
├── package-lock.json    
├── package.json         
└── vite.config.js                       // 專案基本資訊
```

## 環境
```
├── .env.dev - 開發環境
├── .env.mock - 介接後端mock api用
├── .env.prod - 正式環境
├── .env.sit - sit環境
```
* 上版指令：npm run build:{env}
* 上版若後端僅介接mock api，指令：npm run build:mock
* 開發時指令：npm run dev // yarn dev
* 上版使用branch: develop
### 細項說明
```
VITE_NODE_ENV=sit // 佈版環境，啟動後terminal會印出
VITE_APP_TITLE=SIT環境 // 中文說明，啟動後terminal會印出

# api base url
VITE_API_BASE_URL='http://34.81.143.123/api/mock'  // 後端 api base url
VITE_WEB_BASE_URL='/web' // context path
```

## package json
* vue 3
* vite 4
* axios 
* pinia 2
* vue-router 4
* bootstrap
* sass 

## component
### Modal 使用
``` js=
// template: 
    <Modal title="刪除確認" id="del" ref="delModal">
      <div>確認是否刪除該筆資料？</div>
    </Modal>
    
// script: 
import Modal from '@/components/Modal.vue'
let delModal = ref(null)
const delEvt = function() {// open modal
  delModal.value.show() 
}
const delEvtClose = function() {// close modal
  delModal.value.hide() 
}
```
* 可帶參數
``` js=
const props = defineProps({
  id: String,
  title: String, 
  scroll: {
    type: Boolean,
    default: () => true
  },
  onlyOk: {
    type: Boolean,
    default: () => false
  },
  onlyCancel: {
    type: Boolean,
    default: () => false
  },
  noButton: {
    type: Boolean,
    default: () => false
  },
  okText: {
    type: String,
    default: () => '確定'
  },
  cancelText: {
    type: String,
    default: () => '取消'
  },
  keyboardClose: {
    type: Boolean,
    default: () => true
  },
  backdrop: {
    type: Boolean,
    default: () => true
  },
  size: {
    type: String,
    default: () => 'auto'
  }, // xl,lg,sm
  okEvent: Function,
  cancelEvent: Function,
})
```
### Toasts
``` js=
    // template: 
    <Toasts ref="toastEl" msg="test" />
        
    // script
    let toastEl = ref(null)
    const openTest = function () {
     toastEl.value.show()
    }
```
* 可帶參數
``` js=
 const props = defineProps({
    type: {
      type: String, // success, fail, info
      default: () => 'success'
    },
    msg: String,
    delay: {
      type: Number,
      default: 3000
    },
  })
```

### Table
```js=
// template:
 <TableResult :header="tableHeader" :result="tableResult">
     <template #cell(sDesc)="{ item }" >
         // {item} 整筆資料 | {value} 該欄位資料
          <button v-if="item.btnShow==='Y'" type="button" class="btn btn-light fw-bold">履歷資料登錄(含參與意願)</button>
    </template>
 </TableResult>
// script:
  import TableResult from '~components/Table.vue'

  let tableHeader = ref([
    { param:'date' ,label: '作業時間', width: '100' }, 
    { param:'sDesc' ,label: '作業名稱' },
    { param:'desc' ,label: '作業描述' },
    { param:'status' ,label: '作業進行狀態' },
    { param:'statusName' ,label: '報名進度' },
  ])
  let tableResult = reactive([]) // 帶入值
```
* 可帶參數
```js=

const props = defineProps({
  class: String, // table可加class進入
  header: Array, // 格式：{ param(必填), label(必填), width, 'max-width' } 
  result: Array,
  emptyText: {
    type: String,
    default: () => '查無資料'
  },
})
```
* header帶入的參數中 label以html方式，可加br斷行

### SearchForm
* 查詢列表的固定範例：
```js=
// template: 
<search-form ref="searchForm">
    <div class="row form-item">
      <label for="sCode" class="col-auto col-form-label">年度</label>
      <div class="col-auto">
        <input type="text" class="form-control form-control-sm" >
      </div>
    </div>
    <div class="form-btn">
      <button type="button" class="btn btn-secondary m-2" @click="submitEvent">查詢</button>
      <button type="button" class="btn btn-light m-2" >重設條件</button>
    </div>
  </search-form>
// script
import SearchForm from '@/components/SearchForm.vue'

const searchForm = ref(null)
const submitEvent = function() {
  searchForm.value.toggle() // 查詢時，查詢表單會收合
}
```
* 可帶參數
```js=
const props = defineProps({
  isHide: { // 預設未收合
    type: Boolean,
    default: () => false,
  }
})
```

## service
* call api方法：
* axios 經封裝，url統一管理存放在service底下，依功能類別分
```js=
// path: /service
import serviceAxios from "../index"
// get 使用 params, other使用data
export const apiGetUserInfo = () => {
  return serviceAxios({
    url: '/RDP022A01/permission',
    method: 'get',
  })
}

// 功能頁面
import { apiGetUserInfo } from '~services/Auth/rdp'
    await apiGetUserInfo().then(resp => {
      userStore.$patch(state => {
        state.name = resp.accountInfo.personName
        state.accType = resp.accountInfo.accType
      })
    }).catch((error) => {
      console.log('error', error) 
    })
```