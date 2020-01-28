import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import api from "../../services/api";
import { formatDateHour } from "../../_util/formatDate";
import { Container, Row, Col } from "react-grid-system";
import { maskResponseValue } from "../../_util/masks";
import { Wrapper, Article, Paginate, Page, LoaderDiv } from "./styles";
import Footer from "../../components/Footer";
import { MdCancel } from "react-icons/md";
import { toast } from "react-toastify";
import emoji from "../../assets/sad-emoji.png";
import Loader from "react-loader-spinner";

export default function ShowSale() {
  const [pages, setPages] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const token = useSelector(state => state.auth.token);
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hover, setHover] = useState(false);

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
    const pageNumber = pages + 1;
    try {
      const response = await api.get(`transactions?page=${pageNumber}`, {
        params: { token }
      });
      setSales(response.data.data);
      setPages(pageNumber);
      setLoading(false);
    } catch (err) {
      toast.error("Sessão inválida, faça login na aplicação novamente. 🙁");
      setLoading(false);
    }
  }

  async function prevPage() {
    if (pages === 1) return;
    setLoading(true);
    const pageNumber = pages - 1;
    try {
      const response = await api.get(`transactions?page=${pageNumber}`, {
        params: { token }
      });
      setSales(response.data.data);
      setPages(pageNumber);
      setLoading(false);
    } catch (err) {
      toast.error("Sessão inválida, faça login na aplicação novamente. 🙁");
      setLoading(false);
    }
  }

  async function deleteSales(id) {
    try {
      setLoading(true);
      await api.delete(`/transactions/${id}`, {
        params: { token }
      });
      const response = await api.get("/transactions", {
        params: { token }
      });
      setPages(response.data.page);
      setLastPage(response.data.lastPage);
      setSales(response.data.data);
      setLoading(false);
      toast.success("Transação excluída com sucesso! 😁");
    } catch (err) {
      setLoading(false);
      toast.error(`${err.response.data.error.message}.`);
    }
  }

  function returnCanceled(item) {
    if (!item.canceled) return;
    const date = formatDateHour(item.canceled_at);
    return date;
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
        {loading ? null : sales.length === 0 ? null : (
          <>
            <h2>Consultar vendas</h2>
            <Row
              style={{
                background: "rgba(0, 0, 0, 0.6)",
                color: "#FFF",
                fontSize: "15px"
              }}
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
          <ul>
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
                    onMouseEnter={() => (item.canceled ? setHover(true) : null)}
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
                  <button onClick={() => deleteSales(item.id)}>
                    <MdCancel size={18} color="#ccc" />
                  </button>
                </Col>
              </Article>
            ))}
          </ul>
        )}
        <br />
        <Paginate>
          {loading ? null : sales.length === 0 ? null : (
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
