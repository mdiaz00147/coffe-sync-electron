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
    host: "",
    folderItems: [],
    menuOpen: false,
    isLoading: false
  },
  mutations: {
    setCurrentPath(state, value) {
      state.currentPath = value;
    },
    setFolderItems(state, value) {
      state.folderItems = value;
    },
    setMenuOpen(state, open) {
      state.menuOpen = open;
    },
    setLoading(state, isLoading) {
      state.isLoading = isLoading;
    },
    setHost(state, value) {
      state.host = value;
    }
  },
  getters: {
    getCurrentPath: (state) => state.currentPath,
    getFolderItems: (state) => state.folderItems,
    getHost: (state) => state.host,
    menuOpen: (state) => state.menuOpen,
    isLoading: (state) => state.isLoading
  },
  actions: {
    async changeHost({ commit, dispatch }, data) {
      console.log(data);
      await commit("setHost", data["ip"]);
      dispatch("openFolder", { item: { name: "/home" }, navigation: false });
    },
    async openFolder({ getters, commit }, params) {
      let { item, navigate } = params;
      let path =
        ((!this.currentPath || !navigate) && `${item.name}`) ||
        `${this.currentPath}/${item.name}`;

      const data = {
        path: path,
        host: getters["getHost"]
      };

      try {
        const response = await this._vm.$http({
          method: "post",
          url: `/api/v1/list/files`,
          data: data
        });
        commit("setFolderItems", response.data.data);
        commit("setCurrentPath", path);
      } catch (error) {
        console.log(error);
      }
    }
  }
});
