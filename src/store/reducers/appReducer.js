import actionTypes from "../actions/actionTypes";

const initContentOfConfirmModal = {
  isOpen: false,
  messageId: "",
  handleFunc: null,
  dataFunc: null,
};

const initialState = {
  started: true,
  language: "vi",
  systemMenuPath: "/admin",
  doctorMenuPath: "/doctor",
  contentOfConfirmModal: {
    ...initContentOfConfirmModal,
  },
  message: null,
  showLoading: false,
  menuOpen: "Trang Chính",
  isSuccess: false,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.APP_START_UP_COMPLETE:
      return {
        ...state,
        started: true,
      };
    case actionTypes.SET_CONTENT_OF_CONFIRM_MODAL:
      return {
        ...state,
        contentOfConfirmModal: {
          ...state.contentOfConfirmModal,
          ...action.contentOfConfirmModal,
        },
      };
    case actionTypes.CHANGE_LANGUAGE:
      return {
        ...state,
        language: action.language,
      };

    // upload success
    case actionTypes.CREATE_SUCCESS: {
      return {
        ...state,
        isSuccess: true,
        message: action.data,
      };
    }
    // upload failed
    case actionTypes.CREATE_FAILED: {
      return {
        ...state,
        isSuccess: false,
        message: action.data,
      };
    }
    // update success
    case actionTypes.UPDATE_SUCCESS: {
      return {
        ...state,
        isSuccess: true,
      };
    }
    // update failed
    case actionTypes.UPDATE_FAILED: {
      return {
        ...state,
        isSuccess: false,
      };
    }
    // delete success
    case actionTypes.DELETE_SUCCESS: {
      return {
        ...state,
        isSuccess: true,
        message: action.data,
      };
    }
    // delete failed
    case actionTypes.DELETE_FAILED: {
      return {
        ...state,
        isSuccess: false,
        message: action.data,
      };
    }
    // clear status success
    case actionTypes.CLEAR_STATUS: {
      return {
        ...state,
        isSuccess: false,
        message: null,
      };
    }

    // loading
    case actionTypes.LOADING_TOGGLE_ACTION: {
      return {
        ...state,
        showLoading: action.data,
      };
    }
    case actionTypes.SET_MENU: {
      return {
        ...state,
        menuOpen: action.data,
      };
    }

    default:
      return state;
  }
};

export default appReducer;
