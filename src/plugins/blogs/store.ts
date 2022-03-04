import { createSlice } from "@reduxjs/toolkit";

const blogsSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    addBlog(state, action) {
      const { id, title } = action.payload;
      state.push({ id, title, completed: false });
    },
    editBlog(state, action) {
      const todo = state.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.title = action.payload.title;
      }
    }
  }
});

export const { addBlog, editBlog } = blogsSlice.actions;
export default blogsSlice.reducer;
