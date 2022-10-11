import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../../../model/store";
import { Counsil } from "../../council/councilModel";
import { updateArray } from "../../../control/helpers";

export interface UserState {
  councils: Array<Counsil>;
}

const initialState: UserState = {
  councils: [],
};

export const councilsSlice = createSlice({
  name: "councils",
  initialState,
  reducers: {
    addCouncil: (state, action: PayloadAction<Counsil>) => {
      if (action.payload) {
        state.councils = [...state.councils, action.payload];
      }
    },
    updateCounsil: (state, action: PayloadAction<Counsil>) => {
      if (action.payload) {
        state.councils = updateArray(
          state.councils,
          action.payload,
          "counsilId"
        );
      }
    },
  },
});

export const { addCouncil, updateCounsil } = councilsSlice.actions;

export const selectCouncils = (state: RootState) => {
  const counsils = [...state.councils.councils]
  return counsils.sort((a,b)=> b.lastAction - a.lastAction);
}

export default councilsSlice.reducer;
