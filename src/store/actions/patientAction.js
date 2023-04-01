/* eslint-disable no-lone-blocks */
import actionTypes from "./actionTypes";
import {
  getSingleClinic,
  getAllClinicHomePatient,
} from "../../services/clinicService";
import {
  getPopularHomePatient,
  getSingleSpecialty,
} from "../../services/specialtySerivce";
import {
  getAllHandbookHomePatient,
  getSingleHandbook,
} from "../../services/handbookService";
import { getAllUserHomePatient } from "../../services/userService";
import {
  createUserBookingSchedule,
  sentMailPatient,
} from "../../services/scheduleService";
import { getAllPacket } from "../../services/packetService";

import { loadingToggleAction } from "./adminActions";
import { toast } from "react-toastify";

// CLINIC
export const getSingleClinicPatientAction = (id) => {
  return async (dispatch, getState) => {
    try {
      {
        // dispatch(loadingToggleAction(true));
        const res = await getSingleClinic(id);
        if (res && res.success) {
          dispatch({
            type: actionTypes.PATIENT_GET_CLINIC_SUCCEED,
            data: res.clinic,
          });
          // dispatch(loadingToggleAction(false));
        } else {
          dispatch({
            type: actionTypes.PATIENT_GET_CLINIC_FAILED,
          });
          // dispatch(loadingToggleAction(false));
        }
      }
    } catch (error) {
      dispatch({
        type: actionTypes.PATIENT_GET_CLINIC_FAILED,
      });
    }
  };
};

export const getListClinicHomePatientAction = () => {
  return async (dispatch, getState) => {
    try {
      // dispatch(loadingToggleAction(true));
      const res = await getAllClinicHomePatient();
      if (res && res.success) {
        // dispatch(loadingToggleAction(false));
        dispatch({
          type: actionTypes.PATIENT_GET_LIST_CLINIC_SUCCEED,
          data: res.clinics,
        });
      }
    } catch (error) {
      // dispatch(loadingToggleAction(false));
      dispatch({
        type: actionTypes.PATIENT_GET_LIST_CLINIC_FAILED,
      });
    }
  };
};

// SPECIALTY

export const getListSpecialtyHomePatientAction = (name) => {
  return async (dispatch, getState) => {
    try {
      // dispatch(loadingToggleAction(true));
      const res = await getPopularHomePatient(name);
      if (res && res.success) {
        // dispatch(loadingToggleAction(false));
        dispatch({
          type: actionTypes.PATIENT_GET_LIST_SPECIALTY_SUCCEED,
          data: res.specialties,
        });
      }
    } catch (error) {
      // dispatch(loadingToggleAction(false));
      dispatch({
        type: actionTypes.PATIENT_GET_LIST_SPECIALTY_FAILED,
      });
    }
  };
};

export const getSingleSpecialtyPatientAction = (id) => {
  return async (dispatch, getState) => {
    try {
      // dispatch(loadingToggleAction(true));
      const res = await getSingleSpecialty(id);
      if (res && res.success) {
        // dispatch(loadingToggleAction(false));
        dispatch({
          type: actionTypes.PATIENT_SINGLE_SPECIALTY_SUCCEED,
          data: res.specialty,
        });
      }
    } catch (error) {
      // dispatch(loadingToggleAction(false));
      dispatch({
        type: actionTypes.PATIENT_SINGLE_SPECIALTY_FAILED,
      });
    }
  };
};

// USER
export const getListUserHomePatientAction = (name) => {
  return async (dispatch, getState) => {
    try {
      // dispatch(loadingToggleAction(true));
      const res = await getAllUserHomePatient(name);
      if (res && res.success) {
        // dispatch(loadingToggleAction(false));
        dispatch({
          type: actionTypes.PATIENT_GET_LIST_USER_SUCCEED,
          data: res.users,
        });
      }
    } catch (error) {
      // dispatch(loadingToggleAction(false));
      dispatch({
        type: actionTypes.PATIENT_GET_LIST_USER_FAILED,
      });
    }
  };
};

// SCHEDULE
export const createUserBookingScheduleAction = (data) => {
  return async (dispatch, getState) => {
    try {
      dispatch(loadingToggleAction(true));
      const res = await createUserBookingSchedule(data);
      if (res && res.success) {
        dispatch(loadingToggleAction(false));
        dispatch({
          type: actionTypes.CREATE_SCHEDULE_PATIENT_SUCCESS,
        });
        // toast.success("Khởi tạo lịch khám thành công");
      } else {
        dispatch(loadingToggleAction(false));
        dispatch({
          type: actionTypes.CREATE_SCHEDULE_PATIENT_FAILED,
        });
        toast.error("Khởi tạo lịch khám thất bại");
      }
    } catch (error) {
      dispatch(loadingToggleAction(false));
      dispatch({
        type: actionTypes.CREATE_SCHEDULE_PATIENT_FAILED,
      });
      toast.error("Khởi tạo lịch khám thất bại");
    }
  };
};

// HANBOOK

export const getAllHandbookHomePatientAction = () => {
  return async (dispatch, getState) => {
    try {
      // dispatch(loadingToggleAction(true));
      const res = await getAllHandbookHomePatient();
      if (res && res.success) {
        // dispatch(loadingToggleAction(false));
        dispatch({
          type: actionTypes.GET_LIST_HANDBOOK_HOME_SUCCEED,
          data: res.handbooks,
        });
      }
    } catch (error) {
      // dispatch(loadingToggleAction(false));
      dispatch({
        type: actionTypes.GET_LIST_HANDBOOK_HOME_FAILED,
      });
    }
  };
};

export const getSingleHandbookAction = (id) => {
  return async (dispatch, getState) => {
    try {
      // dispatch(loadingToggleAction(true));
      const res = await getSingleHandbook(id);
      if (res && res.success) {
        // dispatch(loadingToggleAction(false));
        dispatch({
          type: actionTypes.GET_SINGLE_HANDBOOK_SUCCEED,
          data: res.handbook,
        });
      }
    } catch (error) {
      // dispatch(loadingToggleAction(false));
      dispatch({
        type: actionTypes.GET_SINGLE_HANDBOOK_FAILED,
      });
    }
  };
};

// PACKET

export const getAllPacketPatientHomeAction = (data) => {
  return async (dispatch, getState) => {
    try {
      // dispatch(loadingToggleAction(true));
      const res = await getAllPacket(data);
      if (res && res.success) {
        // dispatch(loadingToggleAction(false));
        dispatch({
          type: actionTypes.GET_ALL_PACKET_HOME_SUCCESS,
          data: {
            list: res.packets,
            count: res.count,
          },
        });
      }
    } catch (error) {
      // dispatch(loadingToggleAction(false));
      dispatch({
        type: actionTypes.GET_ALL_PACKET_HOME_FAILED,
      });
    }
  };
};

// EMAIL

export const sentMailConfirmAction = (data) => {
  return async (dispatch, getState) => {
    try {
      dispatch(loadingToggleAction(true));
      const res = await sentMailPatient(data);
      if (res && res.success) {
        dispatch(loadingToggleAction(false));
      }
    } catch (error) {
      dispatch(loadingToggleAction(false));
      toast.error("Gửi thư thất bại");
    }
  };
};
