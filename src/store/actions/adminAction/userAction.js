import actionTypes from "../actionTypes";
import { createNewUserService } from "../../../services/userService";
import { toast } from "react-toastify";

export const createNewUser = (data) => {
  return async (dispatch, getState) => {
    try {
      const res = await createNewUserService(data);
      if (res && res.errCode === 0) {
        dispatch(saveUserSuccess(res.data));
        //   dispatch(fetchAllUserStart("All"));
        toast.success("Create A New User Succeed!");
      } else {
        dispatch(saveUserFailed());
      }
    } catch (error) {
      dispatch(saveUserFailed());
    }
  };
};
export const saveUserSuccess = () => ({
  type: actionTypes.CREATE_USER_SUCCESS,
});

export const saveUserFailed = () => ({
  type: actionTypes.CREATE_USER_FAILED,
});
