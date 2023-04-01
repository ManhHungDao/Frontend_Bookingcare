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
  CLEAR_STATUS: "CLEAR_STATUS",

  // ALLCODE
  FETCH_ALLCODE_SUCCESS: "FETCH_ALLCODE_SUCCESS",
  FETCH_ALLCODE_FAILED: "FETCH_ALLCODE_FAILED",
  FETCH_ALLCODE_TYPE_SUCCESS: "FETCH_ALLCODE_TYPE_SUCCESS",
  FETCH_ALLCODE_TYPE_FAILED: "FETCH_ALLCODE_TYPE_FAILED",
  //USER
  ADD_USER_SUCCESS: "ADD_USER_SUCCESS",
  USER_LOGIN_SUCCESS: "USER_LOGIN_SUCCESS",
  USER_LOGIN_FAIL: "USER_LOGIN_FAIL",
  PROCESS_LOGOUT: "PROCESS_LOGOUT",
  CHANGE_PASSWORD_SUCCESS: "CHANGE_PASSWORD_SUCCESS",
  RESET_PASSWORD_SUCCESS: "RESET_PASSWORD_SUCCESS",
  CLEAR_USER_STATUS: "CLEAR_USER_STATUS",
  GET_ALL_COUNT_DASHBOARD_SUCCESS: "GET_ALL_COUNT_DASHBOARD_SUCCESS",
  PATIENT_GET_LIST_USER_SUCCEED: "PATIENT_GET_LIST_USER_SUCCEED",
  PATIENT_GET_LIST_USER_FAILED: "PATIENT_GET_LIST_USER_FAILED",
  // ADMIN

  CREATE_SUCCESS: "CREATE_SUCCESS",
  CREATE_FAILED: "CREATE_FAILED",
  DELETE_SUCCESS: "DELETE_SUCCESS",
  DELETE_FAILED: "DELETE_FAILED",
  UPDATE_SUCCESS: "UPDATE_SUCCESS",
  UPDATE_FAILED: "UPDATE_FAILED",

  //MANAGE-USER
  CREATE_USER_SUCCESS: "CREATE_USER_SUCCESS",
  CREATE_USER_FAILED: "CREATE_USER_FAILED",
  GET_USER_FAILED: "GET_USER_FAILED",
  GET_USER_SUCCESS: "GET_USER_SUCCESS",
  EDIT_USER_SUCCESS: "EDIT_USER_SUCCESS",
  EDIT_USER_FAILED: "EDIT_USER_FAILED",
  FETCH_ALL_USERS_SUCCESS: "FETCH_ALL_USERS_SUCCESS",
  FETCH_ALL_USERS_FAILED: "FETCH_ALL_USERS_FAILED",

  // CLINIC
  GET_LIST_CLINIC_SUCCEED: "GET_LIST_CLINIC_SUCCEED",
  GET_LIST_CLINIC_FAILED: "GET_LIST_CLINIC_FAILED",
  GET_LIST_CLINIC_HOME_SUCCEED: "GET_LIST_CLINIC_HOME_SUCCEED",
  GET_LIST_CLINIC_HOME_FAILED: "GET_LIST_CLINIC_HOME_FAILED",
  CREATE_CLINIC_SUCCEED: "CREATE_CLINIC_SUCCEED",
  CREATE_CLINIC_FAILED: "CREATE_CLINIC_FAILED",
  GET_CLINIC_SUCCEED: "GET_CLINIC_SUCCEED",
  GET_CLINIC_FAILED: "GET_CLINIC_FAILED",
  PATIENT_GET_LIST_CLINIC_SUCCEED: "PATIENT_GET_LIST_CLINIC_SUCCEED",
  PATIENT_GET_LIST_CLINIC_FAILED: "PATIENT_GET_LIST_CLINIC_FAILED",
  PATIENT_GET_CLINIC_SUCCEED: "PATIENT_GET_CLINIC_SUCCEED",
  PATIENT_GET_CLINIC_FAILED: "PATIENT_GET_CLINIC_FAILED",

  // SPECIALTY
  PATIENT_GET_LIST_SPECIALTY_SUCCEED: "PATIENT_GET_LIST_SPECIALTY_SUCCEED",
  PATIENT_GET_LIST_SPECIALTY_FAILED: "PATIENT_GET_LIST_SPECIALTY_FAILED",
  GET_LIST_SPECIALTY_SUCCEED: "GET_LIST_SPECIALTY_SUCCEED",
  GET_LIST_SPECIALTY_FAILED: "GET_LIST_SPECIALTY_FAILED",
  GET_LIST_CLINIC_BYID_SUCCEED: "GET_LIST_CLINIC_BYID_SUCCEED",
  GET_LIST_CLINIC_BYID_FAILED: "GET_LIST_CLINIC_BYID_FAILED",
  PATIENT_SINGLE_SPECIALTY_SUCCEED: "PATIENT_SINGLE_SPECIALTY_SUCCEED",
  PATIENT_SINGLE_SPECIALTY_FAILED: "PATIENT_SINGLE_SPECIALTY_FAILED",

  // SCHEDULE
  GET_SCHEDULE_SUCCESS: "GET_SCHEDULE_SUCCESS",
  GET_SCHEDULE_FAILED: "GET_SCHEDULE_FAILED",
  GET_SCHEDULE_BY_DATE_FAILED: "GET_SCHEDULE_BY_DATE_FAILED",
  GET_SCHEDULE_BY_DATE_SUCCESS: "GET_SCHEDULE_BY_DATE_SUCCESS",
  CREATE_SCHEDULE_PATIENT_SUCCESS: "CREATE_SCHEDULE_PATIENT_SUCCESS",
  CREATE_SCHEDULE_PATIENT_FAILED: "CREATE_SCHEDULE_PATIENT_FAILED",

  //  HANDBOOK
  GET_LIST_HANDBOOK_SUCCEED: "GET_LIST_HANDBOOK_SUCCEED",
  GET_LIST_HANDBOOK_FAILED: "GET_LIST_HANDBOOK_FAILED",
  GET_LIST_HANDBOOK_HOME_SUCCEED: "GET_LIST_HANDBOOK_HOME_SUCCEED",
  GET_LIST_HANDBOOK_HOME_FAILED: "GET_LIST_HANDBOOK_HOME_FAILED",
  GET_SINGLE_HANDBOOK_SUCCEED: "GET_SINGLE_HANDBOOK_SUCCEED",
  GET_SINGLE_HANDBOOK_FAILED: "GET_SINGLE_HANDBOOK_FAILED",
  GET_LIST_SPECIALTY_IN_HANDBOOK_SUCCEED:
    "GET_LIST_SPECIALTY_IN_HANDBOOK_SUCCEED",
  GET_LIST_SPECIALTY_IN_HANDBOOK_FAILED:
    "GET_LIST_SPECIALTY_IN_HANDBOOK_FAILED",

  // PACKET
  GET_PACKET_PAGINATION_SUCCESS: "GET_PACKET_PAGINATION_SUCCESS",
  GET_PACKET_PAGINATION_FAILED: "GET_PACKET_PAGINATION_FAILED",
  GET_ALL_PACKET_HOME_SUCCESS: "GET_ALL_PACKET_HOME_SUCCESS",
  GET_ALL_PACKET_HOME_FAILED: "GET_ALL_PACKET_HOME_FAILED",
});

export default actionTypes;
