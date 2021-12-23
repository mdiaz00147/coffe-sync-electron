<template>
  <v-row>
    <v-col cols="12">
      <h2>Add Server</h2>
      <v-form ref="form" @submit.prevent="submit">
        <v-text-field
          v-model="item.name"
          :rules="nameRules"
          label="Label"
          required
        ></v-text-field
        ><v-text-field
          v-model="item.username"
          :rules="usernameRules"
          label="Username"
          required
        ></v-text-field>

        <v-text-field
          v-model="item.host"
          :rules="hostRules"
          label="Host IP"
          required
        ></v-text-field>

        <v-text-field
          type="number"
          v-model="item.port"
          :rules="[(v) => !!v || 'Item is required']"
          label="Port"
          required
        ></v-text-field>

        <v-btn type="submit" :disabled="!valid" color="success" class="mr-4">
          Submit
        </v-btn>

        <v-btn color="warning" class="mr-4" @click.prevent="resetServers">
          Reset Servers
        </v-btn>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      item: { name: "", host: "", port: 22, username: "", icon: "mdi-server" },
      valid: true,
      nameRules: [
        (v) => !!v || "Name is required",
        (v) => (v && v.length <= 20) || "Name must be less than 20 characters"
      ],
      usernameRules: [(v) => !!v || "Username is required"],
      hostRules: [(v) => !!v || "Host is required"]
    };
  },
  computed: {
    ...mapGetters({
      serversLists: "getServersList"
    })
  },
  watch: {
    "item.username": function (newVal, lastVal) {
      this.item.username = newVal.split(" ").join("");
    },
    "item.host": function (newVal, lastVal) {
      this.item.host = newVal.split(" ").join("");
    }
  },
  methods: {
    submit() {
      this.$store.commit("setServersList", [...this.serversLists, this.item]);
    },
    resetServers() {
      this.$store.commit("setServersList", []);
    }
  }
};
</script>
