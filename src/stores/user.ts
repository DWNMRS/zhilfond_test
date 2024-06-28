import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import { User } from '../types/user.ts'

export interface State {
  user: User | null
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    user: null
  },
  mutations: {
    setUser(state, user: User | null) {
      state.user = user
    }
  },
  actions: {
    setUser({ commit }, user: User | null) {
      commit('setUser', user)
    }
  }
})

export function useUserStore() {
  return baseUseStore(key)
}