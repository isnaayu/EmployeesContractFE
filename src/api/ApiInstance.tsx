import axios from "axios";

const ApiInstance = axios.create({
  baseURL:"https://localhost:44396/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default ApiInstance;