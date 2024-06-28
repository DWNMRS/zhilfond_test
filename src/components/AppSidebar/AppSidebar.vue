<template>
  <div class="sidebar">
    <div class="sidebar__search">
      <h2 class="sidebar__title">Поиск сотрудников</h2>
      <input type="text" v-model="search" class="sidebar__input" placeholder="Введите id или имя"
        @keydown="(e) => { if (e.key === 'Backspace') userStore.dispatch('setUser', null) }">
    </div>
    <div class="sidebar__results">
      <h2 class="sidebar__title">Результаты</h2>
      <span class="sidebar__status" v-if="loading">поиск...</span>
      <span class="sidebar__status" v-else-if="error">ошибка запроса</span>
      <span class="sidebar__status" v-else-if="users.length === 0 && search.length === 0">начните поиск</span>
      <span class="sidebar__status" v-else-if="users.length === 0">ничего не найдено</span>
      <div v-if="users.length" class="sidebar__list">
        <div v-for=" user in users " :key="user.id"
          :class="['sidebar__user', { 'sidebar__user--active': userStore.state.user && userStore.state.user.id === user.id }]"
          @click="() => userStore.dispatch('setUser', user)">
          <div class="sidebar__user-avatar"></div>
          <div class="sidebar__user-info">
            <span class="sidebar__user-name">{{ user.name }}</span>
            <span class="sidebar__user-email">{{ user.email }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { debounce } from '../../utils/debounce.ts';
import { User } from '../../types/user.ts';
import { useUserStore } from '../../stores/user.ts';

const search = ref('');
const users = ref<User[]>([]);
const loading = ref<boolean>(false)
const error = ref<number | undefined>()
const userStore = useUserStore();

const update = debounce(async () => {
  if (search.value.length === 0) {
    users.value = [];
    loading.value = false;
    return;
  }

  const strokes = search.value.split(',').map(stroke => stroke.trim());

  const queryIds = strokes
    .filter(stroke => /^\d+$/.test(stroke))
    .map(stroke => `id=${stroke}`)
    .join('&');

  const queryNames = strokes
    .filter(stroke => !/^\d+$/.test(stroke) && stroke.length > 0)
    .map(stroke => `name_like=${stroke}`)
    .join('&');

  const fetchUsers = async (query: string) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users?${query}`);
    if (res.ok) {
      return await res.json() as User[];
    } else {
      error.value = res.status;
      return [];
    }
  };

  const [resIds, resNames] = await Promise.all([
    queryIds.length > 0 ? fetchUsers(queryIds) : Promise.resolve([]),
    queryNames.length > 0 ? fetchUsers(queryNames) : Promise.resolve([])
  ]);

  users.value = [...resIds, ...resNames];
  loading.value = false;
}, 500);

watch(search, () => {
  loading.value = true
  update();
})
</script>

<style lang="scss" scoped>
@import 'AppSidebar';
</style>