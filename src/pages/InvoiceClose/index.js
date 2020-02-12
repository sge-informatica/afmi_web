import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { Form, Input } from "@rocketseat/unform";
import * as Yup from "yup";
import Footer from "../../components/Footer";
import api from "../../services/api";
import { Wrapper, Container } from "./styles";
import { checkUpdateProfile } from "../../_util/errors";
import Loader from "react-loader-spinner";
import { toast } from "react-toastify";

const schema = Yup.object().shape({
  description: Yup.string().required("A descrição é obrigatória.")
});

export default function InvoiceClose() {
  const token = useSelector(state => state.auth.token);
  const admin = useSelector(state => state.user.profile.profile.admin);
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit({ description }) {
    setLoading(true);
    try {
      await api.post("/invoices", {
        token,
        description
      });
      toast.success("Fatura fechada com sucesso! 😁");
      setValue("");
      setLoading(false);
    } catch (err) {
      const error = err.response.data;
      checkUpdateProfile(error);
      setLoading(false);
    }
  }

  return (
    <Wrapper>
      {!admin ? <Redirect to="/dashboard" /> : null}
      <Container>
        <h2>Fechar fatura</h2>
        <Form schema={schema} onSubmit={handleSubmit}>
          <Input
            name="description"
            placeholder="Digite a descrição"
            value={value}
            onChange={e => setValue(e.target.value)}
          />

          <button type="submit">
            {loading ? (
              <Loader type="Oval" color="#FFF" width={30} height={30} />
            ) : (
              "Fechar fatura"
            )}
          </button>
        </Form>
      </Container>
      <Footer />
    </Wrapper>
  );
}
