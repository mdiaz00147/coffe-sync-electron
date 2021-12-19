<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-btn color="success" @click="fetchData()"> List Files </v-btn>
      </v-col>
      <v-col cols="12">
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Name</th>
                <th class="text-left">Calories</th>
                <th class="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in items" :key="item.name">
                <td class="text-left">
                  <span @click="openFolder(item)" class="info--text">
                    {{ item.name }}
                  </span>
                </td>
                <td class="text-left">{{ item.calories }}</td>
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
export default {
  data() {
    return {
      items: Array
    };
  },
  methods: {
    async fetchData() {
      try {
        const response = await this.$http({
          url: "/api/v1/files"
        });
        this.items = response.data.data;
      } catch (error) {
        console.log(error);
      }
    },
    async download(item) {
      const data = {
        fileName: item["name"]
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
    async openFolder(item) {
      try {
        const response = await this.$http({
          url: `/api/v1/folders/${item.name}`
        });
        this.items = response.data.data;
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>
