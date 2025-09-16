import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://boasorte.teddybackoffice.com.br/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
