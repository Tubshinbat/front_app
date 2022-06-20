import axios from "axios";

const instance = axios.create({
  baseURL: "https://admin.khuduugaray.com/rest/api/v1/",
});

instance.defaults.withCredentials = true;

export default instance;
