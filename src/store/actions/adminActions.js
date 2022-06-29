/* eslint-disable no-lone-blocks */
import actionTypes from "./actionTypes";
import {
  getAllCodeService,
  createNewUserService,
  getAllUsersService,
  deleteUserService,
  getAllDoctorService,
  editUserService,
  postDetailDoctorService,
  getTopDoctorHomeService,
  getDetailInfoDoctor,
  saveBulkScheduleDoctor,
  getScheduleService,
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
        const uses = await getAllCodeService("gender");
        if (uses && uses.errCode === 0) {
          dispatch(fetchGenderSuccess(uses.data));
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
          dispatch(fetchAllUserStart());
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

// edit user

export const editUser = (user) => {
  return async (dispatch, getState) => {
    try {
      {
        const res = await editUserService(user);
        if (res && res.errCode === 0) {
          dispatch(editUserSuccess());
          toast.success("Edit User Succeed!");
          dispatch(fetchAllUserStart());
        } else {
          dispatch(editUserFailed());
        }
      }
    } catch (error) {
      console.log(
        "🚀 ~ file: adminActions.js ~ line 215 ~ return ~ error",
        error
      );

      dispatch(editUserFailed());
    }
  };
};
export const editUserSuccess = () => ({
  type: actionTypes.EDIT_USER_SUCCESS,
});

export const editUserFailed = () => ({
  type: actionTypes.EDIT_USER_FAILED,
});

// fetch all top doctor home
/* export const fetchTopDoctor = (limit) => {
  return async (dispatch, getState) => {
    try {
      const res = await getTopDoctorHomeService(limit);
      if (res && res.errCode === 0) {
        dispatch(fetchAllDoctorSuccess(res.data));
      }
    } catch (error) {
      console.log(
        "🚀 ~ file: adminActions.js ~ line 243 ~ return ~ error",
        error
      );
      dispatch(fetchAllDoctorFailed());
    }
  };
}; */
export const fetchTopDoctor = () => {
  return async (dispatch, getState) => {
    try {
      const res = await getTopDoctorHomeService();
      if (res && res.errCode === 0) {
        dispatch(fetchAllDoctorSuccess(res.data));
      }
    } catch (error) {
      console.log(
        "🚀 ~ file: adminActions.js ~ line 243 ~ return ~ error",
        error
      );
      dispatch(fetchAllDoctorFailed());
    }
  };
};
export const fetchAllDoctorSuccess = (data) => ({
  type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
  data: data,
});

export const fetchAllDoctorFailed = () => ({
  type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
});
// fetch all doctor

export const fetchAllDoctor = () => {
  return async (dispatch, getState) => {
    try {
      const res = await getAllDoctorService();
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
          data: res,
        });
      }
    } catch (error) {
      console.log(
        "🚀 ~ file: adminActions.js ~ line 289 ~ return ~ error",
        error
      );
      dispatch({
        type: actionTypes.FETCH_ALL_DOCTOR_FAILED,
      });
    }
  };
};

// post detail doctor
export const createDetailDoctor = (data) => {
  return async (dispatch, getState) => {
    try {
      {
        const res = await postDetailDoctorService(data);
        if (res && res.errCode === 0) {
          dispatch({ type: actionTypes.POST_DETAIL_DOCTOR_SUCCESS });
          toast.success("Create Detail Doctor Succeed!");
        } else {
          toast.error("Create Detail Doctor Failed!");
          dispatch({
            type: actionTypes.POST_DETAIL_DOCTOR_FAILED,
          });
        }
      }
    } catch (error) {
      console.log(
        "🚀 ~ file: adminActions.js ~ line 318 ~ return ~ error",
        error
      );
      toast.error("Create Detail Doctor Failed!");
      dispatch({
        type: actionTypes.POST_DETAIL_DOCTOR_FAILED,
      });
    }
  };
};
// get detail doctor
export const fetchDetaiInfoDoctor = (id) => {
  return async (dispatch, getState) => {
    try {
      {
        const res = await getDetailInfoDoctor(id);
        if (res && res.errCode === 0) {
          dispatch({
            type: actionTypes.GET_DETAIL_DOCTOR_SUCCESS,
            data: res.data,
          });
        } else {
          toast.error("Get Detail Doctor Failed!");
          dispatch({
            type: actionTypes.GET_DETAIL_DOCTOR_FAILED,
          });
        }
      }
    } catch (error) {
      console.log(
        "🚀 ~ file: adminActions.js ~ line 347 ~ return ~ error",
        error
      );
      toast.error("Get Detail Doctor Failed!");
      dispatch({
        type: actionTypes.GET_DETAIL_DOCTOR_FAILED,
      });
    }
  };
};

// fetch hour doctor

export const fetchAllScheduleTime = () => {
  return async (dispatch, getState) => {
    try {
      const res = await getAllCodeService("time");
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.GET_SCHEDULE_TIME_SUCCESS,
          data: res,
        });
      }
    } catch (error) {
      console.log(
        "🚀 ~ file: adminActions.js ~ line 289 ~ return ~ error",
        error
      );
      dispatch({
        type: actionTypes.GET_SCHEDULE_TIME_FAILED,
      });
    }
  };
};

// create bulk schedule doctor time
export const createBulkScheduleDoctor = (data) => {
  return async (dispatch, getState) => {
    try {
      const res = await saveBulkScheduleDoctor(data);
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.POST_BULK_SCHEDULE_SUCCESS,
        });
        toast.success("Save Schedule Time Succeed!");
      }
    } catch (error) {
      console.log(
        "🚀 ~ file: adminActions.js ~ line 398 ~ return ~ error",
        error
      );
      dispatch({
        type: actionTypes.POST_BULK_SCHEDULE_FAILED,
      });
      toast.error("Save Schedule Time Failed!");
    }
  };
};

// get schedule with doctorId , date
export const fetchScheduleWithConditional = (doctorid, date) => {
  return async (dispatch, getState) => {
    try {
      const res = await getScheduleService(doctorid, date);
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.GET_SCHEDULE_WITH_CONDITIONAL_SUCCESS,
          data: res.data,
        });
      }
    } catch (error) {
      console.log(
        "🚀 ~ file: adminActions.js ~ line 423 ~ return ~ error",
        error
      );
      dispatch({
        type: actionTypes.GET_SCHEDULE_WITH_CONDITIONAL_FAILED,
      });
      toast.error("Fetch Schedule Failed!");
    }
  };
};
