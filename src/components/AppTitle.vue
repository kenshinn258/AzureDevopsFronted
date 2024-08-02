<template >
  <h2 class="text-title py-3 mb-4 mt-1">
    <div class="d-flex align-items-center text-style">
      <div class="pl-4">     
        <slot />
      </div>
    </div>
  </h2>
</template>
  
<script setup>
</script>

<style scoped  >
.text-title {
  color: #368FA3;
}
.text-style {
  border-left: 5px solid #368FA3;
  font-weight: bold;
}
</style>
