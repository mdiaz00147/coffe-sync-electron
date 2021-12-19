import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import VueRouter from "vue-router";

import { HTTP } from "@/services/http";
import { store } from "./store";

Vue.config.productionTip = false;
Vue.prototype.$http = HTTP;

Vue.use(VueRouter);

new Vue({
  vuetify,
  store,
  render: (h) => h(App)
}).$mount("#app");
