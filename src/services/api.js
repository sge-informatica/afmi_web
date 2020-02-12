import axios from "axios";

const api = axios.create({
  baseURL: "https://api.sgeinformatica.com.br/afmi"
});

export const redirect_url = () =>
  process.env.NODE_ENV === "development"
    ? "https://afmi-convenios.netlify.com/recover-password"
    : "https://api.sgeinformatica.com.br/afmi/passwords";

export default api;
