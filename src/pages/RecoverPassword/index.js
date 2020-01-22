import React, { useState } from "react";
import { Form, Input } from "@rocketseat/unform";
import { Link, Redirect } from "react-router-dom";
import logo from "../../assets/logo.png";
import * as Yup from "yup";
import api from "../../services/api";
import { toast } from "react-toastify";
import Loader from "react-loader-spinner";
import { recoverPassword } from "../../_util/errors";

const schema = Yup.object().shape({
  token: Yup.string().required("O código é obrigatório."),
  password: Yup.string().required("A senha é obrigatória."),
  password_confirmation: Yup.string().required(
    "A confirmação de senha é obrigatória."
  )
});

export default function RecoverPassword() {
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit({ token, password, password_confirmation }) {
    setLoading(true);
    try {
      const response = await api.put("/passwords", {
        token,
        password,
        password_confirmation
      });
      setLoading(false);
      toast.success(`${response.data.ok}.`);
      setRedirect(true);
    } catch (err) {
      const error = err.response.data;
      recoverPassword(error);
      setLoading(false);
    }
  }

  return (
    <>
      {redirect ? <Redirect to="/" /> : null}
      <img src={logo} alt="SgeApp" />
      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="token" placeholder="Digite o código enviado no e-mail" />
        <Input name="password" type="password" placeholder="Sua senha" />
        <Input
          name="password_confirmation"
          type="password"
          placeholder="Confirmação de senha"
        />
        <button type="submit">
          {loading ? (
            <Loader type="Oval" color="#FFF" width={30} height={30} />
          ) : (
            "Recuperar senha"
          )}
        </button>
        <Link to="/">Já possuo conta</Link>
      </Form>
    </>
  );
}
