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

      <v-skeleton-loader
        class="mx-auto"
        type="table-heading, table-tbody"
        v-if="loading"
      ></v-skeleton-loader>

      <v-simple-table v-else>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Name</th>
              <th class="text-left">Size</th>
              <th class="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in items" :key="item.name">
              <td class="text-left">
                <a
                  @click="openFolder(item, true, false)"
                  class="info--text text-decoration-none"
                  href="#"
                >
                  {{ item.name }}
                </a>
              </td>
              <td class="text-left">{{ item.size }}</td>
              <td class="text-right">
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
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {};
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
