import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import api from "../../services/api";
import { formatDateHour } from "../../_util/formatDate";
import {
  Wrapper,
  LoaderDiv,
  Article,
  Paginate,
  Page,
  LoaderDivDialog
} from "./styles";
import { Container, Row, Col } from "react-grid-system";
import Footer from "../../components/Footer";
import { MdCancel } from "react-icons/md";
import emoji from "../../assets/sad-emoji.png";
import { toast } from "react-toastify";
import Loader from "react-loader-spinner";

export default function Invoices() {
  const token = useSelector(state => state.auth.token);
  const admin = useSelector(state => state.user.profile.profile.admin);
  const [data, setData] = useState([]);
  let [pages, setPages] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [confirm, setConfirm] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [id, setId] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    async function loadInvoices() {
      try {
        setLoading(true);
        const response = await api.get(`invoices?page=${pages}`, {
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

    loadInvoices();
  }, [token, pages]);

  async function nextPage() {
    if (pages === lastPage) return;
    setLoading(true);
    pages += 1;
    try {
      const response = await api.get(`invoices?page=${pages}`, {
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
      const response = await api.get(`invoices?page=${pages}`, {
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

  async function deleteInvoice(id) {
    try {
      setConfirmLoading(true);
      await api.delete(`/invoices/${id}`, {
        params: { token }
      });
      setConfirmLoading(false);
      setConfirm(false);
      setLoading(true);
      const response = await api.get(`/invoices?page=${pages}`, {
        params: { token }
      });
      setPages(pages);
      setLastPage(response.data.lastPage);
      setData(response.data.data);
      setLoading(false);
      toast.success("Fatura excluída com sucesso! 😁");
    } catch (err) {
      setLoading(false);
      setConfirmLoading(false);
      toast.error(`${err.response.data.error.message}`);
    }
  }

  function Dialog(id, description, date) {
    const data = formatDateHour(date);
    setConfirm(true);
    setId(id);
    setDescription(description);
    setDate(data);
    document.onkeydown = function(e) {
      if (e.keyCode === 27) {
        setConfirm(false);
      }
    };
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
            <h2 style={confirm ? { filter: "blur(5px)" } : {}}>
              Consultar faturas fechadas
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
              <Col style={{ borderRight: "1px solid #fff" }}>DESCRIÇÃO</Col>
              <Col style={{ borderRight: "1px solid #fff" }}>
                DATA DO FECHAMENTO
              </Col>
              <Col>CANCELAR FATURA</Col>
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
          <ul style={confirm ? { filter: "blur(5px)" } : {}}>
            {data.map(item => (
              <Article key={item.id}>
                <Col
                  style={{
                    borderRight: "1px solid #aaa"
                  }}
                >
                  <Link
                    to={{
                      pathname: "/invoice-details",
                      state: { id: item.id, title: item.description }
                    }}
                  >
                    {item.description}
                  </Link>
                </Col>
                <Col style={{ borderRight: "1px solid #aaa" }}>
                  {formatDateHour(item.created_at)}
                </Col>
                <Col>
                  <button
                    style={confirm ? { pointerEvents: "none" } : {}}
                    onClick={() =>
                      Dialog(item.id, item.description, item.created_at)
                    }
                  >
                    <MdCancel size={25} color="#CD7171" />
                  </button>
                </Col>
              </Article>
            ))}
          </ul>
        )}
        <Paginate style={confirm ? { filter: "blur(5px)" } : {}}>
          {loading ? null : data.length === 0 ? null : (
            <>
              <button
                style={pages === 1 || confirm ? { pointerEvents: "none" } : {}}
                onClick={prevPage}
              >
                Anterior
              </button>
              <Page>{`${pages}/${lastPage}`}</Page>
              <button
                style={
                  pages === lastPage || confirm ? { pointerEvents: "none" } : {}
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
                  Deseja cancelar esta fatura?
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
                {description}
              </p>
              <p
                style={{
                  margin: "-8px 0 0 75px",
                  fontWeight: "bold",
                  textAlign: "left",
                  fontSize: "15px"
                }}
              >
                Data: {date}
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
                  onClick={() => deleteInvoice(id)}
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
