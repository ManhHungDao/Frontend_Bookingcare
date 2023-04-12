import actionTypes from "./actionTypes";

import {
  patientLogin,
  getInforAccount,
  updateInforAccount,
  patientChangePassword,
} from "../../services/patientService";

import { loadingToggleAction } from "./adminActions";
import { toast } from "react-toastify";

export const patientLoginAction = (email, password) => {
  return async (dispatch, getState) => {
    try {
      dispatch(loadingToggleAction(true));
      const res = await patientLogin(email, password);
      if (res && res.success) {
        dispatch({
          type: actionTypes.PATIENT_LOGIN_SUCCESS,
          data: res.user,
        });
        dispatch(loadingToggleAction(false));
      } else {
        dispatch(loadingToggleAction(false));
        dispatch({
          type: actionTypes.PATIENT_LOGIN_FAIL,
        });
        toast.error("Đăng nhập thất bại, kiểm tra lại thông tin!");
      }
    } catch (error) {
      dispatch(loadingToggleAction(false));
      dispatch({
        type: actionTypes.PATIENT_LOGIN_FAIL,
      });
      toast.error("Đăng nhập thất bại, kiểm tra lại thông tin!");
    }
  };
};

export const updateInforAccountAction = (id, data) => {
  return async (dispatch, getState) => {
    try {
      dispatch(loadingToggleAction(true));
      const res = await updateInforAccount(id, data);
      if (res && res.success) {
        dispatch(loadingToggleAction(false));
        toast.success("Cập nhập thông tin thành công");
      } else {
        dispatch(loadingToggleAction(false));
        toast.error("Cập nhập thông tin thất bại");
      }
    } catch (error) {
      dispatch(loadingToggleAction(false));
      toast.error("Cập nhập thông tin thất bại");
    }
  };
};

export const changePasswordAccountAction = (email, oldPass, newPass) => {
  return async (dispatch, getState) => {
    try {
      dispatch(loadingToggleAction(true));
      const res = await patientChangePassword(email, oldPass, newPass);
      if (res && res.success) {
        dispatch(loadingToggleAction(false));
        dispatch({
          type: actionTypes.CHANGE_PASSWORD_SUCCESS,
        });
        toast.success("Cập nhập mật khẩu thành công");
      } else {
        dispatch(loadingToggleAction(false));
        toast.error("Cập nhập mật khẩu thất bại");
      }
    } catch (error) {
      dispatch(loadingToggleAction(false));
      toast.error(error.response.data.errMessage);
    }
  };
};
// cần thay đổi api
