import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { enableMapSet, current } from "immer";

import { randomizeArray, updateArray } from "../../../control/helpers";
import {
  OptionProps,
  OptionsOfCouncilListener,
  Order,
} from "../model/optionModel";
import { RootState } from "../../../model/store";

enableMapSet();

export interface OptionsState {
  options: Array<OptionProps>;
  optionsVoteListenr: Array<string>;
  order: Order;
}

const initialState: OptionsState = {
  options: [],
  optionsVoteListenr: [],
  order: Order.RANDOM,
};

export const optionsSlice = createSlice({
  name: "options",
  initialState,
  reducers: {
    addOption: (state, action: PayloadAction<OptionProps>) => {
      if (action.payload) {
        const option = action.payload;
        option.creationOrder = 0;
        option.relativePlace = 0;
        state.options = [...state.options, option];
      }
    },
    updateOption: (state, action: PayloadAction<OptionProps>) => {
      try {
        if (!action.payload) throw new Error("no action payload");

        const option = action.payload;
        option.creationOrder = 0;
        state.options = updateArray(state.options, option, "optionId");
        if (state.order === Order.VOTED) {
          const councilOptions = state.options.filter(
            (opt) => opt.councilId === option.councilId
          );

          const calculatedCounscilOptions = calculateReorder(
            councilOptions,
            state.order
          );
          calculatedCounscilOptions.forEach((opt) => {
            state.options = updateArray(state.options, opt, "optionId");
          });
        }
      } catch (error) {
        console.error(error);
      }
    },
    updateUserVote: (
      state,
      action: PayloadAction<{ optionId: string; councilId: string }>
    ) => {
      try {
        const { optionId, councilId } = action.payload;

        const councilsOptions = state.options.filter(
          (option) => option.councilId === councilId
        );

        councilsOptions.forEach((option) => {
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

        //reoder if order by votes
        if (state.order === Order.VOTED) {
          const calculatedCouncilOptions = calculateReorder(
            councilsOptions,
            state.order
          );

          calculatedCouncilOptions.forEach((option) => {
            state.options = updateArray(state.options, option, "optionId");
          });
        }
      } catch (error) {
        console.error(error);
      }
    },
    updateVotingOptionsListenrs: (
      state,
      action: PayloadAction<OptionsOfCouncilListener>
    ) => {
      if (action.payload.on) {
        if (!state.optionsVoteListenr.includes(action.payload.councilId))
          state.optionsVoteListenr.push(action.payload.councilId);
      } else {
        state.optionsVoteListenr.filter((e) => e !== action.payload.councilId);
      }
    },
    reorderCouncilOptions: (
      state,
      action: PayloadAction<{ councilId: string; sortBy: Order }>
    ) => {
      try {
        const { councilId, sortBy } = action.payload;

        if (!councilId) throw new Error("no council id");
        if (!sortBy) throw new Error("No sort by method");

        const councilsOptionsProxy = state.options.filter(
          (opt) => opt.councilId === councilId
        );
        const councilOptions = councilsOptionsProxy.map((opt) => {
          return { ...current(opt) };
        });

        const claculatedOptions = calculateReorder(councilOptions, sortBy);

        claculatedOptions.forEach((option) => {
          state.options = updateArray(state.options, option, "optionId");
        });
      } catch (error) {
        console.error(error);
      }
    },
    updateOrder: (state, action: PayloadAction<Order>) => {
      state.order = action.payload;
    },
  },
});

export const {
  updateUserVote,
  addOption,
  updateOption,
  updateVotingOptionsListenrs,
  reorderCouncilOptions,
  updateOrder,
} = optionsSlice.actions;

export const orderSelector = (state: RootState) => state.options.order;
export const optionsSelector = (state: RootState) => state.options.options;

function sortOptions(options: OptionProps[], sortBy: Order): OptionProps[] {
  try {
    const _options = [...options];

    switch (sortBy) {
      case Order.NEW:
        return _options.sort((b, a) => a.created - b.created);
      case Order.VOTED:
        return _options.sort((b, a) => a.votes - b.votes);
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

function calculateReorder(options: OptionProps[], order: Order): OptionProps[] {
  try {
    options
      .sort((b, a) => a.created - b.created)
      .forEach((option, i) => {
        options[i].creationOrder = i;
      });

    const optionsOrderd = sortOptions(options, order);

    optionsOrderd.forEach((option, i) => {
      option.order = i;

      if (
        !(typeof option.order === "number") ||
        !(typeof option.creationOrder === "number")
      )
        throw new Error(`no order or creation order in ${option.title}`);

      option.relativePlace = option.order - option.creationOrder;
    });
    return options;
  } catch (error) {
    console.log(options);
    return options;
  }
}

export default optionsSlice.reducer;
