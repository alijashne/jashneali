import axios from "axios";

const HOST = "https://astropuraan.apponward.com/";
const version = "v1/api/";

const API = HOST + version;

const instance = axios.create({
  baseURL: API,
});

export default instance;
