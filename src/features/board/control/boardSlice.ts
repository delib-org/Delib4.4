import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { updateArray } from "../../../control/helpers";
import { Post, PostJoi } from "../model/postModel";

export interface BoardsState {
  posts: Array<Post>;
}

const initialState: BoardsState = {
  posts: [],
};

export const boardsSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    addPost: (state, action: PayloadAction<Post>) => {
      try {
        const { error } = PostJoi.validate(action.payload);
        if (error) throw error;

        state.posts = updateArray(state.posts, action.payload, "postId");
      } catch (error) {
        console.error(error);
      }
    },
    updatePost: (state, action: PayloadAction<Post>) => {
      try {
        const { error } = PostJoi.validate(action.payload);
        if (error) throw error;

        state.posts = updateArray(state.posts, action.payload, "postId");
      } catch (error) {
        console.error(error);
      }
    },
  },
});

export const { addPost, updatePost } = boardsSlice.actions;



export default boardsSlice.reducer;
