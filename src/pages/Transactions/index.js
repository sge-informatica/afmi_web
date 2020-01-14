import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import api from "../../services/api";
import { format, parseISO } from "date-fns";
import pt from "date-fns/locale/pt";
import {
  Wrapper,
  Container,
  LoaderDiv,
  Article,
  Value,
  Historic,
  Canceled,
  TransactionType,
  Paginate,
  Page
} from "./styles";
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
    }
  }

  return (
    <Wrapper>
      <Container>
        {loading ? (
          <LoaderDiv>
            <Loader type="Oval" color="#595959" width={35} height={35} />
          </LoaderDiv>
        ) : (
          <ul>
            {data.map(item => (
              <Article key={item.id}>
                <strong>{item.provider_name}</strong>
                <p>{formatDate(item.created_at)}</p>
                <Value>
                  Valor: R${item.valor}
                  <TransactionType>{item.DC}</TransactionType>
                </Value>
                <Historic>{item.historico ? item.historico : null}</Historic>
                <p>Saldo atual: R${item.saldo}</p>
                <Canceled>{item.canceled ? "CANCELADO" : null}</Canceled>
              </Article>
            ))}
          </ul>
        )}
        <Paginate>
          {loading ? null : (
            <>
              <button onClick={prevPage}>Anterior</button>
              <Page>{pages}</Page>
              <button onClick={nextPage}>Próxima</button>
            </>
          )}
        </Paginate>
      </Container>
    </Wrapper>
  );
}
