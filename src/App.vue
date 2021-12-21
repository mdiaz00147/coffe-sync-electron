<template>
  <v-app>
    <LeftMenu />
    <TopMenu />

    <v-main>
      <v-container fluid >
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<style lang="scss" scoped>
.top-bar {
  -webkit-user-select: none;
  -webkit-app-region: drag;
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
