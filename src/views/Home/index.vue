<template>
  <v-row>
    <v-col cols="12">
      <v-breadcrumbs divider="/" :items="breadItems" class="pl-0">
        <template v-slot:item="{ item }">
          <v-breadcrumbs-item
            @click="openFolder(item, false, true)"
            :href="item.href"
            :disabled="item.disabled"
          >
            {{ item.text }}
          </v-breadcrumbs-item>
        </template>
      </v-breadcrumbs>

      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
        class="mx-1"
      ></v-text-field>

      <v-data-table
        class="mt-4"
        :headers="headers"
        :items="items"
        :search="search"
        dense
        :loading="loading"
      >
        <template v-slot:item.name="{ item }">
          <a
            @click="openFolder(item, true, false)"
            class="info--text text-decoration-none"
            href="#"
          >
            {{ item.name }}
          </a>
        </template>

        <template v-slot:item.actions="{ item }">
          <v-btn
            small
            icon
            color="warning"
            elevation=""
            fab
            @click="download(item)"
          >
            <v-icon> mdi-cloud-download </v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      search: "",
      headers: [
        {
          text: "Name",
          align: "start",
          sortable: false,
          value: "name"
        },
        { text: "Size", value: "size" },
        { text: "Actions", value: "actions", align: "end" }
      ]
    };
  },
  computed: {
    ...mapGetters({
      items: "getFolderItems",
      currentPath: "getCurrentPath",
      host: "getHost",
      port: "getHostPort",
      username: "getHostUsername",
      loading: "getLoading"
    }),
    breadItems() {
      return this.currentPath.split("/").map((e) => {
        return {
          text: e,
          href: "#"
        };
      });
    }
  },
  methods: {
    openFolder(item, navigate, navigateBackWard = false) {
      if (navigateBackWard) {
        let path = this.currentPath.split("/");
        let name = path
          .filter((e, i) => i <= path.indexOf(item.text))
          .join("/");
        item["name"] = name;
      }

      this.$store.dispatch("openFolder", { item, navigate });
    },
    async download(item) {
      const data = {
        fileName: item["name"],
        path: this.currentPath,
        host: this.host,
        port: this.port,
        username: this.username
      };

      try {
        const response = await this.$http({
          method: "post",
          url: "/api/v1/downloads/files",
          data: data
        });
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>
