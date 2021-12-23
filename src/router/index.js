import Vue from "vue";
import Router from "vue-router";
import { store } from "@/store";
import { HTTP } from "@/services/http";
// import { serverBus } from "@/main";

// import DashboardLayout from "@/layout/DashboardLayout.vue";
import DefaultRouterContainer from "@/layout/DefaultRouterContainer.vue";
// GeneralViews
// import AuthLayout from "@/layout/AuthLayout";

// Admin pages
import Home from "@/views/Home";
import ServersAdd from "@/views/Servers/Add";

// auth
// const Login = () => import("@/pages/Auth/Login");
// const Register = () => import("@/pages/Auth/Register");
// const Forgot = () => import("@/pages/Auth/Forgot");

Vue.use(Router);

const router = new Router({
  mode: "hash", // https://router.vuejs.org/api/#mode
  scrollBehavior: () => ({ y: 0 }),

  routes: [
    {
      name: "Home",
      path: "/",
      component: Home
    },
    {
      name: "ServersAdd",
      path: "/",
      component: ServersAdd
    },
    {
      path: "*",
      redirect: "login"
    }
  ]
});

// router.afterEach(async to => {
//   if (to.meta.requiresAuth) {
//     store.dispatch("getUser");
//   }
// });

// router.beforeEach(async (to, from, next) => {
//   if (to.meta.requiresAuth) {
//     if (!store.getters.authToken) {
//       // return to login screen if not token found
//       return next({ path: "/login" });
//     } else {
//       if (
//         to.meta.profileValidationRequired &&
//         !store.getters.currentUser.temp_user &&
//         !store.getters.currentUser.fxwinning_account_number
//       ) {
//         serverBus.$emit(
//           "globalNotification",
//           "Please Fill Out All The Required Fields"
//         );
//         return next({ path: "/profile" });
//       } else {
//         // ping server to check if session is still valid
//         try {
//           await HTTP({
//             url: "/api/v1/client/sessions/user",
//             method: "get",
//             headers: {
//               "content-type": "application/json",
//               Authorization: store.getters.authToken
//             }
//           });
//         } catch (err) {
//           serverBus.$emit("globalNotification", "Your Session Has Expired!");
//           if (err) next({ path: "/login" });
//         }
//       }
//       return await next();
//     }
//   } else {
//     return next();
//   }
// });

export default router;
