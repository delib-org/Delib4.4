import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { enableMapSet } from 'immer';

// import { RootState } from "../../../../model/store";

import { updateArray } from "../../../control/helpers";
import { OptionProps, OptionsOfCounsilListener } from "../model/optionModel";
import { UserOptionVote } from "./optionsModel";
import { RootState } from "../../../model/store";

enableMapSet();

export interface OptionsState {
  options: Array<OptionProps>;
  optionsVoteListenr:Array<string>;
}

const initialState: OptionsState = {
  options: [],
  optionsVoteListenr:[]
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
    updateOption: (state, action: PayloadAction<OptionProps>) => {
      if (action.payload) {
        state.options = updateArray(state.options, action.payload, "optionId");
      }
    },
    updateUserVote: (state, action: PayloadAction<{optionId:string, counsilId:string}>) => {
      try {
        const {optionId,counsilId} = action.payload;

        const counsilsOptions = state.options.filter(option=>option.counsilId === counsilId);

        const option = counsilsOptions.find(option=>option.optionId === optionId);


      } catch (error) {
        console.error(error);
      }
      
    },
    updateVotingOptionsListenrs:(state, action:PayloadAction<OptionsOfCounsilListener>)=>{
      if(action.payload.on){
       if(!state.optionsVoteListenr.includes(action.payload.counsilId))
        state.optionsVoteListenr.push(action.payload.counsilId);
      } else {
        state.optionsVoteListenr.filter(e=>e !== action.payload.counsilId);
      }
    }
  },
});

export const {updateUserVote, addOption, updateOption,updateVotingOptionsListenrs } = optionsSlice.actions;



export default optionsSlice.reducer;
