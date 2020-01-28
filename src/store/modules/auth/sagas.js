import { takeLatest, call, put, all } from "redux-saga/effects";
import history from "../../../services/history";
import api from "../../../services/api";
import { signInSuccess, signFailure } from "./actions";
import { toast } from "react-toastify";
import { checkSignIn, checkSignUp } from "../../../_util/errors";

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;
    const response = yield call(api.post, "sessions", {
      email,
      password
    });
    const { token, user } = response.data;
    api.defaults.headers.Authorization = `Bearer ${token}`;
    yield put(signInSuccess(token, user));
    history.push("/dashboard");
  } catch (err) {
    const { email } = payload;
    const error = err.response.data;
    checkSignIn(error, email);
    yield put(signFailure());
  }
}

export function* signUp({ payload }) {
  try {
    const {
      username,
      email,
      cnpj_cpf,
      matricula,
      datanascimento,
      password,
      password_confirmation
    } = payload;

    yield call(api.post, "users", {
      username,
      email,
      cnpj_cpf,
      matricula,
      datanascimento,
      password,
      password_confirmation
    });
    toast.success("Cadastro realizado com sucesso! 😁");
    history.push("/dashboard");
  } catch (err) {
    const error = err.response.data;
    checkSignUp(error);
    yield put(signFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export function signOut() {
  history.push("/");
}

export default all([
  takeLatest("@persist/REHYDRATE", setToken),
  takeLatest("@auth/SIGN_IN_REQUEST", signIn),
  takeLatest("@auth/SIGN_UP_REQUEST", signUp),
  takeLatest("@auth/SIGN_OUT", signOut)
]);
