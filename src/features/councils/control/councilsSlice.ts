import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../../../model/store";
import { Council } from "../../council/councilModel";
import { updateArray } from "../../../control/helpers";

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
    updateCouncil: (state, action: PayloadAction<Council>) => {
      if (action.payload) {
        state.councils = updateArray(
          state.councils,
          action.payload,
          "councilId"
        );
      }
    },
  },
});

export const { addCouncil, updateCouncil } = councilsSlice.actions;

export const selectCouncils = (state: RootState) => {
  const councils = [...state.councils.councils];
  return councils.sort((a, b) => b.lastAction - a.lastAction);
};

export default councilsSlice.reducer;
