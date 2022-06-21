/* eslint-disable no-lone-blocks */
import actionTypes from "./actionTypes";
import {
  getAllCodeService,
  createNewUserService,
  getAllUsersService,
  deleteUserService,
} from "../../services/userService";
import { toast } from "react-toastify";
// gender

export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.FETCH_GENDER_START,
      });
      {
        const res = await getAllCodeService("gender");
        if (res && res.errCode === 0) {
          dispatch(fetchGenderSuccess(res.data));
        } else {
          dispatch(fetchGenderFailed());
        }
      }
    } catch (error) {
      console.log(
        "🚀 ~ file: adminActions.js ~ line 22 ~ return ~ error",
        error
      );
      dispatch(fetchGenderFailed());
    }
  };
};
export const fetchGenderSuccess = (genderList) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: genderList,
});
export const fetchGenderFailed = () => ({
  type: actionTypes.FETCH_GENDER_FAILED,
});

// position

export const fetchPositionStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.FETCH_POSITION_START,
      });
      {
        const res = await getAllCodeService("position");
        if (res && res.errCode === 0) {
          dispatch(fetchPositionSuccess(res.data));
        } else {
          dispatch(fetchPositionFailed());
        }
      }
    } catch (error) {
      console.log(
        "🚀 ~ file: adminActions.js ~ line 55 ~ return ~ error",
        error
      );
      dispatch(fetchPositionFailed());
    }
  };
};
export const fetchPositionSuccess = (positionList) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  data: positionList,
});
export const fetchPositionFailed = () => ({
  type: actionTypes.FETCH_POSITION_FAILED,
});

// role
export const fetchRoleStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.FETCH_ROLE_START,
      });
      {
        const res = await getAllCodeService("role");
        if (res && res.errCode === 0) {
          dispatch(fetchRoleSuccess(res.data));
        } else {
          dispatch(fetchRoleFailed());
        }
      }
    } catch (error) {
      console.log(
        "🚀 ~ file: adminActions.js ~ line 87 ~ return ~ error",
        error
      );
      dispatch(fetchRoleFailed());
    }
  };
};
export const fetchRoleSuccess = (roleList) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data: roleList,
});
export const fetchRoleFailed = () => ({
  type: actionTypes.FETCH_ROLE_FAILED,
});
// create new user
export const createNewUser = (data) => {
  return async (dispatch, getState) => {
    try {
      {
        const res = await createNewUserService(data);
        if (res && res.errCode === 0) {
          dispatch(saveUserSuccess(res.data));
          dispatch(fetchAllUserStart());
          toast.success("Create A New User Succeed!");
        } else {
          dispatch(saveUserFailed());
        }
      }
    } catch (error) {
      console.log(
        "🚀 ~ file: adminActions.js ~ line 125 ~ return ~ error",
        error
      );

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
// delete user

export const deleteUser = (id) => {
  return async (dispatch, getState) => {
    try {
      {
        const res = await deleteUserService(id);
        if (res && res.errCode === 0) {
          dispatch(deleteUserSuccess());
          toast.success("Delete User Succeed!");
        } else {
          dispatch(deleteUserFailed());
        }
      }
    } catch (error) {
      console.log(
        "🚀 ~ file: adminActions.js ~ line 119 ~ return ~ error",
        error
      );
      dispatch(deleteUserFailed());
    }
  };
};
export const deleteUserSuccess = () => ({
  type: actionTypes.DELETE_USER_SUCCESS,
});

export const deleteUserFailed = () => ({
  type: actionTypes.DELETE_USER_FAILED,
});

// fetch all user
export const fetchAllUserStart = () => {
  return async (dispatch, getState) => {
    try {
      {
        const res = await getAllUsersService("All");
        console.log(
          "🚀 ~ file: adminActions.js ~ line 144 ~ return ~ res",
          res.user
        );
        if (res && res.errCode === 0) {
          dispatch(fetchAllUserSuccess(res.user.reverse()));
        } else {
          dispatch(fetchAllUserFailed());
        }
      }
    } catch (error) {
      console.log(
        "🚀 ~ file: adminActions.js ~ line 150 ~ return ~ error",
        error
      );
      dispatch(fetchAllUserFailed());
    }
  };
};
export const fetchAllUserSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_USERS_SUCCESS,
  users: data,
});
export const fetchAllUserFailed = () => ({
  type: actionTypes.FETCH_ALL_USERS_FAILED,
});
