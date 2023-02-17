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
  systemMenuPath: "/system/user-manage",
  doctorMenuPath: "/doctor/manage-schedule",
  contentOfConfirmModal: {
    ...initContentOfConfirmModal,
  },
  isUploadSuccess: false,
  message: null,
  showLoading: false,
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
    // clear status success
    case actionTypes.CLEAR_STATUS_UPLOAD: {
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

    default:
      return state;
  }
};

export default appReducer;
