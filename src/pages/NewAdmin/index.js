import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Form, Input } from "@rocketseat/unform";
import api from "../../services/api";
import { Container, LoaderDiv } from "./styles";
import Footer from "../../components/Footer";
import Loader from "react-loader-spinner";
import { toast } from "react-toastify";
import { MdSearch, MdCheckCircle, MdRemoveCircle } from "react-icons/md";
import {
  unMaskCpf,
  maskDocument,
  maskResponseDocument
} from "../../_util/masks";

export default function UpdateTransactions() {
  const token = useSelector(state => state.auth.token);
  const [doc, setDoc] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  async function handleSearch({ cnpj_cpf }) {
    if (cnpj_cpf === "") return;
    setDoc("");
    setLoading(true);
    try {
      const response = await api.get(`/profiles/${unMaskCpf(cnpj_cpf)}`, {
        params: { token }
      });
      setUsers([response.data]);
      setLoading(false);
    } catch (err) {
      toast.error(`${err.response.data.error.message}.`);
      setLoading(false);
      setDoc("");
      setUsers([]);
      return;
    }
  }

  async function handleSubmit(id) {
    try {
      const response = await api.put(`/profiles/${id}`, { token, admin: true });
      toast.success(`${response.data.nomecompleto} agora é um administrador!`);
      setUsers([]);
    } catch (err) {
      toast.error("Sessão inválida, faça login na aplicação novamente.");
    }
  }

  async function handleCancel(id) {
    try {
      const response = await api.put(`/profiles/${id}`, {
        token,
        admin: false
      });
      toast.error(`${response.data.nomecompleto} não é mais um administrador.`);
      setUsers([]);
    } catch (err) {
      toast.error("Sessão inválida, faça login na aplicação novamente.");
    }
  }

  return (
    <Container>
      <h2>Eleger administrador</h2>
      <Form onSubmit={handleSearch}>
        <header>
          <Input
            name="cnpj_cpf"
            placeholder="Digite o CPF ou CNPJ do usuário"
            value={doc}
            onChange={e => setDoc(maskDocument(e.target.value))}
          />
          <button type="submit">
            <MdSearch color="#555" size={25} />
          </button>
        </header>
      </Form>
      {loading ? (
        <LoaderDiv>
          <Loader type="Oval" color="#6F6FFF" width={35} height={35} />
        </LoaderDiv>
      ) : (
        <ul>
          {users.map(item => (
            <li key={item.id}>
              <strong>{item.user.username}</strong>
              <span>{maskResponseDocument(item.cnpj_cpf)}</span>
              <div>
                <strong>
                  Deseja conceder ou remover direitos de administrador?
                </strong>
                <header>
                  <button onClick={() => handleCancel(item.id)}>
                    <MdRemoveCircle
                      color="#fff"
                      size={50}
                      style={{ paddingBottom: "5px" }}
                    />
                    Remover direitos
                  </button>
                  <button type="submit" onClick={() => handleSubmit(item.id)}>
                    <MdCheckCircle
                      color="#fff"
                      size={50}
                      style={{ paddingBottom: "5px" }}
                    />
                    Conceder direitos
                  </button>
                </header>
              </div>
            </li>
          ))}
        </ul>
      )}
      <Footer />
    </Container>
  );
}
