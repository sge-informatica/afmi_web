import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Form, Input } from "@rocketseat/unform";
import { Container, LoaderDiv } from "./styles";
import Footer from "../../components/Footer";
import Loader from "react-loader-spinner";
import api from "../../services/api";
import { MdSearch, MdCheckCircle, MdCancel } from "react-icons/md";
import {
  maskCPFOnly,
  maskValue,
  unMaskCpf,
  unMaskValue,
  maskResponseValue
} from "../../_util/masks";
import { toast } from "react-toastify";

export default function Sell() {
  const token = useSelector(state => state.auth.token);
  const [doc, setDoc] = useState("");
  const [value, setValue] = useState("");
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
      setLoading(false);
      setUsers([response.data]);
    } catch (err) {
      toast.error("Usuário não encontrado, verifique os dados. 🙁");
      setLoading(false);
      setDoc("");
      setUsers([]);
      return;
    }
  }

  async function handleSubmit(value) {
    if (value === "") return;
    setLoading(true);
    const valor = unMaskValue(value);
    const int = users.map(item => item.user.id);
    const user_id = parseInt(int);
    const cnpj_cpf = users.map(item => item.cnpj_cpf);
    try {
      await api.post("/transactions", {
        token,
        valor,
        user_id
      });
      const response = await api.get(`/profiles/${cnpj_cpf}`, {
        params: { token }
      });
      toast.success("Transação realizada com sucesso! 😁");
      setValue("");
      setUsers([response.data]);
      setLoading(false);
    } catch (err) {
      toast.error(`Transação inválida, saldo insuficiente. 🙁`);
      setValue("");
      setLoading(false);
    }
  }

  function handleCancel() {
    setUsers([]);
  }

  return (
    <Container>
      <h2>Vender</h2>
      <Form onSubmit={handleSearch}>
        <header>
          <Input
            name="cnpj_cpf"
            placeholder="Digite o CPF do cliente"
            value={doc}
            onChange={e => setDoc(maskCPFOnly(e.target.value))}
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
              <span>{maskCPFOnly(item.cnpj_cpf)}</span>
              <h2
                style={
                  item.user.saldo === "0.00"
                    ? { color: "#f64c75" }
                    : { color: "#eee" }
                }
              >
                Saldo {maskResponseValue(item.user.saldo)}
              </h2>
              <div>
                <Input
                  name="valor"
                  placeholder="Digite o valor da venda"
                  value={value}
                  onChange={e => setValue(maskValue(e.target.value))}
                />
                <header>
                  <button onClick={() => handleCancel()}>
                    <MdCancel
                      color="#fff"
                      size={50}
                      style={{ paddingBottom: "5px" }}
                    />
                    Cancelar
                  </button>
                  <button type="submit" onClick={() => handleSubmit(value)}>
                    <MdCheckCircle
                      color="#fff"
                      size={50}
                      style={{ paddingBottom: "5px" }}
                    />
                    Vender
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
