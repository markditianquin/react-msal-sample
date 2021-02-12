import instance from "../../utilities/axios-users";
import { IUser } from "../../models/IUser";

import * as actionTypes from "./actionTypes";

export const getAllUserStart = () => {
  return {
    type: actionTypes.GET_ALL_USER_START,
  };
};

export const getAllUserFail = (error: any) => {
  return {
    type: actionTypes.GET_ALL_USERS_FAIL,
    error: error,
  };
};

export const getAllUserSuccess = (users: Array<IUser>) => {
  return {
    type: actionTypes.GET_ALL_USERS_SUCCESS,
    users: users,
  };
};

export const registerUser = (user: IUser, token: string) => {
  return async (dispatch: any) => {
    try {
      await instance.post("/auth/register", user, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.log("Some Error on Registration");
    }
  };
};

export const getAllUsers = (token: string) => {
  return async (dispatch: any) => {
    try {
      dispatch(getAllUserStart());

      const users = await instance.get("/auth/getall", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json; charset=utf-8",
        },
      });

      dispatch(getAllUserSuccess(users.data.data));
    } catch (error) {
      dispatch(getAllUserFail(error));
    }
  };
};
