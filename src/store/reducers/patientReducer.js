import actionTypes from "../actions/actionTypes";
const initialState = {
  listClinic: [],
  listSpecialty: [],
  clinic: {},
  specialty: {},
};

const patientReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PATIENT_GET_LIST_CLINIC_SUCCEED: {
      state.listClinic = action.data;
      return { ...state };
    }
    case actionTypes.PATIENT_GET_LIST_CLINIC_FAILED: {
      state.listClinic = [];
      return {
        ...state,
      };
    }
    case actionTypes.PATIENT_GET_CLINIC_SUCCEED: {
      state.clinic = action.data;
      return { ...state };
    }
    case actionTypes.PATIENT_GET_CLINIC_FAILED: {
      state.clinic = {};
      return {
        ...state,
      };
    }
    case actionTypes.PATIENT_GET_LIST_SPECIALTY_SUCCEED: {
      state.listSpecialty = action.data;
      return { ...state };
    }
    case actionTypes.PATIENT_GET_LIST_SPECIALTY_FAILED: {
      state.listSpecialty = [];
      return {
        ...state,
      };
    }
    case actionTypes.PATIENT_SINGLE_SPECIALTY_SUCCEED: {
      state.specialty = action.data;
      return { ...state };
    }
    case actionTypes.PATIENT_SINGLE_SPECIALTY_FAILED: {
      state.specialty = {};
      return {
        ...state,
      };
    }
    default:
      return state;
  }
};

export default patientReducer;
