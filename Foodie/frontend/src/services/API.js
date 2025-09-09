import axios from "axios";

const API = axios.create({
  baseURL: "https://foodie-0b.onrender.com//api",
});

export default API;
