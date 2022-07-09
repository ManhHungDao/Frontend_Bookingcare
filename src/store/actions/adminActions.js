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
  postSubDetailDocTorService,
  getTopDoctorHomeService,
  getExtraInfoDoctorService,
  getDetailInfoDoctor,
  saveBulkScheduleDoctor,
  getScheduleService,
  postBookAppointmentService,
  postVerifyBooingService,
  postASpecialty,
} from "../../services/userService";
import { TYPE } from "../../utils/constant";

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
      toast.error("Create Detail Doctor Failed!");
      dispatch({
        type: actionTypes.POST_DETAIL_DOCTOR_FAILED,
      });
    }
  };
};

// post sub detail doctor
export const createSubDetailDoctor = (data) => {
  return async (dispatch, getState) => {
    try {
      {
        const res = await postSubDetailDocTorService(data);
        if (res && res.errCode === 0) {
          dispatch({ type: actionTypes.POST_SUB_DETAIL_DOCTOR_SUCCESS });
        } else {
          toast.error("Create Sub Detail Doctor Failed!");
          dispatch({
            type: actionTypes.POST_SUB_DETAIL_DOCTOR_FAILED,
          });
        }
      }
    } catch (error) {
      toast.error("Create Sub Detail Doctor Failed!");
      dispatch({
        type: actionTypes.POST_SUB_DETAIL_DOCTOR_FAILED,
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
      dispatch({
        type: actionTypes.GET_SCHEDULE_WITH_CONDITIONAL_FAILED,
      });
      toast.error("Fetch Schedule Failed!");
    }
  };
};

// fetch info doctor
export const fetchInfoDoctor = (type) => {
  let typeSucceed = "",
    typeFailed = "";
  if (type === TYPE.PRICE) {
    typeSucceed = actionTypes.GET_DOCTOR_PRICE_SUCCEED;
    typeFailed = actionTypes.GET_DOCTOR_PRICE_FAILED;
  } else if (type === TYPE.PAYMENT) {
    typeSucceed = actionTypes.GET_DOCTOR_PAYMENT_SUCCEED;
    typeFailed = actionTypes.GET_DOCTOR_PAYMENT_FAILED;
  } else if (type === TYPE.PROVINCE) {
    typeSucceed = actionTypes.GET_DOCTOR_PROVINCE_SUCCEED;
    typeFailed = actionTypes.GET_DOCTOR_PROVINCE_FAILED;
  }
  return async (dispatch, getState) => {
    await getAllCodeService(type)
      .then((result) => {
        dispatch({
          type: typeSucceed,
          data: result.data,
        });
      })
      .catch(() => {
        dispatch({
          type: typeFailed,
        });
        toast.error(`Fetch ${type} Failed!`);
      });
  };
};

// fetch extra info doctor
export const fetchExtraInfoDoctor = (id) => {
  return async (dispatch, getState) => {
    try {
      {
        const res = await getExtraInfoDoctorService(id);
        if (res && res.errCode === 0) {
          dispatch({
            type: actionTypes.GET_EXTRA_INFO_DOCTOR_SUCCEED,
            data: res.data,
          });
        } else {
          toast.error("Get Extra Info Doctor Failed!");
          dispatch({
            type: actionTypes.GET_EXTRA_INFO_DOCTOR_FAILED,
          });
        }
      }
    } catch (error) {
      toast.error("Get Extra Info Doctor Failed!");
      dispatch({
        type: actionTypes.GET_EXTRA_INFO_DOCTOR_FAILED,
      });
    }
  };
};

// post booking appointment

export const createBookingAppointment = (data) => {
  return async (dispatch, getState) => {
    try {
      {
        const res = await postBookAppointmentService(data);
        if (res && res.errCode === 0) {
          dispatch({ type: actionTypes.POST_BOOKING_APPOINTMENT_SUCCEED });
          toast.success("Post Booking Appointment Doctor Succeed!");
        } else {
          toast.error("Post Booking Appointment Doctor Failed!");
          dispatch({
            type: actionTypes.POST_BOOKING_APPOINTMENT_FAILED,
          });
        }
      }
    } catch (error) {
      console.log(
        "🚀 ~ file: adminActions.js ~ line 481 ~ return ~ error",
        error
      );
      toast.error("Post Booking Appointment Doctor Failed!");
      dispatch({
        type: actionTypes.POST_BOOKING_APPOINTMENT_FAILED,
      });
    }
  };
};
// post verify booking appointment
export const verifyBookingAppointment = (data) => {
  return async (dispatch, getState) => {
    try {
      {
        let status = false;
        const res = await postVerifyBooingService(data);
        if (res && res.errCode === 0) {
          // status = true;
          dispatch({
            type: actionTypes.POST_VERIFY_BOOKING_APPOINTMENT_SUCCEED,
            data: true,
          });
          // toast.success("Verify Booking Appointment Doctor Succeed!");
        } else {
          // toast.error("Verify Booking Appointment Doctor Failed!");
          dispatch({
            type: actionTypes.POST_VERIFY_BOOKING_APPOINTMENT_FAILED,
            data: false,
          });
        }
      }
    } catch (error) {
      console.log(
        "🚀 ~ file: adminActions.js ~ line 510 ~ return ~ error",
        error
      );
      toast.error("Verify Booking Appointment Doctor Failed!");
      dispatch({
        type: actionTypes.POST_VERIFY_BOOKING_APPOINTMENT_FAILED,
      });
    }
  };
};

// post new specialty

export const createASpecialty = (data) => {
  return async (dispatch, getState) => {
    try {
      {
        const res = await postASpecialty(data);
        if (res && res.errCode === 0) {
          dispatch({ type: actionTypes.POST_SPECIALTY_SUCCEED });
          toast.success("Create A New Specialty Succeed!");
        } else {
          toast.error("Create A New Specialty Failed!");
          dispatch({
            type: actionTypes.POST_SPECIALTY_FAILED,
          });
        }
      }
    } catch (error) {
      console.log(
        "🚀 ~ file: adminActions.js ~ line 545 ~ return ~ error",
        error
      );
      toast.error("Create A New Specialty Failed!");
      dispatch({
        type: actionTypes.POST_SPECIALTY_FAILED,
      });
    }
  };
};
