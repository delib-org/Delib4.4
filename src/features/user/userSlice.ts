import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { User } from "./userModel";
import { RootState } from "../../model/store";

export interface UserState {
  user: User | null;
  lastNavigation: string;
}

const initialState: UserState = {
  user: null,
  lastNavigation: "",
};

export const counterSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      if (action.payload) {
        state.user = action.payload;
      } else {
        state.user = null;
      }
    },
    setLastNavigation: (state, action: PayloadAction<string>) => {
      state.lastNavigation = action.payload;
    },
  },
});

export const { setUser, setLastNavigation } = counterSlice.actions;

export const selectUser = (state: RootState) => state.user.user;
export const selectLastNavigation = (state: RootState) =>
  state.user.lastNavigation;

export default counterSlice.reducer;
