import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { Form, Input } from "@rocketseat/unform";
import logo from "../../assets/logo.png";
import * as Yup from "yup";
import api, { redirect_url } from "../../services/api";
import Loader from "react-loader-spinner";
import { toast } from "react-toastify";

const schema = Yup.object().shape({
  email: Yup.string()
    .email("O e-mail não é válido.")
    .required("O e-mail é obrigatório.")
});

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit({ email }) {
    setLoading(true);
    try {
      await api.post("/passwords", {
        email,
        redirect_url
      });
      toast.success(`Código de alteração de senha foi enviado para ${email}.`);
      setLoading(false);
      setRedirect(true);
      setEmail("");
    } catch (err) {
      err.response.data.map(item => toast.error(item.message));
      setLoading(false);
      setEmail("");
    }
  }

  return (
    <>
      {redirect ? <Redirect to="/recover-password" /> : null}
      <img src={logo} alt="SgeApp" />
      <Form schema={schema} onSubmit={handleSubmit}>
        <Input
          name="email"
          type="email"
          placeholder="Digite seu e-mail"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <button type="submit">
          {loading ? (
            <Loader type="Oval" color="#FFF" width={30} height={30} />
          ) : (
            "Enviar e-mail"
          )}
        </button>
        <Link to="/">Já possuo conta</Link>
      </Form>
    </>
  );
}
