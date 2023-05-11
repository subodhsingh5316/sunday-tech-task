import { configureStore } from "@reduxjs/toolkit";
import UserReducer from './slice/userSlice'
export const store = configureStore({
    reducer: {
        UserReducer
    },
  })