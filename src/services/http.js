import axios from "axios";

export const HTTP = axios.create({
  baseURL: process.env.VUE_APP_ROOT_API
});
