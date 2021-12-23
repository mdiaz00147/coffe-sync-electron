<template>
  <v-navigation-drawer
    permanent
    app
    dark
    fixed
    class="blue-grey darken-3 pt-14"
  >
    <v-divider></v-divider>
    <v-btn
      x-small
      rounded
      @click="editMode = !editMode"
      class="float-right mr-3 mt-3 blue-grey--text text--lighten-2"
    >
      {{ (editMode && "CANCEL") || "EDIT" }}
    </v-btn>
    <v-list dense rounded class="mt-10">
      <v-list-item
        v-for="(item, i) in serverItems"
        :class="{ 'blue-grey darken-4': currentHost === item.host }"
        :key="i"
        @click="!editMode && selectHost(item)"
      >
        <v-list-item-icon class="mt-3 ml-3">
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.name }}</v-list-item-title>
          <small class="blue-grey--text text--lighten-2">{{ item.host }}</small>
        </v-list-item-content>

        <v-btn
          @click.prevent="destroyHost(item)"
          v-if="editMode"
          x-small
          icon
          color="red lighten-1"
          fab
        >
          <v-icon> mdi-trash-can-outline </v-icon>
        </v-btn>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>

    <v-list dense>
      <v-list-item
        v-for="(item, i) in menuItems"
        :key="i"
        @click="selectRoute(item)"
      >
        <v-list-item-icon class="ml-3">
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.name }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "left-menu",
  data() {
    return {
      editMode: false,
      menuItems: [
        {
          name: "Add Server",
          icon: "mdi-plus",
          to: { name: "ServersAdd" }
        }
      ]
    };
  },

  methods: {
    destroyHost(item) {
      let original = new Set(this.serverItems);
      original.delete(item);
      let modified = Array.from(original);
      this.$store.commit("setServersList", modified);
    },
    selectHost(item) {
      if (this.$router.history.current.name !== "Home") {
        this.$router.push({ name: "Home" });
      }
      this.$store.dispatch("changeHost", item);
    },
    selectRoute(item) {
      this.$router.push(item.to);
    }
  },
  computed: {
    ...mapGetters({
      currentHost: "getHost",
      serverItems: "getServersList"
    })
  }
};
</script>
