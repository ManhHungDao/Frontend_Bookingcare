import actionTypes from "../actions/actionTypes";

const initialState = {
  allcodes: [],
  users: [],
  user: {},
  listClinic: [],
  clinic: {},
  allcodeType: [],
  listSpecialty: [],
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    // CODE
    case actionTypes.FETCH_ALLCODE_SUCCESS: {
      return { ...state, allcodes: action.data };
    }
    case actionTypes.FETCH_ALLCODE_FAILED: {
      return { ...state, allcodes: [] };
    }
    case actionTypes.FETCH_ALLCODE_TYPE_SUCCESS: {
      return { ...state, allcodeType: action.data };
    }
    case actionTypes.FETCH_ALLCODE_TYPE_FAILED: {
      return { ...state, allcodeType: [] };
    }
    // USER
    case actionTypes.FETCH_ALL_USERS_SUCCESS: {
      return {
        ...state,
        users: action.users,
      };
    }
    case actionTypes.FETCH_ALL_USERS_FAILED: {
      return {
        ...state,
        users: [],
      };
    }
    case actionTypes.GET_USER_SUCCESS: {
      return {
        ...state,
        user: action.data,
      };
    }
    case actionTypes.GET_USER_FAILED: {
      return { ...state, user: {} };
    }
    // CLINIC
    case actionTypes.GET_LIST_CLINIC_SUCCEED: {
      return { ...state, listClinic: action.data };
    }
    case actionTypes.GET_LIST_CLINIC_FAILED: {
      return {
        ...state,
        listClinic: [],
      };
    }
    case actionTypes.GET_CLINIC_SUCCEED: {
      return { ...state, clinic: action.data };
    }
    case actionTypes.GET_CLINIC_FAILED: {
      return {
        ...state,
        clinic: {},
      };
    }

    // SPECIALTY
    case actionTypes.GET_LIST_SPECIALTY_SUCCEED: {
      return { ...state, listSpecialty: action.data };
    }
    case actionTypes.GET_LIST_SPECIALTY_FAILED: {
      return {
        ...state,
        listSpecialty: [],
      };
    }
    default:
      return state;
  }
};

export default adminReducer;
