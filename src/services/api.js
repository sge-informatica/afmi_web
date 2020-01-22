import axios from "axios";

const api = axios.create({
  baseURL: "https://api.sgeinformatica.com.br/afmi"
});

export const redirect_url = "https://api.sgeinformatica.com.br/afmi/passwords";
export default api;
