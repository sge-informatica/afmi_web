import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "../../services/api";
import { formatDateHour } from "../../_util/formatDate";
import { Container, Row, Col } from "react-grid-system";
import { maskResponseValue } from "../../_util/masks";
import {
  Wrapper,
  Article,
  Paginate,
  Page,
  LoaderDiv,
  LoaderDivDialog
} from "./styles";
import Footer from "../../components/Footer";
import { MdCancel } from "react-icons/md";
import { toast } from "react-toastify";
import emoji from "../../assets/sad-emoji.png";
import Loader from "react-loader-spinner";

export default function ShowSale() {
  let [pages, setPages] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const token = useSelector(state => state.auth.token);
  const admin = useSelector(state => state.user.profile.profile.admin);
  const provider = useSelector(state => state.user.profile.profile.provider);
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hover, setHover] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [balance, setBalance] = useState("");
  const [id, setId] = useState("");
  const [client, setClient] = useState("");

  useEffect(() => {
    async function loadSales() {
      try {
        setLoading(true);
        const response = await api.get("/transactions", {
          params: { token }
        });
        setPages(response.data.page);
        setLastPage(response.data.lastPage);
        setSales(response.data.data);
        setLoading(false);
      } catch (err) {
        toast.error("Sessão inválida, faça login na aplicação novamente. 🙁");
        setLoading(false);
      }
    }

    loadSales();
  }, [token]);

  async function nextPage() {
    if (pages === lastPage) return;
    setLoading(true);
    pages += 1;
    try {
      const response = await api.get(`transactions?page=${pages}`, {
        params: { token }
      });
      setSales(response.data.data);
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
      const response = await api.get(`transactions?page=${pages}`, {
        params: { token }
      });
      setSales(response.data.data);
      setPages(pages);
      setLoading(false);
    } catch (err) {
      toast.error("Sessão inválida, faça login na aplicação novamente. 🙁");
      setLoading(false);
    }
  }

  async function deleteSales(id) {
    try {
      setConfirmLoading(true);
      await api.delete(`/transactions/${id}`, {
        params: { token }
      });
      setConfirmLoading(false);
      setConfirm(false);
      setLoading(true);
      const response = await api.get(`/transactions?page=${pages}`, {
        params: { token }
      });
      setPages(pages);
      setLastPage(response.data.lastPage);
      setSales(response.data.data);
      setLoading(false);
      toast.success("Transação excluída com sucesso! 😁");
    } catch (err) {
      setLoading(false);
      setConfirmLoading(false);
      toast.error(`${err.response.data.error.message}`);
    }
  }

  function Dialog(id, client, balance) {
    setId(id);
    setConfirm(true);
    setClient(client);
    setBalance(maskResponseValue(balance));
    document.onkeydown = function(e) {
      if (e.keyCode === 27) {
        setConfirm(false);
      }
    };
  }

  function returnCanceled(item) {
    if (!item.canceled) return;
    const date = formatDateHour(item.canceled_at);
    return date;
  }

  return (
    <Wrapper>
      {admin || provider ? null : <Redirect to="/dashboard" />}
      <Container
        fluid
        style={{
          lineHeight: "40px",
          margin: "40px 180px 0 180px",
          textAlign: "center",
          color: "#000"
        }}
      >
        {loading ? null : sales.length === 0 ? null : (
          <>
            <h2 style={confirm ? { filter: "blur(5px)" } : {}}>
              Consultar vendas
            </h2>
            <Row
              style={
                confirm
                  ? {
                      background: "rgba(0, 0, 0, 0.6)",
                      color: "#FFF",
                      fontSize: "15px",
                      filter: "blur(5px)"
                    }
                  : {
                      background: "rgba(0, 0, 0, 0.6)",
                      color: "#FFF",
                      fontSize: "15px"
                    }
              }
            >
              <Col style={{ borderRight: "1px solid #fff" }}>NOME</Col>
              <Col style={{ borderRight: "1px solid #fff" }}>VALOR</Col>
              <Col style={{ borderRight: "1px solid #fff" }}>DATA</Col>
              <Col style={{ borderRight: "1px solid #fff" }}>CANCELADO</Col>
              <Col>CANCELAR</Col>
            </Row>
          </>
        )}
        {loading ? (
          <LoaderDiv>
            <Loader type="Oval" color="#6F6FFF" width={35} height={35} />
          </LoaderDiv>
        ) : sales.length === 0 ? (
          <strong>
            Nenhuma venda foi realizada.
            <img src={emoji} alt="sad-emoji" width={25} />
          </strong>
        ) : (
          <ul style={confirm ? { filter: "blur(5px)" } : {}}>
            {sales.map(item => (
              <Article key={item.id}>
                <Col style={{ borderRight: "1px solid #aaa" }}>
                  {item.user_name}
                </Col>
                <Col style={{ borderRight: "1px solid #aaa" }}>
                  {maskResponseValue(item.valor)}
                </Col>
                <Col style={{ borderRight: "1px solid #aaa" }}>
                  {formatDateHour(item.created_at)}
                </Col>
                <Col
                  style={
                    item.canceled
                      ? { color: "#952A2A", borderRight: "1px solid #aaa" }
                      : { color: "#000", borderRight: "1px solid #aaa" }
                  }
                >
                  <p
                    onMouseEnter={() =>
                      item.canceled ? (confirm ? null : setHover(true)) : null
                    }
                    onMouseLeave={() => setHover(false)}
                  >
                    {item.canceled
                      ? hover
                        ? returnCanceled(item)
                        : "Sim"
                      : "Não"}
                  </p>
                </Col>
                <Col>
                  <button
                    style={
                      confirm || item.canceled ? { pointerEvents: "none" } : {}
                    }
                    onClick={() => Dialog(item.id, item.user_name, item.valor)}
                  >
                    <MdCancel
                      size={25}
                      color={item.canceled ? "#CBABAB" : "#CD7171"}
                    />
                  </button>
                </Col>
              </Article>
            ))}
          </ul>
        )}
        <Paginate style={confirm ? { filter: "blur(5px)" } : {}}>
          {loading ? null : sales.length === 0 ? null : (
            <>
              <button
                style={confirm || pages === 1 ? { pointerEvents: "none" } : {}}
                onClick={prevPage}
              >
                Anterior
              </button>
              <Page>{`${pages}/${lastPage}`}</Page>
              <button
                style={
                  confirm || pages === lastPage ? { pointerEvents: "none" } : {}
                }
                onClick={nextPage}
              >
                Próxima
              </button>
            </>
          )}
        </Paginate>
        <div
          style={
            confirm
              ? {
                  position: "fixed",
                  background: "#EEE",
                  width: "100%",
                  height: "200px",
                  top: "calc(50% - 110px)",
                  left: "calc(50% - 200px)",
                  textAlign: "center",
                  maxWidth: "400px",
                  borderRadius: "8px",
                  boxShadow: "9px 9px 10px #333",
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
              <div
                style={{
                  background: "rgba(0, 0, 0, 0.7)",
                  borderRadius: "4px",
                  padding: "5px 0",
                  margin: "10px 10px"
                }}
              >
                <strong
                  style={{
                    marginTop: "0",
                    display: "flex",
                    justifyContent: "center",
                    fontSize: "22px",
                    color: "#eee"
                  }}
                >
                  Deseja cancelar esta compra?
                </strong>
              </div>
              <p
                style={{
                  margin: "7px 0 0 75px",
                  textAlign: "left",
                  fontSize: "15px",
                  fontWeight: "bold",
                  color: "#952A2A"
                }}
              >
                {client}
              </p>
              <p
                style={{
                  margin: "-8px 0 0 75px",
                  fontWeight: "bold",
                  textAlign: "left",
                  fontSize: "15px"
                }}
              >
                Valor: {balance}
              </p>
              <header
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  background: "rgba(0, 0, 0, 0.2)",
                  padding: "3px 0",
                  margin: "8px 10px",
                  borderRadius: "4px"
                }}
              >
                <button
                  style={{
                    padding: "3px 18px",
                    border: 0,
                    borderRadius: "4px",
                    background: "#222",
                    color: "#EEE",
                    margin: "4px 0 4px 0"
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
                    color: "#EEE",
                    margin: "4px 0 4px 0"
                  }}
                  onClick={() => deleteSales(id)}
                >
                  Sim
                </button>
              </header>
            </>
          )}
        </div>
      </Container>
      <Footer />
    </Wrapper>
  );
}
