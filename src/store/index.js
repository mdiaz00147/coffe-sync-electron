import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";

import { HTTP } from "@/services/http";
// import global from "./global";

Vue.use(Vuex);

const vuexLocalStorage = new VuexPersist({
  key: "vuex", // The key to store the state on in the storage provider.
  storage: window.localStorage // or window.sessionStorage or localForage
  // Function that passes the state and returns the state with only the objects you want to store.
  // reducer: state => state,
  // Function that passes a mutation and lets you decide if it should update the state in localStorage.
  // filter: mutation => (true)
});

export const store = new Vuex.Store({
  plugins: [vuexLocalStorage.plugin],
  state: {
    currentPath: "",
    authToken: null,
    menuOpen: false,
    isLoading: false,
    isFetching: false
  },
  mutations: {
    setCurrentPath(state, value) {
      state.currentPath = value;
    },
    setAuthToken(state, token) {
      state.authToken = token;
    },
    setMenuOpen(state, open) {
      state.menuOpen = open;
    },
    setLoading(state, isLoading) {
      state.isLoading = isLoading;
    },
    setFetching(state, isFetching) {
      state.isFetching = isFetching;
    }
  },
  getters: {
    getCurrentPath: (state) => state.currentPath,
    authToken: (state) => state.authToken,
    menuOpen: (state) => state.menuOpen,
    isLoading: (state) => state.isLoading,
    isFetching: (state) => state.isFetching,
    uuid: (state) => state.currentUser.uuid
  },
  actions: {}
});
