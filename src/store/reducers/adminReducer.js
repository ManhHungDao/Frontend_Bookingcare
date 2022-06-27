import actionTypes from "../actions/actionTypes";

const initialState = {
  genders: [],
  roles: [],
  positions: [],
  // isLoadingGender: false,
  // isLoadingPosition: false,
  // isLoadingRole: false,
  users: [],
  listTopDoctor: [],
  doctors: [],
  detailDoctor: {},
  allScheduleTime: [],
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    // gender
    case actionTypes.FETCH_GENDER_START: {
      // state.isLoadingGender = true;
      return {
        ...state,
      };
    }
    case actionTypes.FETCH_GENDER_SUCCESS: {
      state.genders = action.data;
      // state.isLoadingGender = false;
      return {
        ...state,
      };
    }
    case actionTypes.FETCH_GENDER_FAILED: {
      state.genders = [];
      // state.isLoadingGender = false;
      return {
        ...state,
      };
    }
    // position
    case actionTypes.FETCH_POSITION_START: {
      state.isLoadingPosition = true;
      return {
        ...state,
      };
    }
    case actionTypes.FETCH_POSITION_SUCCESS: {
      state.positions = action.data;
      state.isLoadingPosition = false;
      return {
        ...state,
      };
    }
    case actionTypes.FETCH_POSITION_FAILED: {
      state.positions = [];
      state.isLoadingPosition = false;
      return {
        ...state,
      };
    }
    //role
    case actionTypes.FETCH_ROLE_START: {
      state.isLoadingRole = true;
      return {
        ...state,
      };
    }
    case actionTypes.FETCH_ROLE_SUCCESS: {
      state.roles = action.data;
      state.isLoadingRole = false;
      return {
        ...state,
      };
    }
    case actionTypes.FETCH_ROLE_FAILED: {
      state.roles = [];
      state.isLoadingRole = false;
      return {
        ...state,
      };
    }
    // fetch all user
    case actionTypes.FETCH_ALL_USERS_SUCCESS: {
      state.users = action.users;
      return {
        ...state,
      };
    }
    case actionTypes.FETCH_ALL_USERS_FAILED: {
      state.roles = [];
      return {
        ...state,
      };
    }
    // fetch top doctor home
    case actionTypes.FETCH_TOP_DOCTORS_SUCCESS: {
      state.listTopDoctor = action.data;
      return { ...state };
    }
    case actionTypes.FETCH_TOP_DOCTORS_FAILED: {
      state.listTopDoctor = [];
      return {
        ...state,
      };
    }
    // fetch all doctor
    case actionTypes.FETCH_ALL_DOCTOR_SUCCESS: {
      state.doctors = action.data;
      return { ...state };
    }
    case actionTypes.FETCH_ALL_DOCTOR_FAILED: {
      state.doctors = [];
      return {
        ...state,
      };
    }
    // fetch detail doctor by id
    case actionTypes.GET_DETAIL_DOCTOR_SUCCESS: {
      state.detailDoctor = action.data;
      return { ...state };
    }
    case actionTypes.GET_DETAIL_DOCTOR_FAILED: {
      state.detailDoctor = [];
      return {
        ...state,
      };
    }
    // fetch all schedule time
    case actionTypes.GET_SCHEDULE_TIME_SUCCESS: {
      state.allScheduleTime = action.data;
      return { ...state };
    }
    case actionTypes.GET_SCHEDULE_TIME_FAILED: {
      state.allScheduleTime = [];
      return {
        ...state,
      };
    }
    default:
      return state;
  }
};

export default adminReducer;
