import React, { useState } from "react";
import { useSelector } from "react-redux";
import api from "../../services/api";
import { Form, Input } from "@rocketseat/unform";
import {
  maskResponseDocument,
  maskResponseValue,
  maskValue,
  unMaskValue
} from "../../_util/masks";
import { formatDate } from "../../_util/formatDate";
import Footer from "../../components/Footer";
import {
  Wrapper,
  LoaderDiv,
  Article,
  Paginate,
  Page,
  LoaderDivDialog
} from "./styles";
import { Container, Row, Col } from "react-grid-system";
import { MdSearch, MdLoop } from "react-icons/md";
import Loader from "react-loader-spinner";
import { toast } from "react-toastify";

export default function BalanceAdjust() {
  const token = useSelector(state => state.auth.token);
  const [name, setName] = useState("");
  const [users, setUsers] = useState([]);
  let [pages, setPages] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [id, setId] = useState("");
  const [client, setClient] = useState("");
  const [balance, setBalance] = useState("");
  const [newBalance, setNewBalance] = useState("");
  const [type, setType] = useState("Crédito");

  async function handleSearch({ name }) {
    if (name === "") return;
    setLoading(true);
    setConfirm(false);
    try {
      const response = await api.get(`/profiles?&name=${name}`, {
        params: { token }
      });
      setUsers(response.data.data);
      setPages(response.data.page);
      setLastPage(response.data.lastPage);
      response.data.data.length
        ? setShow(true)
        : toast.error("Nenhum usuário foi encontrado. 🙁") && setShow(false);
      setLoading(false);
    } catch (err) {
      toast.error("Sessão inválida, faça login na aplicação novamente. 🙁");
      setName("");
      setUsers();
      setShow(false);
      setLoading(false);
      return;
    }
  }

  async function nextPage() {
    if (pages === lastPage) return;
    setLoading(true);
    pages += 1;
    try {
      const response = await api.get(`/profiles?page=${pages}&name=${name}`, {
        params: { token }
      });
      setUsers(response.data.data);
      setPages(pages);
      setLoading(false);
    } catch (err) {
      toast.error("Sessão inválida, faça login na aplicação novamente. 🙁");
      setLoading(false);
    }
  }

  async function prevPage() {
    if (pages === 1) return;
    setLoading(true);
    pages -= 1;
    try {
      const response = await api.get(`/profiles?page=${pages}&name=${name}`, {
        params: { token }
      });
      setUsers(response.data.data);
      setPages(pages);
      setLoading(false);
    } catch (err) {
      toast.error("Sessão inválida, faça login na aplicação novamente. 🙁");
      setLoading(false);
    }
  }

  function Dialog(id, client, balance) {
    setNewBalance("");
    setId(id);
    setType("Crédito");
    setConfirm(true);
    setClient(client);
    setBalance(maskResponseValue(balance));
    document.onkeydown = function(e) {
      if (e.keyCode === 27) {
        setConfirm(false);
        setNewBalance("");
      }
    };
  }

  async function handleBalance(user_id, value, type) {
    if (newBalance === "") return;
    setConfirmLoading(true);
    const valor = unMaskValue(value);
    let DC;
    type === "Crédito" ? (DC = "C") : (DC = "D");
    try {
      await api.post(`/transactions`, {
        token,
        user_id,
        valor,
        DC
      });
      setLoading(true);
      setNewBalance("");
      setConfirmLoading(false);
      setConfirm(false);
      const response = await api.get(`/profiles?page=${pages}&name=${name}`, {
        params: { token }
      });
      setUsers(response.data.data);
      setPages(pages);
      setLoading(false);
      toast.success("Transação realizada com sucesso! 😁");
    } catch (err) {
      toast.error(`Transação inválida, saldo insuficiente. 🙁`);
      setNewBalance("");
      setConfirmLoading(false);
    }
  }

  return (
    <Wrapper>
      <h2 style={confirm ? { filter: "blur(5px)" } : {}}>Ajustar saldo</h2>
      <Form
        style={confirm ? { filter: "blur(5px)" } : {}}
        onSubmit={handleSearch}
      >
        <header>
          <Input
            name="name"
            placeholder="Digite o nome do usuário"
            value={name}
            onChange={e => setName(e.target.value)}
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
      ) : show ? (
        <Container
          fluid
          style={
            confirm
              ? {
                  lineHeight: "40px",
                  margin: "40px 180px 0 180px",
                  textAlign: "center",
                  color: "#000",
                  filter: "blur(5px)"
                }
              : {
                  lineHeight: "40px",
                  margin: "40px 180px 0 180px",
                  textAlign: "center",
                  color: "#000"
                }
          }
        >
          <Row
            style={{
              background: "rgba(0, 0, 0, 0.6)",
              color: "#FFF",
              fontSize: "15px"
            }}
          >
            <Col style={{ borderRight: "1px solid #fff" }}>MATRICULA</Col>
            <Col style={{ borderRight: "1px solid #fff" }}>NOME</Col>
            <Col style={{ borderRight: "1px solid #fff" }}>DATA</Col>
            <Col style={{ borderRight: "1px solid #fff" }}>CPF</Col>
            <Col style={{ borderRight: "1px solid #fff" }}>SALDO</Col>
            <Col style={{ borderRight: "1px solid #fff" }}>ID USUÁRIO</Col>
            <Col>AJUSTAR</Col>
          </Row>
          <ul>
            {users.map(item => (
              <Article key={item.id}>
                <Col
                  style={{ borderRight: "1px solid #aaa", padding: "-15px" }}
                >
                  {item.matricula}
                </Col>
                <Col
                  style={{ borderRight: "1px solid #aaa", fontSize: "12px" }}
                >
                  {item.nomecompleto}
                </Col>
                <Col style={{ borderRight: "1px solid #aaa" }}>
                  {formatDate(item.datanascimento)}
                </Col>
                <Col
                  style={{ borderRight: "1px solid #aaa", fontSize: "13px" }}
                >
                  {maskResponseDocument(item.cnpj_cpf)}
                </Col>
                <Col
                  style={{
                    borderRight: "1px solid #aaa",
                    padding: "-15px"
                  }}
                >
                  {item.user ? maskResponseValue(item.user.saldo) : "-"}
                </Col>
                <Col
                  style={
                    item.user
                      ? { borderRight: "1px solid #aaa", padding: "-15px" }
                      : {
                          color: "#952A2A",
                          borderRight: "1px solid #aaa",
                          padding: "-15px"
                        }
                  }
                >
                  {item.user ? item.user.id : "Desativado"}
                </Col>
                <Col style={{ padding: "-15px" }}>
                  <button
                    onClick={() =>
                      confirm
                        ? null
                        : item.user
                        ? Dialog(
                            item.user.id,
                            item.nomecompleto,
                            item.user.saldo
                          )
                        : null
                    }
                  >
                    <MdLoop size={25} color="#ccc" />
                  </button>
                </Col>
              </Article>
            ))}
          </ul>
        </Container>
      ) : null}
      <br />
      <Paginate style={confirm ? { filter: "blur(5px)" } : {}}>
        {loading ? null : show ? (
          <>
            <button
              style={pages === 1 ? { cursor: "not-allowed" } : {}}
              onClick={confirm ? null : prevPage}
            >
              Anterior
            </button>
            <Page>{`${pages}/${lastPage}`}</Page>
            <button
              style={pages === lastPage ? { cursor: "not-allowed" } : {}}
              onClick={confirm ? null : nextPage}
            >
              Próxima
            </button>
          </>
        ) : null}
      </Paginate>
      <div
        style={
          confirm
            ? {
                position: "fixed",
                background: "#EEE",
                width: "100%",
                height: "230px",
                top: "calc(50% - 110px)",
                left: "calc(50% - 200px)",
                textAlign: "center",
                maxWidth: "400px",
                borderRadius: "8px",
                boxShadow: "8px 8px 10px #555",
                zIndex: 9999
              }
            : { display: "none" }
        }
      >
        {confirmLoading ? (
          <LoaderDivDialog>
            <Loader type="Oval" color="#6F6FFF" width={35} height={35} />
          </LoaderDivDialog>
        ) : (
          <>
            <strong
              style={{
                display: "flex",
                marginTop: "15px",
                justifyContent: "center",
                fontSize: "23px",
                color: "#222"
              }}
            >
              Alterar saldo?
            </strong>
            <p style={{ marginTop: "25px" }}>{client}</p>
            <p style={{ marginTop: "10px", fontWeight: "bold" }}>
              Saldo atual: {balance}
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <input
                style={{
                  marginTop: "15px",
                  background: "rgba(0, 0, 0, 0.7)",
                  border: 0,
                  borderRadius: "4px",
                  color: "#eee",
                  padding: "10px 15px"
                }}
                value={newBalance}
                onChange={e => setNewBalance(maskValue(e.target.value))}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignContent: "center",
                  margin: "22px 0 0 4px"
                }}
              >
                <label
                  style={{
                    paddingBottom: "3px",
                    marginLeft: "6px"
                  }}
                >
                  <input
                    type="radio"
                    label="Crédito"
                    checked={type === "Crédito"}
                    onClick={() => setType("Crédito")}
                  />
                  Crédito
                </label>
                <label style={{ margin: "0 0 4px 2px" }}>
                  <input
                    type="radio"
                    label="Débito"
                    checked={type === "Débito"}
                    onClick={() => setType("Débito")}
                  />
                  Débito
                </label>
              </div>
            </div>
            <header
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                marginTop: "15px"
              }}
            >
              <button
                style={{
                  padding: "3px 18px",
                  border: 0,
                  borderRadius: "4px",
                  background: "#222",
                  color: "#EEE"
                }}
                onClick={() => setConfirm(false)}
              >
                Não
              </button>
              <button
                style={{
                  padding: "3px 18px",
                  border: 0,
                  borderRadius: "4px",
                  background: "#222",
                  color: "#EEE"
                }}
                onClick={() => handleBalance(id, newBalance, type)}
              >
                Sim
              </button>
            </header>
          </>
        )}
      </div>
      <Footer />
    </Wrapper>
  );
}
