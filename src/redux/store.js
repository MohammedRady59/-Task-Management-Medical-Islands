import { configureStore } from "@reduxjs/toolkit";
import Todo from "./feature/Todo/Todo";
export const store = configureStore({
  reducer: {
    todo: Todo,
  },
});
