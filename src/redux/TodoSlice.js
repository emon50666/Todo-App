import { createSlice } from "@reduxjs/toolkit";

const todoSlices = createSlice({
  name: "todos",
  initialState: [],
  reducers: {
      addTodo: (state, action) => {
          state.push({ id: Date.now(), text: action.payload, completed: false });
      },
      toggleTodo: (state, action) => {
          const todo = state.find((todo) => todo.id === action.payload);
          if (todo) {
              todo.completed = !todo.completed;
          }
      },
      removeTodo: (state, action) => {
          return state.filter((todo) => todo.id !== action.payload);
      },
      editTodo: (state, action) => {
          const { id, text } = action.payload;
          const todo = state.find((todo) => todo.id === id);
          if (todo) {
              todo.text = text;
          }
      },
      loadFromStorage: (state, action) => {
        state.push(action.payload);
      },
  },
});

export const { addTodo, toggleTodo, removeTodo, editTodo,loadFromStorage } = todoSlices.actions;
export default todoSlices.reducer;
