<template>
  <v-app-bar
    @dblclick="doubleClick"
    app
    color="light-green darken-4"
    dark
    class="top-bar"
  >
    <v-spacer></v-spacer>

    <v-btn
      href="https://github.com/vuetifyjs/vuetify/releases/latest"
      target="_blank"
      text
    >
      <span class="mr-2">Latest Releaese</span>
      <v-icon>mdi-open-in-new</v-icon>
    </v-btn>

    <div class="d-flex align-center">
      <v-img
        class="shrink mr-2"
        contain
        src="./../../assets/black_logo.png"
        transition="scale-transition"
        width="40"
      />
    </div>
  </v-app-bar>
</template>

<script>
export default {
  methods: {
    doubleClick() {
      this.$ipcRenderer.send("resizeWindow");
    }
  }
};
</script>
