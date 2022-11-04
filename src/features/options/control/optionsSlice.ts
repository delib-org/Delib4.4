import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { enableMapSet } from "immer";

import { randomizeArray, updateArray } from "../../../control/helpers";
import {
  OptionProps,
  OptionsOfCounsilListener,
  Order,
} from "../model/optionModel";

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
          if (option.optionId !== optionId && option.userVotedOption) {
            //in case the this was the previous selected option
            option.votes--;
            option.userVotedOption = false;
            state.options = updateArray(state.options, option, "optionId");
          } else if (option.optionId === optionId) {
            //in case that this is the new selected option
            option.votes++;
            option.userVotedOption = true;
            state.options = updateArray(state.options, option, "optionId");
          }
        });
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
    },
    reorderCouncilOptions: (
      state,
      action: PayloadAction<{ counsilId: string; sortBy: Order }>
    ) => {
      try {
        const { counsilId, sortBy } = action.payload;
        if (!counsilId) throw new Error("no counsil id");
        if (!sortBy) throw new Error("No sort by method");

        const counsilsOptions = state.options.filter(
          (opt) => opt.counsilId === counsilId
        );

        const counsilsOptionsOrderd = sortOptions(counsilsOptions, sortBy);
        counsilsOptionsOrderd.forEach((option, i) => {
          option.order = i;
          console.log(option.title, option.votes, Math.floor(option.created/1000)-1667450000)
          state.options = updateArray(state.options, option, "optionId");
        });
      } catch (error) {
        console.error(error);
      }
    },
  },
});

export const {
  updateUserVote,
  addOption,
  updateOption,
  updateVotingOptionsListenrs,
  reorderCouncilOptions,
} = optionsSlice.actions;

function sortOptions(options: OptionProps[], sortBy: Order): OptionProps[] {
  try {
    const _options = [...options];

    switch (sortBy) {
      case Order.NEW:
        return _options.sort((a, b) => b.created - a.created);
      case Order.VOTED:
        return _options.sort((a, b) => b.votes - a.votes);
      case Order.RANDOM:
        return randomizeArray(_options);
      default:
        return _options;
    }
  } catch (error) {
    console.error(error);
    return options;
  }
}

export default optionsSlice.reducer;


