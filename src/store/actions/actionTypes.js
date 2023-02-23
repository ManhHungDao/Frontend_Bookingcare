const actionTypes = Object.freeze({
  //APP
  APP_START_UP_COMPLETE: "APP_START_UP_COMPLETE",
  SET_CONTENT_OF_CONFIRM_MODAL: "SET_CONTENT_OF_CONFIRM_MODAL",
  CHANGE_LANGUAGE: "CHANGE_LANGUAGE",
  // MENU
  SET_MENU: "SET_MENU",

  // LOADING
  LOADING_TOGGLE_ACTION: "LOADING_TOGGLE_ACTION",
  // CLEAR STATUS
  CLEAR_STATUS_UPLOAD: "CLEAR_STATUS_UPLOAD",

  // ALLCODE
  FETCH_ALLCODE_SUCCESS: "FETCH_ALLCODE_SUCCESS",
  FETCH_ALLCODE_FAILED: "FETCH_ALLCODE_FAILED",
  //USER
  ADD_USER_SUCCESS: "ADD_USER_SUCCESS",
  USER_LOGIN_SUCCESS: "USER_LOGIN_SUCCESS",
  USER_LOGIN_FAIL: "USER_LOGIN_FAIL",
  PROCESS_LOGOUT: "PROCESS_LOGOUT",

  // ADMIN

  CREATE_SUCCESS: "CREATE_SUCCESS",
  CREATE_FAILED: "CREATE_FAILED",

  // USER
  CREATE_USER_SUCCESS: "CREATE_USER_SUCCESS",
  CREATE_USER_FAILED: "CREATE_USER_FAILED",
  DELETE_USER_SUCCESS: "DELETE_USER_SUCCESS",
  DELETE_USER_FAILED: "DELETE_USER_FAILED",
  EDIT_USER_SUCCESS: "EDIT_USER_SUCCESS",
  EDIT_USER_FAILED: "EDIT_USER_FAILED",

  // CLINIC
  GET_LIST_CLINIC_SUCCEED: "GET_LIST_CLINIC_SUCCEED",
  GET_LIST_CLINIC_FAILED: "GET_LIST_CLINIC_FAILED",
  GET_LIST_CLINIC_HOME_SUCCEED: "GET_LIST_CLINIC_HOME_SUCCEED",
  GET_LIST_CLINIC_HOME_FAILED: "GET_LIST_CLINIC_HOME_FAILED",
  CREATE_CLINIC_SUCCEED: "CREATE_CLINIC_SUCCEED",
  CREATE_CLINIC_FAILED: "CREATE_CLINIC_FAILED",
  GET_CLINIC_SUCCEED: "GET_CLINIC_SUCCEED",
  GET_CLINIC_FAILED: "GET_CLINIC_FAILED",
  /*  FETCH */
  // ALL HOUR
  GET_SCHEDULE_TIME_SUCCESS: "GET_SCHEDULE_TIME_SUCCESS",
  GET_SCHEDULE_TIME_FAILED: "GET_SCHEDULE_TIME_FAILED",

  //  USER
  FETCH_ALL_USERS_SUCCESS: "FETCH_ALL_USERS_SUCCESS",
  FETCH_ALL_USERS_FAILED: "FETCH_ALL_USERS_FAILED",
  // TOP DOCTOR HOME
  FETCH_TOP_DOCTORS_SUCCESS: "FETCH_TOP_DOCTORS_SUCCESS",
  FETCH_TOP_DOCTORS_FAILED: "FETCH_TOP_DOCTORS_FAILED",
  //  ALL DOCTOR
  FETCH_ALL_DOCTOR_SUCCESS: "FETCH_ALL_DOCTOR_SUCCESS",
  FETCH_ALL_DOCTOR_FAILED: "FETCH_ALL_DOCTOR_FAILED",
  // DETAIL DOCTOR
  GET_DETAIL_DOCTOR_SUCCESS: "GET_DETAIL_DOCTOR_SUCCESS",
  GET_DETAIL_DOCTOR_FAILED: "GET_DETAIL_DOCTOR_FAILED",
  // SCHEDULE BY DOCTOR ID,DATE
  GET_SCHEDULE_WITH_CONDITIONAL_SUCCESS:
    "GET_SCHEDULE_WITH_CONDITIONAL_SUCCESS",
  GET_SCHEDULE_WITH_CONDITIONAL_FAILED: "GET_SCHEDULE_WITH_CONDITIONAL_FAILED",
  // GET EXTRA INFO DOCTOR
  GET_EXTRA_INFO_DOCTOR_SUCCEED: "GET_EXTRA_INFO_DOCTOR_SUCCEED",
  GET_EXTRA_INFO_DOCTOR_FAILED: "GET_EXTRA_INFO_DOCTOR_FAILED",
  // SPECIALTIES
  GET_SPECIALTIES_SUCCEED: "GET_SPECIALTIES_SUCCEED",
  GET_SPECIALTIES_FAILED: "GET_SPECIALTIES_FAILED",
  //LIST SPECIALTY
  GET_LIST_SPECIALTY_SUCCEED: "GET_LIST_SPECIALTY_SUCCEED",
  GET_LIST_SPECIALTY_FAILED: "GET_LIST_SPECIALTY_FAILED",
  // DETAIL SPECIALTY
  GET_DETAIL_SPECIALTY_SUCCEED: "GET_DETAIL_SPECIALTY_SUCCEED",
  GET_DETAIL_SPECIALTY_FAILED: "GET_DETAIL_SPECIALTY_FAILED",
  // LIST DOCTOR SPECIALTY
  GET_LIST_DOCTOR_SPECIALTY_SUCCEED: "GET_LIST_DOCTOR_SPECIALTY_SUCCEED",
  GET_LIST_DOCTOR_SPECIALTY_FAILED: "GET_LIST_DOCTOR_SPECIALTY_FAILED",
  // get list psecialty by clinicid
  GET_LIST_SPECIALTY_BY_CLINICID_SUCCEED:
    "GET_LIST_SPECIALTY_BY_CLINICID_SUCCEED",
  GET_LIST_SPECIALTY_BY_CLINICID_FAILED:
    "GET_LIST_SPECIALTY_BY_CLINICID_FAILED",
  // get list detail handbook
  GET_LIST_DETAIL_HANDBOOK_SUCCEED: "GET_LIST_DETAIL_HANDBOOK_SUCCEED",
  GET_LIST_DETAIL_HANDBOOK_FAILED: "GET_LIST_DETAIL_HANDBOOK_FAILED",

  /*   POST */
  // DETAIL DOCTOR
  POST_DETAIL_DOCTOR_SUCCESS: "POST_DETAIL_DOCTOR_SUCCESS",
  POST_DETAIL_DOCTOR_FAILED: "POST_DETAIL_DOCTOR_FAILED",
  // BULK SCHEDULE TIME
  POST_BULK_SCHEDULE_SUCCESS: "POST_BULK_SCHEDULE_SUCCESS",
  POST_BULK_SCHEDULE_FAILED: "POST_BULK_SCHEDULE_FAILED",
  // SUB DETAIL DOCTOR
  POST_SUB_DETAIL_DOCTOR_SUCCESS: "POST_SUB_DETAIL_DOCTOR_SUCCESS",
  POST_SUB_DETAIL_DOCTOR_FAILED: "POST_SUB_DETAIL_DOCTOR_FAILED",
  // BOOKING APPOINTMENT
  POST_BOOKING_APPOINTMENT_SUCCEED: "POST_BOOKING_APPOINTMENT_SUCCEED",
  POST_BOOKING_APPOINTMENT_FAILED: "POST_BOOKING_APPOINTMENT_FAILED",
  // VERIFY BOOKING APPOINTMENT
  POST_VERIFY_BOOKING_APPOINTMENT_SUCCEED:
    "POST_VERIFY_BOOKING_APPOINTMENT_SUCCEED",
  POST_VERIFY_BOOKING_APPOINTMENT_FAILED:
    "POST_VERIFY_BOOKING_APPOINTMENT_FAILED",
  // CREATE SPECIALTY
  CREATE_SPECIALTY_SUCCEED: "CREATE_SPECIALTY_SUCCEED",
  CREATE_SPECIALTY_FAILED: "CREATE_SPECIALTY_FAILED",
});

export default actionTypes;
