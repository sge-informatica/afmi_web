import axios from "axios";

const api = axios.create({
  baseURL: "https://api.sgeinformatica.com.br/afmi"
});

export const redirect_url = () =>
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/recover-password"
    : "https://afmi-convenios.netlify.com/recover-password";

export default api;
