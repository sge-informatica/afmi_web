import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Wrapper, Container } from "./styles";
import { Form, Input } from "@rocketseat/unform";
import * as Yup from "yup";
import api from "../../services/api";
import { toast } from "react-toastify";
import { maskDocument, maskDate } from "../../_util/masks";

const schema = Yup.object().shape({
  username: Yup.string().required("O nome é obrigatório."),
  matricula: Yup.string().required("A matrícula é obrigatória."),
  cnpj_cpf: Yup.string().required("O documento é obrigatório."),
  birthdate: Yup.string().required("A data de nascimento é obrigatória.")
});

export default function NewAdmin() {
  const token = useSelector(state => state.auth.token);
  const [doc, setDoc] = useState("");
  const [date, setDate] = useState("");

  async function handleSubmit({ username, matricula, cnpj_cpf, birthdate }) {
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
    try {
      const response = await api.post("/profiles", {
        token,
        username,
        matricula,
        cnpj_cpf,
        datanascimento,
        admin: true
      });
      console.tron.log(response.data);
    } catch (err) {
      toast.error(
        "Acesso restrito, apenas administradores podem acessar esta rota."
      );
    }
  }

  return (
    <Wrapper>
      <Container>
        <Form schema={schema} onSubmit={handleSubmit}>
          <h2>Alterar perfil para administrador</h2>
          <Input name="username" placeholder="Nome completo" />
          <Input name="matricula" placeholder="Digite a matrícula" />
          <Input
            value={doc}
            onChange={e => setDoc(maskDocument(e.target.value))}
            name="cnpj_cpf"
            placeholder="CPF/CNPJ"
          />
          <Input
            value={date}
            onChange={e => setDate(maskDate(e.target.value))}
            name="birthdate"
            placeholder="Data de nascimento"
          />
          <button type="submit">Enviar</button>
        </Form>
      </Container>
    </Wrapper>
  );
}
