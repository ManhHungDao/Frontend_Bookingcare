const actionsTypes = {
  open: 'OPEN_LOADING',
  close: 'CLOSE_LOADING',
};

const initialState = {
  isLoading: false
};

const loadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionsTypes.close:
      return {
        ...state,
        isLoading: false
      }
    case actionsTypes.open:
      return {
        ...state,
        isLoading: true
      }
    default:
      return {
        ...state
      }
  }
}

export default loadingReducer;