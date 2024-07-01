import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type InitialState = {
    value: InputState;
}

type InputState = {
    isMiniCartDisplayed :boolean;
}

const initialState = {
    value: {
        isMiniCartDisplayed: false,
    } as InputState
} as InitialState

export const openFloatingMiniCart = createSlice({
    name: "openFloatingMiniCart",
    initialState: initialState,
    reducers: {
        setMiniCartStatus: (state, action: PayloadAction<boolean>) => {
            return {
                value: {
                    isMiniCartDisplayed: action.payload,
                }
            }
        }
    }
});

export const {setMiniCartStatus} = openFloatingMiniCart.actions;
export default openFloatingMiniCart.reducer;