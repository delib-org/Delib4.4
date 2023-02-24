import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { updateArray } from "../../../control/helpers";
import { Post, PostJoi } from "../model/postModel";
import { RootState } from "../../../model/store";

export interface BoardsState {
  posts: Array<Post>;
  showAddPost:boolean;
}

const initialState: BoardsState = {
  posts: [],
  showAddPost:false
};

export const boardsSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    setPost: (state, action: PayloadAction<any>) => {
      try {
        const { error } = PostJoi.validate(action.payload);
        if (error) throw error;

        state.posts = updateArray(state.posts, action.payload, "postId");
      } catch (error) {
        console.error(error);
      }
    },
    showAddPost:(state,action:PayloadAction<boolean>)=>{
      try {
        state.showAddPost = action.payload
      } catch (error) {
        console.error(error);
      }
    }
  },
});

export const { setPost,showAddPost} = boardsSlice.actions;

export const selectPost = (postId:string|undefined)=>(state:RootState)=>state.boards.posts.find(post=>post.postId === postId);
export const selectPosts = (optionId:string|undefined)=>(state:RootState)=>state.boards.posts.filter(post=>post.option?.optionId === optionId);
export const selectShowAddPost = (state:RootState)=>state.boards.showAddPost;

export default boardsSlice.reducer;
