<template>
  <div class="main">
    <TheHeader />
    <div class="container">
      <AppSidebar />
      <AppUserInfo :user="userStore.state.user" />
    </div>
  </div>

</template>

<script setup lang="ts">
import TheHeader from '@/components/TheHeader/TheHeader.vue';
import AppSidebar from '@/components/AppSidebar/AppSidebar.vue';
import AppUserInfo from '@/components/AppUserInfo/AppUserInfo.vue';
import { useUserStore } from './stores/user.ts';

const userStore = useUserStore()
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 50px;
}
.container {
  display: flex;
  flex: 1;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  box-shadow: 0px 0px 10px 0px $shadow;
  overflow: hidden;
}
</style>