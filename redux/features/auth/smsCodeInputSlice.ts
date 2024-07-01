import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type InitialState = {
    value: InputState;
}

type InputState = {
    isInputDisplayed :boolean;
}

const initialState = {
    value: {
        isInputDisplayed: false,
    } as InputState
} as InitialState

export const smsCodeInput = createSlice({
    name: "smsCodeInput",
    initialState: initialState,
    reducers: {
        displaySmsVerificationInput: (state, action: PayloadAction<boolean>) => {
            return {
                value: {
                    isInputDisplayed: action.payload,
                }
            }
        }
    }
});

export const {displaySmsVerificationInput} = smsCodeInput.actions;
export default smsCodeInput.reducer;