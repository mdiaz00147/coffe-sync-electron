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
    folderItems: [],
    host: "",
    hostPort: "",
    hostUsername: "",
    loading: false,
    serversList: []
  },
  mutations: {
    setCurrentPath(state, value) {
      state.currentPath = value;
    },
    setFolderItems(state, value) {
      state.folderItems = value;
    },
    setHost(state, value) {
      state.host = value;
    },
    setHostPort(state, vaue) {
      state.hostPort = vaue;
    },
    setHostUsername(state, vaue) {
      state.hostUsername = vaue;
    },
    setLoading(state, value) {
      state.loading = value;
    },
    setServersList(state, value) {
      state.serversList = value;
    }
  },
  getters: {
    getCurrentPath: (state) => state.currentPath,
    getFolderItems: (state) => state.folderItems,
    getHost: (state) => state.host,
    getHostPort: (state) => state.hostPort,
    getHostUsername: (state) => state.hostUsername,
    getLoading: (state) => state.loading,
    getServersList: (state) => state.serversList
  },
  actions: {
    async changeHost({ commit, dispatch }, data) {
      await commit("setHost", data["host"]);
      await commit("setHostPort", data["port"]);
      await commit("setHostUsername", data["username"]);
      dispatch("openFolder", { item: { name: "/" }, navigate: false });
    },
    async openFolder({ getters, commit }, args) {
      commit("setFolderItems", []);
      commit("setLoading", true);
      let { item, navigate } = args;

      let path =
        ((!getters["getCurrentPath"] || !navigate) && `${item.name}`) ||
        (getters["getCurrentPath"] === "/" && `/${item.name}`) ||
        `${getters["getCurrentPath"]}/${item.name}`;

      console.log("DEGUG-item::", item);
      const data = {
        path: path,
        host: getters["getHost"],
        username: getters["getHostUsername"],
        port: getters["getHostPort"]
      };

      try {
        const response = await this._vm.$http({
          method: "post",
          url: `/api/v1/list/files`,
          data: data
        });
        commit("setFolderItems", response.data.data);
        commit("setCurrentPath", path);
        commit("setLoading", false);
      } catch (error) {
        commit("setLoading", false);
        console.log(error);
      }
    }
  }
});
