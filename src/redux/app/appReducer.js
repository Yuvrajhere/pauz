import {
  SET_LOADING_ON,
  SET_LOADING_OFF,
  SET_ALERT,
  REMOVE_ALERT,
  SET_USER,
} from "./appTypes";

const initialState = {
  alertMessage: "",
  isLoading: false,
  user: null,
};

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING_ON:
      return {
        ...state,
        isLoading: true,
      };

    case SET_LOADING_OFF:
      return {
        ...state,
        isLoading: false,
      };

    case SET_ALERT:
      return {
        ...state,
        alertMessage: action.payload,
      };

    case REMOVE_ALERT:
      return {
        ...state,
        alertMessage: "",
      };

    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};
