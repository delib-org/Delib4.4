import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { enableMapSet } from "immer";

import { updateArray } from "../../../control/helpers";
import { OptionProps, OptionsOfCounsilListener } from "../model/optionModel";

enableMapSet();

export interface OptionsState {
  options: Array<OptionProps>;
  optionsVoteListenr: Array<string>;
}

const initialState: OptionsState = {
  options: [],
  optionsVoteListenr: [],
};

export const optionsSlice = createSlice({
  name: "options",
  initialState,
  reducers: {
    addOption: (state, action: PayloadAction<OptionProps>) => {
      if (action.payload) {
        const option = action.payload;
        option.creationOrder = 0;
        state.options = [...state.options, option];
      }
    },
    updateOption: (state, action: PayloadAction<OptionProps>) => {
      if (action.payload) {
        const option = action.payload;
        option.creationOrder = 0;
        state.options = updateArray(state.options, option, "optionId");
      }
    },
    updateUserVote: (
      state,
      action: PayloadAction<{ optionId: string; counsilId: string }>
    ) => {
      try {
        const { optionId, counsilId } = action.payload;

        const counsilsOptions = state.options.filter(
          (option) => option.counsilId === counsilId
        );

        counsilsOptions.forEach((option) => {
          option.userVotedOption = false;
          state.options = updateArray(state.options, option, "optionId");
        });

        if (optionId !== "") {
          const option = counsilsOptions.find(
            (option) => option.optionId === optionId
          );

          if (!option) throw new Error("Couldn't find option");

          //toggle state of vote
          option.userVotedOption = true;

          state.options = updateArray(state.options, option, "optionId");
        }
      } catch (error) {
        console.error(error);
      }
    },
    updateVotingOptionsListenrs: (
      state,
      action: PayloadAction<OptionsOfCounsilListener>
    ) => {
      if (action.payload.on) {
        if (!state.optionsVoteListenr.includes(action.payload.counsilId))
          state.optionsVoteListenr.push(action.payload.counsilId);
      } else {
        state.optionsVoteListenr.filter((e) => e !== action.payload.counsilId);
      }
    }
  },
});

export const {
  updateUserVote,
  addOption,
  updateOption,
  updateVotingOptionsListenrs
} = optionsSlice.actions;

export default optionsSlice.reducer;
