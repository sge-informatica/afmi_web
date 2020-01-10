import axios from "axios";

const api = axios.create({
  baseURL: "https://api.sgeinformatica.com.br/afmi"
});

export default api;
