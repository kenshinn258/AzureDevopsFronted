<template>
  <div class="login">
    <div class="header w-32" :class="{'mb-4': !props.isFooter, 'pb-4': !props.isFooter}">
      <img src="@/assets/images/logo.png" alt="LOGO" />
    </div>
    <n-card :title="props.title" class="py-4 card" :style="props.customized" hoverable :header-style="{ 'text-align': 'center' }" size="medium">
      <slot />
    </n-card>
    <div class="footer" :style="{opacity: props.isFooter ? 1:0}"></div>
  </div>
</template>
<script setup>
const props = defineProps({
  isFooter: {
    type: Boolean,
    default: () => true,
  },
  title: {
    type: String,
    default: () => '',
  },
  customized: {
    type: Object,
    default: () => undefined,
  }
})
</script>
<style scoped>
.login {
  background: url('@/assets/images/loginBackground.jpg');
  background-size: cover;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}
.header {
  align-self: start;
}
.header img {
  margin-left: 3rem;
  margin-top: 1rem;
}
.footer {
  height: 3rem;
  width: 100%;
  background: #fff;
  margin-top: 2rem;
}
.card {
  background: rgba(255,255,255,0.8);
  width: 80%;
}
.n-card >>> .n-card-header__main {
  font-weight: bold;
  color: #6bb8c9;
  font-size: 1.3rem;
}
</style>
