<template>
  <v-app-bar
    @dblclick="doubleClick"
    app
    color="light-green darken-4"
    dark
    class="top-bar"
  >
    <v-btn text>
      <span class="mr-2">Settings</span>
      <v-icon small>mdi-cog</v-icon>
    </v-btn>

    <v-spacer></v-spacer>

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
  created() {
    this.$ipcRenderer.on("download-status", (data) => {
      console.log(data);
    });
  },
  methods: {
    doubleClick() {
      this.$ipcRenderer.send("resizeWindow");
    }
  }
};
</script>
