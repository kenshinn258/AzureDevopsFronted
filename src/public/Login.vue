<template>
  <Layout
    title="使用者登入"
    :customized="{
      background: 'rgba(211, 231, 245, 0.2)',
      'border-color': '#e9f4f9',
      width: '400px',
    }"
  >
    <n-form
      ref="formRef"
      :model="model"
      :rules="rules"
      :style="{
        maxWidth: '300px',
        minWidth: '280px',
        margin: 'auto',
      }"
    >
      <app-form-item path="email">
        <n-input placeholder="請輸入使用者帳號" v-model:value="model.email">
          <template #prefix>
            <n-icon>
              <icon-carbon-user />
            </n-icon>
          </template>
        </n-input>
      </app-form-item>
      <app-form-item path="password">
        <n-input
          placeholder="請輸入使用者密碼"
          type="password"
          show-password-on="click"
          v-model:value="model.password"
          @keydown.enter.prevent
        >
          <template #prefix>
            <n-icon>
              <icon-fluent-key20Regular />
            </n-icon>
          </template>
        </n-input>
      </app-form-item>
      <app-form-item class="mt-4">
        <app-button :fit="false" :loading="loading" @click="onSubmit">登入</app-button>
      </app-form-item>
      <div class="flex justify-between mt-2">
        <router-link to="/register">帳號申請</router-link>
        <router-link to="/forgotPassword">忘記密碼</router-link>
      </div>
    </n-form>
  </Layout>
</template>
<script setup>
import Layout from '@/public/components/Layout.vue'
import { useReCaptcha } from 'vue-recaptcha-v3'
import { useLogin } from '@/api/common'
import { pascode } from '@/utils/validator'
import { info } from '@/utils/toast'
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store/auth'

const { loginGuest, token } = useAuthStore()
//router
const router = useRouter();
// //送出表單屬性
const model = ref({})
const formRef = shallowRef(null)
const { mutate: handleSubmit } = useLogin()
//vueRecaptchaV3
const { executeRecaptcha, recaptchaLoaded } = useReCaptcha()
const loading = ref(false)
const recaptchaIns = useReCaptcha().instance
const instance_vueRecaptchaV3 = reactive({
  executeRecaptcha: async () => {
    loading.value = true
    // (可選) 等待直到 recaptcha 載入完成
    await recaptchaLoaded()
    loading.value = false
  },
})
const rules = computed(() => {
  return {
    email: [
      { required: true, message: '請輸入電子信箱' },
      { type: 'email', message: 'Email格式錯誤' },
    ],
    password: [
      { required: true, message: '請輸入使用者密碼' },
      {
        validator: (rule, value) => {
          if (!pascode(value)) {
            return new Error(
              '密碼必須包含數字、字母大小寫、特殊符號四種(特殊符號僅限~!?@#$%^&/*+=)，長度至少13位最多16位',
            )
          }
        },
      },
    ],
  }
})
//使用者初始化
const modelInt = () => {
  model.value.email = '';
  model.value.password = '';
  // if (process.env.NODE_ENV == 'development') {
  //   model.value.email = '123@gmail.com';
  //   model.value.password = '!QAZ2wsx3edc4';
  // }
};
const onSubmit = async () => {
  loading.value = true;
  model.value.captcha = await executeRecaptcha('login');
  loading.value = false;
  if (model.value.captcha === '') {
    info('reCAPTCHA驗證碼失效，請稍後再重新登入。');
    return
  }
  formRef.value?.validate().then(() => {
    handleSubmit(model.value, {
      onSuccess: r => {
        loginGuest(r.token)
        recaptchaIns.value.hideBadge()
        router.push('/main');
      },
      onError: e => {
        modelInt()
      }
    })
  })
}

onMounted(() => {
  // modelInt();
  instance_vueRecaptchaV3.executeRecaptcha()
  setTimeout(() => {
    if (!token) {
      recaptchaIns.value.showBadge()
    }
  }, 1000)
})
onBeforeUnmount(() => {
  recaptchaIns.value.hideBadge()
})
</script>

<style scoped></style>
