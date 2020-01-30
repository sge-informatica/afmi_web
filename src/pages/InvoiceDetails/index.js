import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Container, Row, Col } from "react-grid-system";
import api from "../../services/api";
import { maskResponseValue } from "../../_util/masks";
import { Wrapper, Article, LoaderDiv, Paginate, Page } from "./styles";
import { MdChevronLeft } from "react-icons/md";
import emoji from "../../assets/sad-emoji.png";
import { toast } from "react-toastify";
import Loader from "react-loader-spinner";
import Footer from "../../components/Footer";

export default function InvoiceDetails(props) {
  const token = useSelector(state => state.auth.token);
  const admin = useSelector(state => state.user.profile.profile.admin);
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [data, setData] = useState([]);
  let [pages, setPages] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadInvoiceDetails() {
      setTitle(props.history.location.state.title);
      setId(props.history.location.state.id);
      if (id === "" || title === "") return;
      try {
        setLoading(true);
        const response = await api.get(`/invoices/${id}?page4=${pages}`, {
          params: { token }
        });
        setData(response.data.data);
        setPages(response.data.page);
        setLastPage(response.data.lastPage);
        setLoading(false);
      } catch (err) {
        toast.error("Sessão inválida, faça login na aplicação novamente. 🙁");
        setLoading(false);
      }
    }

    loadInvoiceDetails();
  }, [id, pages, props, props.history.location.state, title, token]);

  async function nextPage() {
    if (pages === lastPage) return;
    setLoading(true);
    pages += 1;
    try {
      const response = await api.get(`invoices/${id}?page=${pages}`, {
        params: { token }
      });
      setData(response.data.data);
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
      const response = await api.get(`invoices/${id}?page=${pages}`, {
        params: { token }
      });
      setData(response.data.data);
      setPages(pages);
      setLoading(false);
    } catch (err) {
      toast.error("Sessão inválida, faça login na aplicação novamente. 🙁");
      setLoading(false);
    }
  }

  return (
    <Wrapper>
      {admin ? null : <Redirect to="/dashboard" />}
      <Container
        fluid
        style={{
          lineHeight: "40px",
          margin: "40px 300px 0 300px",
          textAlign: "center",
          color: "#000"
        }}
      >
        {loading ? null : data.length === 0 ? null : (
          <>
            <header>
              <button onClick={() => props.history.goBack()}>
                <MdChevronLeft size={25} color="#595959" />
              </button>
              <h2>{title}</h2>
            </header>
            <Row
              style={{
                background: "rgba(0, 0, 0, 0.6)",
                color: "#FFF",
                fontSize: "15px"
              }}
            >
              <Col style={{ borderRight: "1px solid #fff" }}>HISTÓRICO</Col>
              <Col style={{ borderRight: "1px solid #fff" }}>NOME COMPLETO</Col>
              <Col style={{ borderRight: "1px solid #fff" }}>EMAIL</Col>
              <Col>VALOR</Col>
            </Row>
          </>
        )}
        {loading ? (
          <LoaderDiv>
            <Loader type="Oval" color="#6F6FFF" width={35} height={35} />
          </LoaderDiv>
        ) : data.length === 0 ? (
          <strong>
            Nenhuma fatura foi fechada.
            <img src={emoji} alt="sad-emoji" width={25} />
          </strong>
        ) : (
          <ul>
            {data.map(item => (
              <Article key={item.id}>
                <Col style={{ borderRight: "1px solid #aaa" }}>
                  {item.historico}
                </Col>
                <Col style={{ borderRight: "1px solid #aaa" }}>
                  {item.username}
                </Col>
                <Col style={{ borderRight: "1px solid #aaa" }}>
                  {item.email}
                </Col>
                <Col>{maskResponseValue(item.valor)}</Col>
              </Article>
            ))}
          </ul>
        )}
        <Paginate>
          {loading ? null : data.length === 0 ? null : (
            <>
              <button
                style={pages === 1 ? { pointerEvents: "none" } : {}}
                onClick={prevPage}
              >
                Anterior
              </button>
              <Page>{`${pages}/${lastPage}`}</Page>
              <button
                style={pages === lastPage ? { pointerEvents: "none" } : {}}
                onClick={nextPage}
              >
                Próxima
              </button>
            </>
          )}
        </Paginate>
      </Container>
      <Footer />
    </Wrapper>
  );
}
