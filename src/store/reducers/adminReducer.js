import actionTypes from "../actions/actionTypes";

const initialState = {
  allcodes: [],
  users: [],
  user: {},
  listClinic: [],
  clinic: {},
  allcodeType: [],
  listTopDoctor: [],
  listDoctor: [],
  detailDoctor: {},
  allScheduleTime: [],
  doctorSchedule: [],
  doctorPrice: [],
  doctorPayment: [],
  doctorProvince: [],
  extraInfoDoctor: {},
  statusVerify: false,
  listSpecialty: [],
  listSpecialtyAdmin: [],
  detailSpecialty: {},
  listDoctorSpecialty: [],
  listSpecialtyByClinic: [],
  detailClinic: {},
  listDetailHandbook: [],
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
    // // fetch top doctor home
    // case actionTypes.FETCH_TOP_DOCTORS_SUCCESS: {
    //   state.listTopDoctor = action.data;
    //   return { ...state };
    // }
    // case actionTypes.FETCH_TOP_DOCTORS_FAILED: {
    //   state.listTopDoctor = [];
    //   return {
    //     ...state,
    //   };
    // }
    // // fetch all doctor
    // case actionTypes.FETCH_ALL_DOCTOR_SUCCESS: {
    //   state.listDoctor = action.data;
    //   return { ...state };
    // }
    // case actionTypes.FETCH_ALL_DOCTOR_FAILED: {
    //   state.listDoctor = [];
    //   return {
    //     ...state,
    //   };
    // }
    // // fetch detail doctor by id
    // case actionTypes.GET_DETAIL_DOCTOR_SUCCESS: {
    //   state.detailDoctor = action.data;
    //   return { ...state };
    // }
    // case actionTypes.GET_DETAIL_DOCTOR_FAILED: {
    //   state.detailDoctor = {};
    //   return {
    //     ...state,
    //   };
    // }

    // // fetch all schedule time
    // case actionTypes.GET_SCHEDULE_TIME_SUCCESS: {
    //   state.allScheduleTime = action.data;
    //   return { ...state };
    // }
    // case actionTypes.GET_SCHEDULE_TIME_FAILED: {
    //   state.allScheduleTime = [];
    //   return {
    //     ...state,
    //   };
    // }
    // // fetch schedule with doctor id . date
    // case actionTypes.GET_SCHEDULE_WITH_CONDITIONAL_SUCCESS: {
    //   state.doctorSchedule = action.data;
    //   return { ...state };
    // }
    // case actionTypes.GET_SCHEDULE_WITH_CONDITIONAL_FAILED: {
    //   state.doctorSchedule = [];
    //   return {
    //     ...state,
    //   };
    // }

    // // post verify booking
    // case actionTypes.POST_VERIFY_BOOKING_APPOINTMENT_SUCCEED: {
    //   state.statusVerify = action.data;
    //   return { ...state };
    // }
    // case actionTypes.POST_VERIFY_BOOKING_APPOINTMENT_FAILED: {
    //   return {
    //     ...state,
    //   };
    // }
    // // get list specialty
    // case actionTypes.GET_SPECIALTIES_SUCCEED: {
    //   state.listSpecialty = action.data;
    //   return { ...state };
    // }
    // case actionTypes.GET_SPECIALTIES_FAILED: {
    //   state.listSpecialty = [];
    //   return {
    //     ...state,
    //   };
    // }
    // // get list admin
    // case actionTypes.GET_LIST_SPECIALTY_SUCCEED: {
    //   state.listSpecialtyAdmin = action.data;
    //   return { ...state };
    // }
    // case actionTypes.GET_LIST_SPECIALTY_FAILED: {
    //   state.listSpecialtyAdmin = [];
    //   return {
    //     ...state,
    //   };
    // }
    // // get detail specialty
    // case actionTypes.GET_DETAIL_SPECIALTY_SUCCEED: {
    //   state.detailSpecialty = action.data;
    //   return { ...state };
    // }
    // case actionTypes.GET_DETAIL_SPECIALTY_FAILED: {
    //   return {
    //     ...state,
    //   };
    // }
    // // get list admin
    // case actionTypes.GET_LIST_DOCTOR_SPECIALTY_SUCCEED: {
    //   state.listDoctorSpecialty = action.data;
    //   return { ...state };
    // }
    // case actionTypes.GET_LIST_DOCTOR_SPECIALTY_FAILED: {
    //   state.listDoctorSpecialty = [];
    //   return {
    //     ...state,
    //   };
    // }

    // // get list specialty by clinicID
    // case actionTypes.GET_LIST_SPECIALTY_BY_CLINICID_SUCCEED: {
    //   state.listSpecialtyByClinic = action.data;
    //   return { ...state };
    // }
    // case actionTypes.GET_LIST_SPECIALTY_BY_CLINICID_FAILED: {
    //   state.listSpecialtyByClinic = [];
    //   return {
    //     ...state,
    //   };
    // }

    // // get detail clinic
    // case actionTypes.GET_DETAIL_CLINIC_SUCCEED: {
    //   state.detailClinic = action.data;
    //   return { ...state };
    // }
    // case actionTypes.GET_DETAIL_CLINIC_FAILED: {
    //   return {
    //     ...state,
    //   };
    // }
    // // get detail handbook
    // case actionTypes.GET_LIST_DETAIL_HANDBOOK_SUCCEED: {
    //   state.listDetailHandbook = action.data;
    //   return { ...state };
    // }
    // case actionTypes.GET_LIST_DETAIL_HANDBOOK_FAILED: {
    //   return {
    //     ...state,
    //   };
    // }

    default:
      return state;
  }
};

export default adminReducer;
