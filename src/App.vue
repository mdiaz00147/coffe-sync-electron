<template>
  <v-app>
    <LeftMenu />
    <TopMenu />

    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<style lang="scss">
.top-bar {
  -webkit-user-select: none;
  -webkit-app-region: drag;
}

.h-100 {
  height: 100% !important;
}
.w-100 {
  width: 100% !important;
}
</style>

<script>
import LeftMenu from "./components/LeftMenu";
import TopMenu from "./components/TopMenu";

export default {
  name: "App",

  components: {
    LeftMenu,
    TopMenu
  }
};
</script>
