import { createAsyncThunk } from "@reduxjs/toolkit";
import UserServices from "../../../services/userServices";
import { updateNameAndEmail } from "./userSlice";
export const login = createAsyncThunk("login", async (obj, thunkAPI) => {
  try {
    return await UserServices.signInUser(obj.email, obj.password);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const logout = createAsyncThunk("logout", () => {
  UserServices.signOutUser();
});

export const register = createAsyncThunk("register", async (obj, thunkAPI) => {
  try {
    return await UserServices.signUpUser(
      obj.name,
      obj.email,
      obj.password
    );
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const getUserDetails = createAsyncThunk(
  "getUserDetails",
  async (id, {dispatch,getState,rejectWithValue}) => {
    try {
      const {
        userLogin: { userInfo },
      } = getState();
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      return await UserServices.getUserProfile(id,{userInfo,dispatch});
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const updateUserProfile = createAsyncThunk(
  "updateUserProfile",
  async (user,{dispatch,getState,rejectWithValue}) => {
    try {
      const {
        userLogin: { userInfo },
      } = getState();
      const response = await UserServices.updateUserProfile(user,{userInfo,dispatch});
      dispatch(
        updateNameAndEmail({
          name: response.data.name,
          email: response.data.email,
        })
      );
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
