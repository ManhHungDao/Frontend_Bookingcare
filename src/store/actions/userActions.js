import actionTypes from "./actionTypes";
import { loginApiService } from "../../services/userService";
import { loadingToggleAction } from "./adminActions";
import { toast } from "react-toastify";

export const addUserSuccess = () => ({
  type: actionTypes.ADD_USER_SUCCESS,
});

export const userLoginSuccess = (userInfo) => ({
  type: actionTypes.USER_LOGIN_SUCCESS,
  userInfo: userInfo,
});
export const userLoginFail = () => ({
  type: actionTypes.USER_LOGIN_FAIL,
});

export const processLogout = () => ({
  type: actionTypes.PROCESS_LOGOUT,
});

export const loginAction = (email, password) => {
  return async (dispatch, getState) => {
    try {
      dispatch(loadingToggleAction(true));
      const res = await loginApiService(email, password);
      if (res && res.success) {
        dispatch(loadingToggleAction(false));
        dispatch(userLoginSuccess(res.user));
      }
    } catch (error) {
      console.log("🚀 ~ file: userActions.js:35 ~ return ~ error:", error);
      toast.error("Đăng nhập thất bại, kiểm tra lại thông tin!");
      dispatch(loadingToggleAction(false));
    }
  };
};
