import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { Container, Content, Profile } from "./styles";

export default function Header() {
  const profile = useSelector(state => state.user.profile);
  const [type, setType] = useState("");

  useEffect(() => {
    profile.profile.admin
      ? setType("Administrador")
      : profile.profile.provider
      ? setType("Prestador de serviços")
      : setType("Consumer");
  }, [profile]);

  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="SgeApp" />
          <Link to="/dashboard">DASHBOARD</Link>
        </nav>

        <aside>
          <Profile>
            <div>
              <strong>{profile.username}</strong>
              <text>{type}</text>
              <Link to="/profile">Meu perfil</Link>
            </div>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
