import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const BASE_URL = "https://jsonplaceholder.typicode.com/posts";

interface Post {
  id: number;
  title: string;
  body: string;
}

interface State {
  posts: Post[];
  status: string;
  error?: string;
}

const initialState: State = {
  posts: [],
  status: "idle",
  error: "",
};

export const fetchPost = createAsyncThunk("api/posts", async () => {
  const response = await axios.get(BASE_URL);
  console.log(response.data);
  return response.data;
});

const apiSlice = createSlice({
  name: "api",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPost.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPost.fulfilled, (state, action) => {
        state.status = "success";
        state.posts = state.posts.concat(action.payload);
      })
      .addCase(fetchPost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default apiSlice.reducer;
