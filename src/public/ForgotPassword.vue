<template>
  <Layout title="忘記密碼" :isFooter="false">
    <n-form require-mark-placement="left" class="form"
      ref="formRef"
      :model="model"
      :rules="rules"
    >
      <n-form-item label="電子郵件" path="email" required>
        <n-input v-model:value="model.email" placeholder="請輸入電子郵件" />
      </n-form-item>
      <div class="w-52 pt-4" style="margin: auto;">
        <app-button :fit="false" @click="onSubmit">送出</app-button>
        <app-button :fit="false" secondary @click="router.push('/')" class="mt-4">返回</app-button>
      </div>   
    </n-form>
  </Layout>
</template>

<script setup>
import Layout from '@/public/components/Layout.vue'
import { useForgetPwd } from '@/api/common'
import { success } from '@/utils/toast'
import { useRouter } from 'vue-router';

const router = useRouter();
const model = ref({})
const formRef = shallowRef(null)
const rules = computed(() => {
  return {
    email: [
      { required: true, message: '請輸入電子信箱' },
      { type: 'email', message: 'Email格式錯誤' },
    ],
  }
})
const { mutate: handleSubmit } = useForgetPwd()
const onSubmit = () => {
  formRef.value?.validate().then(() => {
    handleSubmit(model.value, {
      onSuccess: r => {
        success('重設密碼連結已發送至您的電子郵件')
      },
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
