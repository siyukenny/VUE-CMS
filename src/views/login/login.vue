<template>
  <div class="login">
    <login-panel login-title="CMS Demo" login-sub-title="Using Vue 3 + TS" />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.login {
  @apply flex justify-center items-center w-full h-full;
  background-image: repeating-radial-gradient(
    circle at top left,
    rgb(240, 249, 255) 0%,
    rgb(255, 242, 246) 100%
  );
  background-image: -webkit-repeating-radial-gradient(
    circle at top left,
    rgb(240, 249, 255) 0%,
    rgb(255, 242, 246) 100%
  );
}
</style>
