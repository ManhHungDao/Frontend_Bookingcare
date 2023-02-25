/* eslint-disable no-lone-blocks */
import actionTypes from "./actionTypes";
import {
  createNewUserService,
  getAllUser,
  deleteUserService,
  getAllDoctorService,
  editUserService,
  getTopDoctorHomeService,
  getDetailInfoDoctor,
  saveBulkScheduleDoctor,
  getScheduleService,
  postBookAppointmentService,
  postVerifyBooingService,
  getListSpecialtyByClinicIdService,
  getSpecialties,
  getSpecialty,
  getListDoctorSpecialty,
  getListSpecialty,
  getListDetailHandbookService,
} from "../../services/userService";
import {
  getSingleClinic,
  getAllClinic,
  createClinic,
} from "../../services/clinicService";
import {
  getSingleSpecialty,
  getAllSpecialty,
  createSpecialty,
} from "../../services/specialtySerivce.js";
import { getListALlcodes } from "../../services/allcodeService";
import { TYPE } from "../../utils/constant";
import { toast } from "react-toastify";

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
      }
    } catch (error) {
      dispatch({
        type: actionTypes.FETCH_ALLCODE_FAILED,
      });
      toast.error("Lấy tất cả mã thất bại");
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
            data: "Tạo người dùng thành công",
          });
          // dispatch(fetchAllUserStart("All"));
          dispatch(loadingToggleAction(false));
        }
      }
    } catch (error) {
      dispatch(loadingToggleAction(false));
      dispatch({
        type: actionTypes.CREATE_FAILED,
        data: "Tạo người dùng thất bại",
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
          // dispatch(fetchAllUserStart("All"));
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
export const getAllUserAction = (type) => {
  return async (dispatch, getState) => {
    try {
      {
        dispatch(loadingToggleAction(true));
        const res = await getAllUser(type);
        if (res && res.success) {
          dispatch(loadingToggleAction(false));
          dispatch({
            type: actionTypes.FETCH_ALL_USERS_SUCCESS,
            users: res.users,
          });
        }
      }
    } catch (error) {
      dispatch(loadingToggleAction(false));
      dispatch({
        type: actionTypes.FETCH_ALL_USERS_FAILED,
      });
    }
  };
};

export const editUser = (user) => {
  return async (dispatch, getState) => {
    try {
      {
        const res = await editUserService(user);
        if (res && res.errCode === 0) {
          dispatch(editUserSuccess());
          toast.success("Edit User Succeed!");
          // dispatch(fetchAllUserStart("All"));
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

export const createSpecialtyAction = (data) => {
  console.log(
    "🚀 ~ file: adminActions.js:336 ~ createSpecialtyAction ~ data",
    data
  );
  return async (dispatch, getState) => {
    try {
      {
        dispatch(loadingToggleAction(true));
        const res = await createSpecialty(data);
        if (res && res.success) {
          dispatch({
            type: actionTypes.CREATE_SUCCESS,
            data: "Tạo chuyên khoa thành công",
          });
          dispatch(loadingToggleAction(false));
        }
      }
    } catch (error) {
      dispatch(loadingToggleAction(false));
      dispatch({
        type: actionTypes.CREATE_FAILED,
        data: "Tạo chuyên khoa thất bại",
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
export const getListClinicAction = () => {
  return async (dispatch, getState) => {
    try {
      {
        dispatch(loadingToggleAction(true));
        const res = await getAllClinic();
        if (res && res.success) {
          dispatch({
            type: actionTypes.GET_LIST_CLINIC_SUCCEED,
            data: res.clinics,
          });
          dispatch(loadingToggleAction(false));
        } else {
          toast.error("Lấy danh sách thất bại");
          dispatch({
            type: actionTypes.GET_LIST_CLINIC_FAILED,
          });
          dispatch(loadingToggleAction(false));
        }
      }
    } catch (error) {
      dispatch(loadingToggleAction(false));
      toast.error("Lấy danh sách thất bại");
      dispatch({
        type: actionTypes.GET_LIST_CLINIC_FAILED,
      });
    }
  };
};

export const getSingleClinicAction = () => {
  return async (dispatch, getState) => {
    try {
      {
        const res = await getSingleClinic();
        if (res && res.success) {
          dispatch({
            type: actionTypes.GET_CLINIC_SUCCEED,
            data: res.user,
          });
        } else {
          toast.error("Get List Clinic Home Failed!");
          dispatch({
            type: actionTypes.GET_CLINIC_FAILED,
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
        type: actionTypes.GET_CLINIC_FAILED,
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
            data: "Tạo phòng khám thành công",
          });
          dispatch(loadingToggleAction(false));
        }
      }
    } catch (error) {
      dispatch(loadingToggleAction(false));
      dispatch({
        type: actionTypes.CREATE_FAILED,
        data: "Tạo phòng khám thất bại",
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
