import actionTypes from "../actions/actionTypes";
const initialState = {
  listClinic: [],
  listSpecialty: [],
  listUser: [],
  clinic: {},
  specialty: {},
};

const patientReducer = (state = initialState, action) => {
  switch (action.type) {
    // CLINIC
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
    // SPECIALTY
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
    //USER
    case actionTypes.PATIENT_GET_LIST_USER_SUCCEED: {
      state.listUser = action.data;
      return { ...state };
    }
    case actionTypes.PATIENT_GET_LIST_USER_FAILED: {
      state.listUser = [];
      return {
        ...state,
      };
    }

    default:
      return state;
  }
};

export default patientReducer;
