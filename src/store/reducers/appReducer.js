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
  isUploadSuccess: false,
  message: null,
  showLoading: false,
  menuOpen: "Trang Chính",
  isDeleteSuccess: false,
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
        isUploadSuccess: true,
        message: action.data,
      };
    }
    // upload failed
    case actionTypes.CREATE_FAILED: {
      return {
        ...state,
        isUploadSuccess: false,
        message: action.data,
      };
    }
    // delete success
    case actionTypes.DELETE_SUCCESS: {
      return {
        ...state,
        isDeleteSuccess: true,
        message: action.data,
      };
    }
    // delete failed
    case actionTypes.DELETE_FAILED: {
      return {
        ...state,
        isDeleteSuccess: false,
        message: action.data,
      };
    }
    // clear status success
    case actionTypes.CLEAR_STATUS_UPLOAD: {
      return {
        ...state,
        isUploadSuccess: false,
        message: null,
      };
    }
    // clear status delete
    case actionTypes.CLEAR_STATUS_DELETE: {
      return {
        ...state,
        isUploadSuccess: false,
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
