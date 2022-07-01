const actionTypes = Object.freeze({
  //app
  APP_START_UP_COMPLETE: "APP_START_UP_COMPLETE",
  SET_CONTENT_OF_CONFIRM_MODAL: "SET_CONTENT_OF_CONFIRM_MODAL",
  CHANGE_LANGUAGE: "CHANGE_LANGUAGE",

  //user
  ADD_USER_SUCCESS: "ADD_USER_SUCCESS",
  USER_LOGIN_SUCCESS: "USER_LOGIN_SUCCESS",
  USER_LOGIN_FAIL: "USER_LOGIN_FAIL",
  PROCESS_LOGOUT: "PROCESS_LOGOUT",

  // admin

  // fetch with role
  // fetch gender,positiom,role
  FETCH_GENDER_START: "FETCH_GENDER_START",
  FETCH_GENDER_SUCCESS: "FETCH_GENDER_SUCCESS",
  FETCH_GENDER_FAILED: "FETCH_GENDER_FAILED",
  FETCH_POSITION_START: "FETCH_POSITION_START",
  FETCH_POSITION_SUCCESS: "FETCH_POSITION_SUCCESS",
  FETCH_POSITION_FAILED: "FETCH_POSITION_FAILED",
  FETCH_ROLE_START: "FETCH_ROLE_START",
  FETCH_ROLE_SUCCESS: "FETCH_ROLE_SUCCESS",
  FETCH_ROLE_FAILED: "FETCH_ROLE_FAILED",

  // get all hour
  GET_SCHEDULE_TIME_SUCCESS: "GET_SCHEDULE_TIME_SUCCESS",
  GET_SCHEDULE_TIME_FAILED: "GET_SCHEDULE_TIME_FAILED",
  // fetch doctor price
  GET_DOCTOR_PRICE_SUCCEED: "GET_DOCTOR_PRICE_SUCCEED",
  GET_DOCTOR_PRICE_FAILED: "GET_DOCTOR_PRICE_FAILED",
  // FETCH DOCTOR PAYMENT
  GET_DOCTOR_PAYMENT_SUCCEED: "GET_DOCTOR_PAYMENT_SUCCEED",
  GET_DOCTOR_PAYMENT_FAILED: "GET_DOCTOR_PAYMENT_FAILED",
  // FETCH DOCTOR PROVINCE
  GET_DOCTOR_PROVINCE_SUCCEED: "GET_DOCTOR_PROVINCE_SUCCEED",
  GET_DOCTOR_PROVINCE_FAILED: "GET_DOCTOR_PROVINCE_FAILED",
  // fetch with role


  // create
  CREATE_USER_SUCCESS: "CREATE_USER_SUCCESS",
  CREATE_USER_FAILED: "CREATE_USER_FAILED",
  // delete
  DELETE_USER_SUCCESS: "DELETE_USER_SUCCESS",
  DELETE_USER_FAILED: "DELETE_USER_FAILED",
  // edit User
  EDIT_USER_SUCCESS: "EDIT_USER_SUCCESS",
  EDIT_USER_FAILED: "EDIT_USER_FAILED",
  // fetch user
  FETCH_ALL_USERS_SUCCESS: "FETCH_ALL_USERS_SUCCESS",
  FETCH_ALL_USERS_FAILED: "FETCH_ALL_USERS_FAILED",
  // fetch top doctor home
  FETCH_TOP_DOCTORS_SUCCESS: "FETCH_TOP_DOCTORS_SUCCESS",
  FETCH_TOP_DOCTORS_FAILED: "FETCH_TOP_DOCTORS_FAILED",
  // fetch all doctor
  FETCH_ALL_DOCTOR_SUCCESS: "FETCH_ALL_DOCTOR_SUCCESS",
  FETCH_ALL_DOCTOR_FAILED: "FETCH_ALL_DOCTOR_FAILED",
  // post detail doctor
  POST_DETAIL_DOCTOR_SUCCESS: "POST_DETAIL_DOCTOR_SUCCESS",
  POST_DETAIL_DOCTOR_FAILED: "POST_DETAIL_DOCTOR_FAILED",
  // get detail doctor
  GET_DETAIL_DOCTOR_SUCCESS: "GET_DETAIL_DOCTOR_SUCCESS",
  GET_DETAIL_DOCTOR_FAILED: "GET_DETAIL_DOCTOR_FAILED",

  // create bulk schedule time
  POST_BULK_SCHEDULE_SUCCESS: "POST_BULK_SCHEDULE_SUCCESS",
  POST_BULK_SCHEDULE_FAILED: "POST_BULK_SCHEDULE_FAILED",
  // get schedule by doctor id,date
  GET_SCHEDULE_WITH_CONDITIONAL_SUCCESS:
    "GET_SCHEDULE_WITH_CONDITIONAL_SUCCESS",
  GET_SCHEDULE_WITH_CONDITIONAL_FAILED: "GET_SCHEDULE_WITH_CONDITIONAL_FAILED",
});

export default actionTypes;
