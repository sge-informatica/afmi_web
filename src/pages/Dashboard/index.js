import React from "react";
import { useSelector } from "react-redux";
import { Container } from "./styles";
import Footer from "../../components/Footer";
import {
  MdShoppingBasket,
  MdAssignment,
  MdAddShoppingCart,
  MdPersonAdd,
  MdAttachMoney,
  MdMoneyOff,
  MdAddToQueue,
  MdChromeReaderMode,
  MdEventAvailable
} from "react-icons/md";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const profile = useSelector(state => state.user.profile.profile);

  return (
    <Container>
      <header>
        <ul>
          <Link to="/transactions">
            <MdAssignment size={40} color="#fff" />
            <strong>Consultar compras</strong>
          </Link>
          {profile.provider || profile.admin ? (
            <Link to="/show-sales">
              <MdAddShoppingCart size={40} color="#fff" />
              <strong>Consultar vendas</strong>
            </Link>
          ) : null}
          {profile.provider || profile.admin ? (
            <Link to="/sell">
              <MdShoppingBasket size={40} color="#fff" />
              <strong>Vender</strong>
            </Link>
          ) : null}
          {profile.admin ? (
            <Link to="add-profile">
              <MdPersonAdd size={40} color="#fff" />
              <strong>Incluir novo perfil</strong>
            </Link>
          ) : null}
          {profile.admin ? (
            <Link to="new-admin">
              <MdAddToQueue size={40} color="#fff" />
              <strong>Eleger/Remover administrador</strong>
            </Link>
          ) : null}
          {profile.admin ? (
            <Link to="/invoices">
              <MdChromeReaderMode size={40} color="#fff" />
              <strong>Consultar faturas fechadas</strong>
            </Link>
          ) : null}
          {profile.admin ? (
            <Link to="/balance-adjustment">
              <MdMoneyOff size={40} color="#fff" />
              <MdAttachMoney size={40} color="#fff" />
              <strong>Ajuste de saldo</strong>
            </Link>
          ) : null}
          {profile.admin ? (
            <Link to="/invoice-close">
              <MdEventAvailable size={40} color="#fff" />
              <strong>Fechar faturas</strong>
            </Link>
          ) : null}
        </ul>
      </header>
      <Footer />
    </Container>
  );
}
