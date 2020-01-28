import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Form, Input } from "@rocketseat/unform";
import * as Yup from "yup";
import { Container, Wrapper } from "./styles";
import Footer from "../../components/Footer";
import api from "../../services/api";
import { maskDocument, maskDate } from "../../_util/masks";
import { toast } from "react-toastify";

const schema = Yup.object().shape({
  nomecompleto: Yup.string().required("Nome completo é obrigatório."),
  cnpj_cpf: Yup.string().required("O documento é obrigatório."),
  matricula: Yup.string().required("A matrícula é obrigatória."),
  birthdate: Yup.string().required("A data de nascimento é obrigatória.")
});

export default function NewProfile() {
  const token = useSelector(state => state.auth.token);
  const [check, setCheck] = useState(false);
  const [doc, setDoc] = useState("");
  const [date, setDate] = useState("");

  async function handleSubmit({
    nomecompleto,
    cnpj_cpf,
    matricula,
    birthdate
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
    try {
      check === true
        ? await api.post("/profiles", {
            token,
            nomecompleto,
            cnpj_cpf,
            matricula,
            datanascimento,
            admin: true
          })
        : await api.post("/profiles", {
            token,
            nomecompleto,
            cnpj_cpf,
            matricula,
            datanascimento
          });
      toast.success("Novo usuário cadastrado com sucesso! 😁");
    } catch (err) {
      toast.error("O CPF/CNPJ já foi usado por outra pessoa. 🙁");
    }
  }

  return (
    <Wrapper>
      <Container>
        <h2>Incluir novo perfil</h2>
        <Form schema={schema} onSubmit={handleSubmit}>
          <Input name="nomecompleto" placeholder="Nome completo" />
          <Input
            name="cnpj_cpf"
            placeholder="CNPJ/CPF"
            value={doc}
            onChange={e => setDoc(maskDocument(e.target.value))}
          />
          <Input name="matricula" placeholder="Digite a matrícula" />
          <Input
            name="birthdate"
            placeholder="Data de nascimento"
            value={date}
            onChange={e => setDate(maskDate(e.target.value))}
          />
          <p>
            Usuário administrador
            <input
              type="checkbox"
              checked={check}
              onChange={() => setCheck(!check)}
            />
          </p>

          <button type="submit">Criar usuário</button>
        </Form>
      </Container>
      <Footer />
    </Wrapper>
  );
}
