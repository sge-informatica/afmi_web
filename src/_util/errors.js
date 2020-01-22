import { toast } from "react-toastify";

export function checkSignIn(err, email) {
  err instanceof Array
    ? err.map(msg => toast.error(msg.message))
    : err.error.message ===
      `E_USER_NOT_FOUND: Cannot find user with email as ${email}`
    ? toast.error(`Usuário ${email} não encontrado.`)
    : toast.error("Senha incorreta.");
}

export function checkSignUp(err) {
  err instanceof Array
    ? err.map(msg => toast.error(msg.message))
    : toast.error(`${err.error.message}.`);
}

export function checkUpdateProfile(err) {
  err instanceof Array
    ? err.map(msg => toast.error(msg.message))
    : toast.error(`${err.error.message}`);
}

export function recoverPassword(err) {
  err instanceof Array
    ? err.map(msg => toast.error(msg.message))
    : toast.error("Não foi possível recuperar a senha, confira seus dados!");
}
