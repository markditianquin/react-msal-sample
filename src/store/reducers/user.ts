import { IUser } from "../../models/IUser";
import * as actionTypes from "../actions/actionTypes";

export interface RootState {
  users: Array<IUser>;
}

const initialState: RootState = {
  users: [],
};

const registerUser = (state: any, action: any) => {
  return { ...state };
};

const getAllUserStart = (state: any, action: any) => {
  return { ...state };
};

const getAllUserSuccess = (state: any, action: any) => {
  return { ...state, users: action.users };
};

const getAllUserFail = (state: any, action: any) => {
  return { ...state, error: action.error };
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.GET_ALL_USER_START:
      return getAllUserStart(state, action);
    case actionTypes.GET_ALL_USERS_SUCCESS:
      return getAllUserSuccess(state, action);
    case actionTypes.GET_ALL_USERS_FAIL:
      return getAllUserFail(state, action);
    case actionTypes.REGISTER_USER:
      return registerUser(state, action);
    default:
      return state;
  }
};

export default reducer;
