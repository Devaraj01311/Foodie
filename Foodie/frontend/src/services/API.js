import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:6001/api",
});

export default API;
