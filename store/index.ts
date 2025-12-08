import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import alertReducer from "./alertSlice";
import courseReducer from "./courseSlice";
import createQuestionReducer from "./createQuestionSlice"

export const store = configureStore({
    reducer: {
        user: userReducer,
        alert: alertReducer,
        course: courseReducer,
        createQuestion: createQuestionReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;