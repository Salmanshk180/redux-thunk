import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "./apiSlice";

const store = configureStore({
  reducer: apiSlice,
});

export default store;
export type IRootState = ReturnType<typeof store.getState>;
