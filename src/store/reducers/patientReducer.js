import actionTypes from "../actions/actionTypes";

const initialState = {
  patientInfo: null,
  isPatientLoggedIn: false,
};

const patientReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PATIENT_LOGIN_SUCCESS:
      return {
        ...state,
        isPatientLoggedIn: true,
        patientInfo: action.data,
      };
    case actionTypes.PATIENT_LOGIN_FAIL:
      return {
        ...state,
        isPatientLoggedIn: false,
        patientInfo: null,
      };

    case actionTypes.PATIENT_PROCESS_LOGOUT:
      return {
        ...state,
        isPatientLoggedIn: false,
        patientInfo: null,
      };

    default:
      return state;
  }
};

export default patientReducer;
