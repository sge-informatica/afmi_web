import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import api from "../../services/api";
import { format, parseISO } from "date-fns";
import Footer from "../../components/Footer";
import pt from "date-fns/locale/pt";
import {
  Wrapper,
  LoaderDiv,
  Article,
  TransactionType,
  Paginate,
  Page
} from "./styles";
import { Container, Row, Col } from "react-grid-system";
import emoji from "../../assets/sad-emoji.png";
import Loader from "react-loader-spinner";
import { toast } from "react-toastify";

export default function Transactions() {
  const [pages, setPages] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const id = useSelector(state => state.user.profile.id);
  const token = useSelector(state => state.auth.token);

  function formatDate(date) {
    const parsed = parseISO(date);
    const formattedDate = format(parsed, "dd 'de' MMMM 'de' yyyy", {
      locale: pt
    });
    return formattedDate;
  }

  useEffect(() => {
    async function loadTransactions() {
      setLoading(true);
      const response = await api.get(`transactions/${id}`, {
        params: { token }
      });
      setData(response.data.data);
      setPages(response.data.page);
      setLastPage(response.data.lastPage);
      setLoading(false);
    }
    loadTransactions();
  }, [id, token]);

  async function nextPage() {
    if (pages === lastPage) return;
    setLoading(true);
    const pageNumber = pages + 1;
    try {
      const response = await api.get(`transactions/${id}?page=${pageNumber}`, {
        params: { token }
      });
      setData(response.data.data);
      setPages(pageNumber);
      setLoading(false);
    } catch (err) {
      toast.error("Sessão inválida, faça login na aplicação novamente.");
      setLoading(false);
    }
  }

  async function prevPage() {
    if (pages === 1) return;
    setLoading(true);
    const pageNumber = pages - 1;
    try {
      const response = await api.get(`transactions/${id}?page=${pageNumber}`, {
        params: { token }
      });
      setData(response.data.data);
      setPages(pageNumber);
      setLoading(false);
    } catch (err) {
      toast.error("Sessão inválida, faça login na aplicação novamente.");
      setLoading(false);
    }
  }

  return (
    <Wrapper>
      <Container
        fluid
        style={{
          lineHeight: "40px",
          margin: "40px 180px 0 180px",
          textAlign: "center",
          color: "#000"
        }}
      >
        {loading ? null : data.length === 0 ? null : (
          <>
            <h2>Consultar compras</h2>
            <Row
              style={{
                background: "rgba(0, 0, 0, 0.6)",
                color: "#FFF",
                fontSize: "15px"
              }}
            >
              <Col style={{ borderRight: "1px solid #fff" }}>NOME</Col>
              <Col style={{ borderRight: "1px solid #fff" }}>DATA</Col>
              <Col style={{ borderRight: "1px solid #fff" }}>VALOR</Col>
              <Col style={{ borderRight: "1px solid #fff" }}>HISTÓRICO</Col>
              <Col style={{ borderRight: "1px solid #fff" }}>SALDO</Col>
              <Col>CANCELADO</Col>
            </Row>
          </>
        )}
        {loading ? (
          <LoaderDiv>
            <Loader type="Oval" color="#6F6FFF" width={35} height={35} />
          </LoaderDiv>
        ) : data.length === 0 ? (
          <strong>
            Nenhuma compra foi realizada.
            <img src={emoji} alt="sad-emoji" width={25} />
          </strong>
        ) : (
          <ul>
            {data.map(item => (
              <Article key={item.id}>
                <Col
                  style={{
                    borderRight: "1px solid #aaa",
                    fontSize: "13px"
                  }}
                >
                  {item.provider_name}
                </Col>
                <Col
                  style={{ borderRight: "1px solid #aaa", fontSize: "13px" }}
                >
                  {formatDate(item.created_at)}
                </Col>
                <Col
                  style={{ borderRight: "1px solid #aaa", fontSize: "13px" }}
                >
                  Valor: R${item.valor}
                  <TransactionType>{item.DC}</TransactionType>
                </Col>
                <Col
                  style={{ borderRight: "1px solid #aaa", fontSize: "13px" }}
                >
                  {item.historico ? item.historico : null}
                </Col>
                <Col
                  style={{ borderRight: "1px solid #aaa", fontSize: "13px" }}
                >
                  Saldo: R${item.saldo}
                </Col>
                <Col
                  style={
                    item.canceled
                      ? {
                          fontSize: "13px",
                          color: "#952A2A"
                        }
                      : { fontSize: "13px" }
                  }
                >
                  {item.canceled ? "Sim" : "Não"}
                </Col>
              </Article>
            ))}
          </ul>
        )}
        <Paginate>
          {loading ? null : data.length === 0 ? null : (
            <>
              <button onClick={prevPage}>Anterior</button>
              <Page>{`${pages}/${lastPage}`}</Page>
              <button onClick={nextPage}>Próxima</button>
            </>
          )}
        </Paginate>
      </Container>
      <Footer />
    </Wrapper>
  );
}
