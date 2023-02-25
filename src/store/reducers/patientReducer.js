import actionTypes from "../actions/actionTypes";
const initialState = {
  listClinic: [],
  clinic: {},
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
      state.clinic = [];
      return {
        ...state,
      };
    }
    default:
      return state;
  }
};

export default patientReducer;
