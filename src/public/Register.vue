<template>
  <Layout title="註冊帳號" :isFooter="false">
    <n-form require-mark-placement="left" class="form" ref="formRef" :model="model" :rules="rules">
      <n-form-item label="帳號" path="email" required>
        <n-input v-model:value="model.email" placeholder="請輸入E-mail" :disabled="isVerify"/>
        <div class="flex ml-2">
          <n-input v-model:value="model.emailCode" placeholder="驗證碼" :disabled="!isSendEmail || isVerifyEmail" />
          <app-button @click="onVerify('E')" small tertiary class="ml-2" :disabled="!model.email"
            v-if="!isSendEmail">發送驗證碼</app-button>
          <app-button @click="onSend('E')" small tertiary class="ml-2" :disabled="!model.email"
            v-else-if="isSendEmail && !model.emailCode && !isVerifyEmail">重送驗證碼</app-button>
          <app-button @click="onConfirm('E')" small tertiary class="ml-2" :disabled="isVerifyEmail"
            v-else>確認驗證碼</app-button>
        </div>
      </n-form-item>
      <n-form-item label="手機" path="phone" required>
        <n-input :disabled="!isVerifyEmail || isVerify" v-model:value="model.phone" placeholder="請輸入手機號碼" />
        <div class="flex ml-2">
          <n-input v-model:value="model.phoneCode" placeholder="驗證碼" :disabled="!isSendPhone || isVerifyPhone" />
          <app-button @click="onVerify()" small tertiary class="ml-2" :disabled="!model.phone"
            v-if="!isSendPhone">發送驗證碼</app-button>
          <app-button @click="onSend()" small tertiary class="ml-2" :disabled="!model.phone"
            v-else-if="isSendPhone && !model.phoneCode && !isVerifyPhone">重送驗證碼</app-button>
          <app-button @click="onConfirm()" small tertiary class="ml-2" :disabled="isVerifyPhone"
            v-else>確認驗證碼</app-button>
        </div>
      </n-form-item>
      <n-form-item label="姓名" path="name" required>
        <n-input v-model:value="model.name" placeholder="請輸入姓名" />
      </n-form-item>
      <n-form-item label="密碼" path="password" required>
        <n-input v-model:value="model.password" placeholder="請輸入密碼" type="password" show-password-on="click"
          @keydown.enter.prevent />
      </n-form-item>
      <n-form-item label="再次輸入密碼" path="repassword" required>
        <n-input v-model:value="model.repassword" placeholder="請輸入密碼" type="password" show-password-on="click"
          @keydown.enter.prevent />
      </n-form-item>
      <div class="w-52 pt-4" style="margin: auto">
        <app-button :fit="false" @click="onSubmit" :disabled="!isVerify">確認註冊</app-button>
      </div>
    </n-form>
  </Layout>
</template>

<script setup>
import Layout from '@/public/components/Layout.vue'
import { useRegister, useVerify, useReSend, useCheckCode } from '@/api/common'
import { success } from '@/utils/toast'
import { mobile, pascode } from '@/utils/validator'
import { useRouter } from 'vue-router';

const router = useRouter();
const model = ref({})
const isVerifyEmail = ref(false)
const isVerifyPhone = ref(false)
const isSendEmail = ref(false)
const isSendPhone = ref(false)
const isVerify = computed(() => {
  return isVerifyEmail.value && isVerifyPhone.value ? true : false
})
const formRef = shallowRef(null)
const rules = computed(() => {
  return {
    email: [
      { required: true, message: '請輸入電子信箱' },
      { type: 'email', message: 'Email格式錯誤' },
    ],
    phone: [
      { required: isVerifyEmail.value, message: '請輸入手機號碼' },
      {
        validator: (rule, value) => {
          if (value && !mobile(value, true)) {
            return new Error(
              '請輸入有效格式的手機號碼',
            )
          }
        },
      },
    ],
    name: [
      { required: isVerify.value, message: '請輸入姓名' },
    ],
    password: [
      { required: isVerify.value, message: '請輸入使用者密碼' },
      {
        validator: (rule, value) => {
          if (value && !pascode(value) && isVerify.value) {
            return new Error(
              '密碼必須包含數字、字母大小寫、特殊符號四種(特殊符號僅限~!?@#$%^&/*+=)，長度至少13位最多16位',
            )
          }
        },
      },
    ],
    repassword: [
      { required: isVerify.value, message: '請再次輸入密碼' },
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
const { mutate: handleSubmit } = useRegister()
const { mutate: handleVerify } = useVerify()
const { mutate: handleReSend } = useReSend()
const { mutate: handleCheck } = useCheckCode()
const onVerify = type => {
  formRef.value?.validate().then(() => {
    handleVerify(
      {
        email: model.value.email,
        phone: model.value.phone,
        type: type ? type : null,
      },
      {
        onSuccess: r => {
          success('驗證碼已發送')
          if (type === 'E') {
            isSendEmail.value = true
          } else {
            isSendPhone.value = true
          }
        },
      },
    )
  })
}
const onSend = type => {
  formRef.value?.validate().then(() => {
    handleReSend(
      {
        email: model.value.email,
        phone: model.value.phone,
        type: type ? type : null,
      },
      {
        onSuccess: r => {
          success('驗證碼已重新發送')
        },
      },
    )
  })
}
const onConfirm = type => {
  formRef.value?.validate().then(() => {
    handleCheck(
      {
        email: model.value.email,
        phone: model.value.phone,
        type: type ? type : null,
        verifyCode: type === 'E' ? model.value.emailCode : model.value.phoneCode,
      },
      {
        onSuccess: r => {
          success('驗證碼正確')
          if (type === 'E') {
            isVerifyEmail.value = true
          } else {
            isVerifyPhone.value = true
          }
        },
        onError: e => {
          if (type === 'E') {
            model.value.emailCode = ''
          } else {
            model.value.phoneCode = ''
          }
        }
      },
    )
  })
}
const onSubmit = () => {
  formRef.value?.validate().then(() => {
    handleSubmit(model.value, {
      onSuccess: r => {
        success('註冊成功')
        setTimeout(() => {
          router.push('/')
        }, 1500)
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
