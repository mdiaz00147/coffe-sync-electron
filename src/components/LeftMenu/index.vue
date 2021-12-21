<template>
  <v-navigation-drawer
    permanent
    absolute
    app
    dark
    class="blue-grey darken-3 pt-14"
  >
    <v-list dense rounded>
      <v-list-item
        v-for="item in items"
        :key="item.title"
        link
        @click="buildHost(item)"
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "left-menu",
  data() {
    return {
      items: [
        { title: "Server 2", icon: "mdi-view-dashboard", ip: "80.82.76.235" },
        { title: "Server 3", icon: "mdi-forum", ip: "104.207.133.53" },
        { title: "Server 4", icon: "mdi-forum", ip: "155.138.234.231" }
      ]
    };
  },
  methods: {
    buildHost(item) {
      this.$store.dispatch("changeHost", item);
    }
  }
};
</script>
