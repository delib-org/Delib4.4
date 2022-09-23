import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// import { RootState } from "../../../../model/store";

import { updateArray } from "../../../control/helpers";
import { OptionProps } from "../model/optionModel";

export interface UserState {
  options: Array<OptionProps>;
}

const initialState: UserState = {
    options: [],
};

export const optionsSlice = createSlice({
  name: "options",
  initialState,
  reducers: {
    addOption: (state, action: PayloadAction<OptionProps>) => {
      if (action.payload) {
        state.options = [...state.options, action.payload];
      }
    },
    updateOption:(state,action:PayloadAction<OptionProps>)=>{
      if (action.payload) {
        state.options =  updateArray(state.options,action.payload,'optionId')
      }
    }
  },
});

export const { addOption,updateOption } = optionsSlice.actions;


export default optionsSlice.reducer;
