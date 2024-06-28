<template>
  <div class="info">
    <div class="user" v-if="props.user">
      <div class="user__photo">
      </div>
      <div class="user__info">
        <h2 class="user__name">{{ user?.name }}</h2>
        <div class="user__contact">
          <span class="user__contact-title">email:</span>
          <a>{{ user?.email }}</a>
        </div>
        <div class="user__contact">
          <span class="user__contact-title">phone:</span>
          <a>{{ user?.phone }}</a>
        </div>
        <div class="user__about">
          <h2 class="user__about-title">О себе:</h2>
          <p class="user__about-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
            fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum.</p>
        </div>

      </div>
    </div>
    <div v-else class="info__empty">
      <span class="info__empty-stub">Выберите сотрудника, чтобы посмотреть его профиль</span>
    </div>
  </div>

</template>

<script setup lang="ts">
import { User } from '../../types/user.ts';
import { defineProps } from 'vue';

const props = defineProps<{
  user?: User | null,
}>()

</script>

<style lang="scss" scoped>
@import 'AppUserInfo';
</style>