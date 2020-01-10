import React, { useEffect, useState } from "react";
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

export default function Dashboard() {
  const [showButton, setShowButton] = useState(false);
  const profile = useSelector(state => state.user.profile);
  console.tron.log(profile.profile.admin);
  console.tron.log(profile.profile.provider);
  useEffect(() => {}, []);

  return (
    <Container>
      <header>
        <ul>
          <button type="button" hidden={false}>
            <MdAssignment size={40} color="#fff" />
            <strong>Consultar compras</strong>
          </button>
          <button type="button">
            <MdShoppingCart size={40} color="#fff" />
            <strong>Vender</strong>
          </button>
          <button type="button">
            <MdCancel size={40} color="#fff" />
            <strong>Cancelar venda</strong>
          </button>
          <button type="button">
            <MdPersonAdd size={40} color="#fff" />
            <strong>Incluir novo perfil</strong>
          </button>
          <button type="button">
            <MdUpdate size={40} color="#fff" />
            <strong>Alterar perfis</strong>
          </button>
          <button type="button">
            <MdMonetizationOn size={40} color="#fff" />
            <strong>Alterar transação</strong>
          </button>
          <button type="button">
            <MdAddToQueue size={40} color="#fff" />
            <strong>Eleger administradores</strong>
          </button>
        </ul>
      </header>
    </Container>
  );
}
