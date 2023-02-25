/* eslint-disable no-lone-blocks */
import actionTypes from "./actionTypes";

import {
  getSingleClinic,
  getAllClinic,
  createClinic,
  getAllClinicHomePatient,
} from "../../services/clinicService";
import { loadingToggleAction } from "./adminActions";

// export const loadingToggleAction = (status) => {
//   return {
//     type: actionTypes.LOADING_TOGGLE_ACTION,
//     data: status,
//   };
// };

export const getSingleClinicPatientAction = (id) => {
  return async (dispatch, getState) => {
    try {
      {
        dispatch(loadingToggleAction(true));
        const res = await getSingleClinic(id);
        if (res && res.success) {
          dispatch({
            type: actionTypes.PATIENT_GET_CLINIC_SUCCEED,
            data: res.clinic,
          });
          dispatch(loadingToggleAction(false));
        } else {
          dispatch({
            type: actionTypes.PATIENT_GET_CLINIC_FAILED,
          });
          dispatch(loadingToggleAction(false));
        }
      }
    } catch (error) {
      console.log(
        "🚀 ~ file: adminActions.js ~ line 711 ~ return ~ error",
        error
      );
      dispatch({
        type: actionTypes.PATIENT_GET_CLINIC_FAILED,
      });
    }
  };
};

export const getListClinicHomePatientAction = () => {
  return async (dispatch, getState) => {
    try {
      {
        dispatch(loadingToggleAction(true));
        const res = await getAllClinicHomePatient();
        if (res && res.success) {
          dispatch({
            type: actionTypes.PATIENT_GET_LIST_CLINIC_SUCCEED,
            data: res.clinics,
          });
          dispatch(loadingToggleAction(false));
        } else {
          dispatch({
            type: actionTypes.PATIENT_GET_LIST_CLINIC_FAILED,
          });
          dispatch(loadingToggleAction(false));
        }
      }
    } catch (error) {
      console.log("🚀 ~ file: patientAction.js:65 ~ return ~ error:", error);
      dispatch(loadingToggleAction(false));
      dispatch({
        type: actionTypes.PATIENT_GET_LIST_CLINIC_FAILED,
      });
    }
  };
};
