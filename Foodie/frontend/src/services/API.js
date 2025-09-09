import axios from "axios";

const API = axios.create({
  baseURL: "https://foodie-0.onrender.com",
});

export default API;
