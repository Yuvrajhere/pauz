import { SET_LOADING_ON, SET_LOADING_OFF, SET_ALERT, REMOVE_ALERT, SET_USER } from "./appTypes";

export const startLoading = () => {
  return {
    type: SET_LOADING_ON,
  }
}

export const stopLoading = () => {
  return {
    type: SET_LOADING_OFF
  }
}

export const setAlert = (message) => {
  return {
    type: SET_ALERT,
    payload: message
  }
}

export const removeAlert = () => {
  return {
    type: REMOVE_ALERT,
  }
}

export const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user
  }
}