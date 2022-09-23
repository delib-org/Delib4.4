import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../../model/store";
import { Counsil } from "../council/councilModel";
import { updateArray } from "../../control/helpers";

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
    updateCouncil:(state,action:PayloadAction<Counsil>)=>{
      if (action.payload) {
        state.councils =  updateArray(state.councils,action.payload,'councilId')
      }
    }
  },
});

export const { addCouncil,updateCouncil } = councilsSlice.actions;

export const selectCouncils = (state: RootState) => state.councils.councils;


export default councilsSlice.reducer;
