import actionTypes from "./actionTypes";

import { patientLogin } from "../../services/patientService";

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

// cần thay đổi api
