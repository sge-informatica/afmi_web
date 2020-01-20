import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import api from "../../services/api";
import { format, parseISO } from "date-fns";
import pt from "date-fns/locale/pt";
import { Container, Row, Col } from "react-grid-system";
import { maskResponseValue } from "../../_util/masks";
import { Wrapper, Article, Paginate, Page, LoaderDiv } from "./styles";
import { MdCancel } from "react-icons/md";
import { toast } from "react-toastify";
import Loader from "react-loader-spinner";

export default function ShowSale() {
  const [pages, setPages] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const token = useSelector(state => state.auth.token);
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);

  function formatDate(date) {
    const parsed = parseISO(date);
    const formattedDate = format(parsed, "dd 'de' MMMM 'de' yyyy", {
      locale: pt
    });
    return formattedDate;
  }

  useEffect(() => {
    async function loadSales() {
      setLoading(true);
      const response = await api.get("/transactions", {
        params: { token }
      });
      setPages(response.data.page);
      setLastPage(response.data.lastPage);
      setSales(response.data.data);
      setLoading(false);
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
      toast.error("Sessão inválida, faça login na aplicação novamente.");
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
      toast.error("Sessão inválida, faça login na aplicação novamente.");
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
      toast.success("Transação excluída com sucesso!");
    } catch (err) {
      setLoading(false);
      toast.error(`${err.response.data.error.message}.`);
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
        {loading ? null : (
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
            <Col></Col>
          </Row>
        )}
        {loading ? (
          <LoaderDiv>
            <Loader type="Oval" color="#6F6FFF" width={35} height={35} />
          </LoaderDiv>
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
                  {formatDate(item.created_at)}
                </Col>
                <Col
                  style={
                    item.canceled
                      ? { color: "#952A2A", borderRight: "1px solid #aaa" }
                      : { color: "#000", borderRight: "1px solid #aaa" }
                  }
                >
                  {item.canceled ? "Sim" : "Não"}
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
          {loading ? null : (
            <>
              <button onClick={prevPage}>Anterior</button>
              <Page>{`${pages}/${lastPage}`}</Page>
              <button onClick={nextPage}>Próxima</button>
            </>
          )}
        </Paginate>
      </Container>
    </Wrapper>
  );
}
