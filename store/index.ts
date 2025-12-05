import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import alertReducer from "./alertSlice";
import courseReducer from "./courseSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        alert: alertReducer,
        course: courseReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;