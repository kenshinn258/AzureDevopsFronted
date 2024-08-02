<template>
  <Layout title="重設密碼" :isFooter="false">
    <n-form require-mark-placement="left" class="form" ref="formRef" :model="model" :rules="rules">
      <n-form-item label="新密碼" path="password" required>
        <n-input v-model:value="model.password" placeholder="請輸入密碼" type="password" show-password-on="click"
          @keydown.enter.prevent />
      </n-form-item>
      <n-form-item label="再次輸入密碼" path="repassword" required>
        <n-input v-model:value="model.repassword" placeholder="請輸入密碼" type="password" show-password-on="click"
          @keydown.enter.prevent />
      </n-form-item>
      <div class="w-52 pt-4" style="margin: auto;">
        <app-button :fit="false" @click="onSubmit">送出</app-button>
      </div>
    </n-form>
  </Layout>
</template>

<script setup>
import Layout from '@/public/components/Layout.vue'
import { useResetPwd } from '@/api/common'
import { success } from '@/utils/toast'
import { useRouter, useRoute } from 'vue-router';
import { pascode } from '@/utils/validator'

const router = useRouter();
const route = useRoute()
const model = ref({})
const formRef = shallowRef(null)
const rules = computed(() => {
  return {
    password: [
      { required: true, message: '請輸入使用者密碼' },
      {
        validator: (rule, value) => {
          if (value && !pascode(value)) {
            return new Error(
              '密碼必須包含數字、字母大小寫、特殊符號四種(特殊符號僅限~!?@#$%^&/*+=)，長度至少13位最多16位',
            )
          }
        },
      },
    ],
    repassword: [
      { required: true, message: '請再次輸入密碼' },
      {
        validator: (rule, value) => {
          if (value && (value !== model.value.password)) {
            return new Error(
              '兩次密碼輸入不同，請再次確認',
            )
          }
        },
      },
    ],
  }
})
const { mutate: handleSubmit } = useResetPwd()
const onSubmit = () => {
  formRef.value?.validate().then(() => {
    model.value.token = route.query.token
    handleSubmit(model.value, {
      onSuccess: r => {
        success('密碼更新成功')
        setTimeout(() => {
          router.push('/')
        }, 1500)
      },
      onError: r => {
        setTimeout(() => {
          router.push('/forgotPassword')
        }, 1500)
      }
    })
  })
}
</script>

<style scoped>
.form {
  margin: 0 auto;
  width: 50%;
}
</style>
