import actionTypes from "../actions/actionTypes";

const initialState = {
  allcodes: [],
  users: [],
  user: {},
  listClinic: [],
  clinic: {},
  allcodeType: [],
  listSpecialty: [],
  listSpecialtyInClinic: [],
  listHandbook: [],
  schedule: {},
  listPacket: [],
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
    case actionTypes.GET_LIST_CLINIC_BYID_SUCCEED: {
      return { ...state, listSpecialtyInClinic: action.data };
    }
    case actionTypes.GET_LIST_CLINIC_BYID_FAILED: {
      return {
        ...state,
        listSpecialtyInClinic: [],
      };
    }
    case actionTypes.GET_LIST_HANDBOOK_SUCCEED: {
      return { ...state, listHandbook: action.data };
    }
    case actionTypes.GET_LIST_HANDBOOK_FAILED: {
      return {
        ...state,
        listHandbook: [],
      };
    }
    // SHEDULE
    case actionTypes.GET_SCHEDULE_SUCCESS: {
      return { ...state, schedule: action.data };
    }
    case actionTypes.GET_SCHEDULE_FAILED: {
      return {
        ...state,
        schedule: {},
      };
    }

    // PACKET]
    case actionTypes.GET_PACKET_PAGINATION_SUCCESS: {
      return { ...state, listPacket: action.data };
    }
    case actionTypes.GET_PACKET_PAGINATION_FAILED: {
      return {
        ...state,
        listPacket: [],
      };
    }
    default:
      return state;
  }
};

export default adminReducer;
