import Vue from "vue";
import { ipcRenderer } from "electron";
import VueRouter from "vue-router";

import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import { HTTP } from "@/services/http";
import { store } from "./store";
import router from "./router/index";

Vue.prototype.$ipcRenderer = ipcRenderer;
Vue.config.productionTip = false;
Vue.prototype.$http = HTTP;

Vue.use(VueRouter);

new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App)
}).$mount("#app");
