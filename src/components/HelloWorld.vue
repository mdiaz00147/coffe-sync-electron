<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-btn color="success" @click="fetchData()"> List Files </v-btn>
      </v-col>
      <v-col cols="12"> </v-col>

      <v-col cols="12">
        <v-breadcrumbs
          divider="/"
          :items="breadItems"
          class="pl-0"
        ></v-breadcrumbs>

        <v-simple-table>
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
                    @click="openFolder(item, true)"
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
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      items: Array
    };
  },
  computed: {
    ...mapGetters({ currentPath: "getCurrentPath" }),
    breadItems() {
      return this.currentPath.split("/").map((e) => {
        return {
          text: e,
          href: "",
          disabled: false
        };
      });
    }
  },
  methods: {
    async fetchData() {
      this.openFolder({ name: "/home" }, false);
    },
    async download(item) {
      const data = {
        fileName: item["name"],
        path: this.currentPath
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
    },
    async openFolder(item, navigate) {
      let path =
        ((!this.currentPath || !navigate) && `${item.name}`) ||
        `${this.currentPath}/${item.name}`;

      try {
        const response = await this.$http({
          method: "post",
          url: `/api/v1/list/files`,
          data: {
            path
          }
        });
        this.items = response.data.data;
        this.$store.commit("setCurrentPath", path);
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>
