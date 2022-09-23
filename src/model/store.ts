import { configureStore } from "@reduxjs/toolkit";

import userReducer from "../features/user/userSlice";
import councilsReducer from "../features/counsils/counsilsSlice";
import optionsReducer from "../features/options/control/optionsSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    councils: councilsReducer,
    options: optionsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
