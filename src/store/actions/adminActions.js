/* eslint-disable no-lone-blocks */
import actionTypes from "./actionTypes";
import {
  getAllCodeService,
  createNewUserService,
  getAllUsersService,
  deleteUserService,
  getAllDoctorService,
  editUserService,
  getTopDoctorHomeService,
  getExtraInfoDoctorService,
  getDetailInfoDoctor,
  saveBulkScheduleDoctor,
  getScheduleService,
  postBookAppointmentService,
  postVerifyBooingService,
  getListSpecialtyByClinicIdService,
  postASpecialty,
  getSpecialties,
  getSpecialty,
  getListDoctorSpecialty,
  getListSpecialty,
  getListClinic,
  getListClinicHomeService,
  getListDetailHandbookService,
} from "../../services/userService";
import {
  getSingleClinic,
  getAllClinic,
  createClinic,
} from "../../services/clinicService";
import { getListALlcodes } from "../../services/allcodeService";
import { TYPE } from "../../utils/constant";
import { toast } from "react-toastify";
// gender
export const loadingToggleAction = (status) => {
  return {
    type: actionTypes.LOADING_TOGGLE_ACTION,
    data: status,
  };
};

export const fetchAllcodeAction = () => {
  return async (dispatch, getState) => {
    try {
      const res = await getListALlcodes();
      if (res && res.success) {
        dispatch({
          type: actionTypes.FETCH_ALLCODE_SUCCESS,
          data: res.allcodes,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALLCODE_FAILED,
        });
        toast.success("Get Allcode Failed!");
      }
    } catch (error) {
      dispatch({
        type: actionTypes.FETCH_ALLCODE_FAILED,
      });
      toast.success("Get Allcode Failed!");
    }
  };
};

// create new user
export const createNewUserAction = (data) => {
  return async (dispatch, getState) => {
    try {
      {
        dispatch(loadingToggleAction(true));
        const res = await createNewUserService(data);
        if (res && res.success) {
          dispatch({
            type: actionTypes.CREATE_SUCCESS,
            data: "Create A New User Succeed!",
          });
          // dispatch(fetchAllUserStart("All"));
          dispatch(loadingToggleAction(false));
        } else {
          dispatch(loadingToggleAction(false));
          dispatch({
            type: actionTypes.CREATE_FAILED,
            data: "Create A New User Failed!",
          });
        }
      }
    } catch (error) {
      dispatch(loadingToggleAction(false));
      dispatch({
        type: actionTypes.CREATE_FAILED,
        data: "Create A New User Failed!",
      });
    }
  };
};

// delete user

export const deleteUser = (id) => {
  return async (dispatch, getState) => {
    try {
      {
        const res = await deleteUserService(id);
        if (res && res.errCode === 0) {
          dispatch(deleteUserSuccess());
          toast.success("Delete User Succeed!");
          dispatch(fetchAllUserStart("All"));
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
export const fetchAllUserStart = (type) => {
  return async (dispatch, getState) => {
    try {
      {
        const res = await getAllUsersService(type);
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
          dispatch(fetchAllUserStart("All"));
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

export const fetchTopDoctor = () => {
  return async (dispatch, getState) => {
    try {
      const res = await getTopDoctorHomeService(20);
      if (res && res.errCode === 0) {
        dispatch(fetchAllDoctorSuccess(res.data));
      }
    } catch (error) {
      console.log(
        "🚀 ~ file: adminActions.js ~ line 247 ~ return ~ error",
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
          data: res.data,
        });
      }
    } catch (error) {
      dispatch({
        type: actionTypes.FETCH_ALL_DOCTOR_FAILED,
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
          data: res.data,
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
          toast.success("Booking Appointment Doctor Succeed!");
        } else {
          toast.error("Booking Appointment Doctor Failed!");
          dispatch({
            type: actionTypes.POST_BOOKING_APPOINTMENT_FAILED,
          });
        }
      }
    } catch (error) {
      toast.error("Booking Appointment Doctor Failed!");
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
          dispatch({ type: actionTypes.CREATE_SUCCESS });
          toast.success("Create A New Specialty Succeed!");
        } else {
          toast.error("Create A New Specialty Failed!");
          dispatch({
            type: actionTypes.CREATE_FAILED,
          });
        }
      }
    } catch (error) {
      toast.error("Create A New Specialty Failed!");
      dispatch({
        type: actionTypes.CREATE_FAILED,
      });
    }
  };
};

// get specialties

export const getSpecialtiesHome = () => {
  return async (dispatch, getState) => {
    try {
      {
        const res = await getSpecialties();
        if (res && res.errCode === 0) {
          dispatch({
            type: actionTypes.GET_SPECIALTIES_SUCCEED,
            data: res.data,
          });
          // toast.success("Get List Specialty Succeed!");
        } else {
          toast.error("Get List Specialty Home Failed!");
          dispatch({
            type: actionTypes.GET_SPECIALTIES_FAILED,
          });
        }
      }
    } catch (error) {
      console.log(
        "🚀 ~ file: adminActions.js ~ line 576 ~ return ~ error",
        error
      );
      toast.error("Get List Specialty Home Failed!");
      dispatch({
        type: actionTypes.GET_SPECIALTIES_FAILED,
      });
    }
  };
};
// get list specialty
export const getListSpecialtyAdmin = () => {
  return async (dispatch, getState) => {
    try {
      {
        const res = await getListSpecialty();
        if (res && res.errCode === 0) {
          dispatch({
            type: actionTypes.GET_LIST_SPECIALTY_SUCCEED,
            data: res.data,
          });
        } else {
          toast.error("Get List Specialty Admin Failed!");
          dispatch({
            type: actionTypes.GET_LIST_SPECIALTY_FAILED,
          });
        }
      }
    } catch (error) {
      toast.error("Get List Specialty Admin Failed!");
      dispatch({
        type: actionTypes.GET_LIST_SPECIALTY_FAILED,
      });
    }
  };
};

// get detail specialty
export const getDetailSpecialtyHome = (specialtyId) => {
  return async (dispatch, getState) => {
    try {
      {
        const res = await getSpecialty(specialtyId);
        if (res && res.errCode === 0) {
          dispatch({
            type: actionTypes.GET_DETAIL_SPECIALTY_SUCCEED,
            data: res.data,
          });
        } else {
          toast.error("Get Detail Specialty Home Failed!");
          dispatch({
            type: actionTypes.GET_DETAIL_SPECIALTY_FAILED,
          });
        }
      }
    } catch (error) {
      toast.error("Get Detail Specialty Home Failed!");
      dispatch({
        type: actionTypes.GET_DETAIL_SPECIALTY_FAILED,
      });
    }
  };
};

// get list doctor specialty
export const getListDoctorSpecialtyHome = (data) => {
  return async (dispatch, getState) => {
    try {
      {
        const res = await getListDoctorSpecialty(data);
        if (res && res.errCode === 0) {
          dispatch({
            type: actionTypes.GET_LIST_DOCTOR_SPECIALTY_SUCCEED,
            data: res.data,
          });
        } else {
          toast.error("Get List Doctor Specialty Home Failed!");
          dispatch({
            type: actionTypes.GET_LIST_DOCTOR_SPECIALTY_FAILED,
          });
        }
      }
    } catch (error) {
      toast.error("Get List Doctor Specialty Home Failed!");
      dispatch({
        type: actionTypes.GET_LIST_DOCTOR_SPECIALTY_FAILED,
      });
    }
  };
};

// get list clinic admin
export const getListClinicAdmin = () => {
  return async (dispatch, getState) => {
    try {
      {
        const res = await getListClinic();
        if (res && res.errCode === 0) {
          dispatch({
            type: actionTypes.GET_LIST_CLINIC_SUCCEED,
            data: res.data,
          });
        } else {
          toast.error("Get List Clinic Admin Failed!");
          dispatch({
            type: actionTypes.GET_LIST_CLINIC_FAILED,
          });
        }
      }
    } catch (error) {
      toast.error("Get List Clinic Admin Failed!");
      dispatch({
        type: actionTypes.GET_LIST_CLINIC_FAILED,
      });
    }
  };
};

// get list clinic home
export const getListClinicHome = () => {
  return async (dispatch, getState) => {
    try {
      {
        const res = await getListClinicHomeService();
        if (res && res.errCode === 0) {
          dispatch({
            type: actionTypes.GET_LIST_CLINIC_HOME_SUCCEED,
            data: res.data,
          });
        } else {
          toast.error("Get List Clinic Home Failed!");
          dispatch({
            type: actionTypes.GET_LIST_CLINIC_HOME_FAILED,
          });
        }
      }
    } catch (error) {
      console.log(
        "🚀 ~ file: adminActions.js ~ line 711 ~ return ~ error",
        error
      );
      toast.error("Get List Clinic Home Failed!");
      dispatch({
        type: actionTypes.GET_LIST_CLINIC_HOME_FAILED,
      });
    }
  };
};

// GET LIST SPECIALTY BY CLINIC ID
export const getListSpecialtyByClinicId = (id) => {
  return async (dispatch, getState) => {
    try {
      {
        const res = await getListSpecialtyByClinicIdService(id);
        if (res && res.errCode === 0) {
          dispatch({
            type: actionTypes.GET_LIST_SPECIALTY_BY_CLINICID_SUCCEED,
            data: res.data,
          });
        } else {
          toast.error("Get List Clinic By ClinicId Failed!");
          dispatch({
            type: actionTypes.GET_LIST_SPECIALTY_BY_CLINICID_FAILED,
          });
        }
      }
    } catch (error) {
      toast.error("Get List Clinic By ClinicId Failed!");
      dispatch({
        type: actionTypes.GET_LIST_SPECIALTY_BY_CLINICID_FAILED,
      });
    }
  };
};

// create clinic
export const createClinicAction = (data) => {
  return async (dispatch, getState) => {
    try {
      {
        dispatch(loadingToggleAction(true));
        const res = await createClinic(data);
        if (res && res.success) {
          dispatch({
            type: actionTypes.CREATE_SUCCESS,
            data: "Create Clinic Success",
          });
          dispatch(loadingToggleAction(false));
        } else {
          dispatch(loadingToggleAction(false));
          dispatch({
            type: actionTypes.CREATE_FAILED,
            data: "Create Clinic Failed!",
          });
        }
      }
    } catch (error) {
      dispatch(loadingToggleAction(false));
      dispatch({
        type: actionTypes.CREATE_FAILED,
        data: "Create Clinic Failed!",
      });
    }
  };
};

// GET LIST DETAIL HAND BOOK

export const getListDetialHandbook = (id) => {
  return async (dispatch, getState) => {
    try {
      {
        const res = await getListDetailHandbookService(id);
        if (res && res.errCode === 0) {
          dispatch({
            type: actionTypes.GET_LIST_DETAIL_HANDBOOK_SUCCEED,
            data: res.data,
          });
        } else {
          toast.error("Get Detail Handbook Failed!");
          dispatch({
            type: actionTypes.GET_LIST_DETAIL_HANDBOOK_FAILED,
          });
        }
      }
    } catch (error) {
      console.log(
        "🚀 ~ file: adminActions.js ~ line 823 ~ return ~ error",
        error
      );
      toast.error("Get Detail Handbook Failed!");
      dispatch({
        type: actionTypes.GET_LIST_DETAIL_HANDBOOK_FAILED,
      });
    }
  };
};
