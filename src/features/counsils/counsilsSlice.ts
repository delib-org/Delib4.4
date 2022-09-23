import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../../model/store";
import { Council } from "./councilModel";

export interface UserState {
  councils: Array<Council>;
}

const initialState: UserState = {
  councils: [],
};

export const councilsSlice = createSlice({
  name: "councils",
  initialState,
  reducers: {
    addCouncil: (state, action: PayloadAction<Council>) => {
      if (action.payload) {
        state.councils = [...state.councils, action.payload];
      }
    },
    
  },
});

export const { addCouncil} = councilsSlice.actions;

export const selectCouncils = (state: RootState) => state.councils.councils;

export default councilsSlice.reducer;
