import React from "react";
import { useSelector, useDispatch } from "react-redux";
import * as Yup from "yup";
import { Form, Input } from "@rocketseat/unform";
import { updateProfileRequest } from "../../store/modules/users/actions";
import { Container } from "./styles";
import Loader from "react-loader-spinner";
import { signOut } from "../../store/modules/auth/actions";

const schema = Yup.object().shape({
  username: Yup.string().required("O nome é obrigatório.")
});

export default function Profile() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);
  const loading = useSelector(state => state.auth.loading);
  const token = useSelector(state => state.auth.token);
  const id = useSelector(state => state.user.profile.id);

  function handleSubmit(data) {
    const setProfile = Object.assign(data, { id, token, profile });
    dispatch(updateProfileRequest(setProfile));
  }

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Form schema={schema} initialData={profile} onSubmit={handleSubmit}>
        <Input name="username" placeholder="Nome completo" />

        <hr />

        <Input
          name="old_password"
          type="password"
          placeholder="Sua senha atual"
        />
        <Input name="password" type="password" placeholder="Nova senha" />
        <Input
          name="password_confirmation"
          type="password"
          placeholder="Confirmação de senha"
        />

        <button type="submit">
          {loading ? (
            <Loader type="Oval" color="#FFF" width={30} height={30} />
          ) : (
            "Atualizar perfil"
          )}
        </button>
      </Form>

      <button type="button" onClick={handleSignOut}>
        Sair de Afmi App
      </button>
    </Container>
  );
}
