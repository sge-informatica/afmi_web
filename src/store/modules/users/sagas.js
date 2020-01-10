import { takeLatest, call, put, all } from "redux-saga/effects";
import { toast } from "react-toastify";
import api from "../../../services/api";
import { updateProfileSuccess, updateProfileFailure } from "./actions";
import { checkUpdateProfile } from "../../../_util/errors";

export function* updateProfile({ payload }) {
  try {
    const { id, token, username, ...rest } = payload.data;
    const profile = Object.assign(
      { id, token, username },
      rest.old_password ? rest : {}
    );
    const response = yield call(api.put, `users/${id}`, profile);
    toast.success(response.data.ok);

    const setProfile = {
      id: payload.data.id,
      username: payload.data.username,
      profile: {
        id: payload.data.profile.profile.id,
        matricula: payload.data.profile.profile.matricula,
        cnpj_cpf: payload.data.profile.profile.cnpj_cpf,
        admin: true,
        provider: true
      }
    };

    yield put(updateProfileSuccess(setProfile));
  } catch (err) {
    const error = err.response.data;
    checkUpdateProfile(error);
    yield put(updateProfileFailure());
  }
}

export default all([takeLatest("@user/UPDATE_PROFILE_REQUEST", updateProfile)]);
