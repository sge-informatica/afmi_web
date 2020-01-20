import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Form, Input } from "@rocketseat/unform";
import logo from "../../assets/logo.png";
import { signUpRequest } from "../../store/modules/auth/actions";
import Loader from "react-loader-spinner";
import { maskDocument, maskDate } from "../../_util/masks";

export default function SignUp() {
  const loading = useSelector(state => state.auth.loading);
  const [doc, setDoc] = useState("");
  const [date, setDate] = useState("");
  const dispatch = useDispatch();

  function handleSubmit({
    username,
    email,
    cnpj_cpf,
    matricula,
    birthdate,
    password,
    password_confirmation
  }) {
    cnpj_cpf = cnpj_cpf
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d{1,2})/, "$1$2")
      .replace(/(\d{3})(\d{1,2})/, "$1$2")
      .replace(/(\d{4})(\d{1,2})/, "$1$2");

    birthdate = birthdate
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d{1,2})/, "$1-$2")
      .replace(/(\d{2})(\d{1,2})/, "$1-$2")
      .replace(/(\d{2})(\d{1,2})/, "$1$2");

    const year = birthdate.substring(6, 10);
    const month = birthdate.substring(3, 5);
    const day = birthdate.substring(0, 2);
    const datanascimento = `${year}-${month}-${day}`;

    dispatch(
      signUpRequest(
        username,
        email,
        cnpj_cpf,
        matricula,
        datanascimento,
        password,
        password_confirmation
      )
    );
  }

  return (
    <>
      <img src={logo} alt="SgeApp" />

      <Form onSubmit={handleSubmit}>
        <Input name="username" placeholder="Nome completo" />
        <Input name="email" type="email" placeholder="Seu e-mail" />
        <Input
          name="cnpj_cpf"
          placeholder="Seu CPF ou CNPJ"
          value={doc}
          onChange={e => setDoc(maskDocument(e.target.value))}
        />
        <Input name="matricula" placeholder="Sua matrícula" />
        <Input
          name="birthdate"
          placeholder="Data de nascimento"
          value={date}
          onChange={e => setDate(maskDate(e.target.value))}
        />
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
            "Criar conta"
          )}
        </button>
        <Link to="/">Já possuo conta</Link>
      </Form>
    </>
  );
}
