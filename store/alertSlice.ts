import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface AlertState {
    alertMessage: string | null;
    alertType: "success" | "error" | "warning" | "info";
};

const initialState: AlertState = {
    alertMessage: null,
    alertType: "info"
}

const alertSlice = createSlice({
    name: "alert",
    initialState,
    reducers: {
        setAlert(state, action: PayloadAction<{alertMessage: string, alertType: "success" | "error" | "warning" | "info"}>) {
            state.alertMessage = action.payload.alertMessage;
            state.alertType = action.payload.alertType;
        },
        clearAlert(state) {
            state.alertMessage = null;
        }
    }
});

export const { setAlert, clearAlert } = alertSlice.actions;
export default alertSlice.reducer;