import React from "react";
import { useSelector } from "react-redux";
import { Container } from "./styles";
import {
  MdShoppingCart,
  MdAssignment,
  MdCancel,
  MdPersonAdd,
  MdAddToQueue,
  MdUpdate,
  MdMonetizationOn
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
            <Link to="/sell">
              <MdShoppingCart size={40} color="#fff" />
              <strong>Vender</strong>
            </Link>
          ) : null}
          {profile.provider || profile.admin ? (
            <Link>
              <MdCancel size={40} color="#fff" />
              <strong>Cancelar venda</strong>
            </Link>
          ) : null}
          {profile.admin ? (
            <Link>
              <MdPersonAdd size={40} color="#fff" />
              <strong>Incluir novo perfil</strong>
            </Link>
          ) : null}
          {profile.admin ? (
            <Link>
              <MdUpdate size={40} color="#fff" />
              <strong>Alterar perfis</strong>
            </Link>
          ) : null}
          {profile.admin ? (
            <Link>
              <MdMonetizationOn size={40} color="#fff" />
              <strong>Alterar transação</strong>
            </Link>
          ) : null}
          {profile.admin ? (
            <Link>
              <MdAddToQueue size={40} color="#fff" />
              <strong>Eleger administradores</strong>
            </Link>
          ) : null}
        </ul>
      </header>
    </Container>
  );
}
