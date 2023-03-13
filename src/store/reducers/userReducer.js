import actionTypes from "../actions/actionTypes";

const initialState = {
  isLoggedIn: false,
  userInfo: null,
  changPassSuccess: false,
  resetPassSuccess: false,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        userInfo: action.userInfo,
      };
    case actionTypes.ADMIN_LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        userInfo: null,
      };
    case actionTypes.PROCESS_LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        userInfo: null,
      };
    case actionTypes.CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        changPassSuccess: true,
      };
    case actionTypes.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        resetPassSuccess: true,
      };
    case actionTypes.CLEAR_USER_STATUS:
      return {
        ...state,
        resetPassSuccess: false,
        changPassSuccess: false,
      };
    default:
      return state;
  }
};

export default appReducer;
