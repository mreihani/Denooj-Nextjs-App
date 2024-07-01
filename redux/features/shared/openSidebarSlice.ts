import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type InitialState = {
    value: InputState;
}

type InputState = {
    isSidebarDisplayed :boolean;
}

const initialState = {
    value: {
        isSidebarDisplayed: false,
    } as InputState
} as InitialState

export const openSidebar = createSlice({
    name: "openSidebar",
    initialState: initialState,
    reducers: {
        setSidebarStatus: (state, action: PayloadAction<boolean>) => {
            return {
                value: {
                    isSidebarDisplayed: action.payload,
                }
            }
        }
    }
});

export const {setSidebarStatus} = openSidebar.actions;
export default openSidebar.reducer;