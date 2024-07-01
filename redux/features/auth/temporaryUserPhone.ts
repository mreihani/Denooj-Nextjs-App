import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type InitialState = {
    value: InputState;
}

type InputState = {
    phone :string;
}

const initialState = {
    value: {
        phone: "",
    } as InputState
} as InitialState

export const temporaryUserPhone = createSlice({
    name: "temporaryUserPhone",
    initialState: initialState,
    reducers: {
        getTemporaryUserPhone: (state, action: PayloadAction<string>) => {
            return {
                value: {
                    phone: state.value.phone,
                }
            }
        },
        setTemporaryUserPhone: (state, action: PayloadAction<string>) => {
            return {
                value: {
                    phone: action.payload,
                }
            }
        }
    }
});

export const {getTemporaryUserPhone, setTemporaryUserPhone} = temporaryUserPhone.actions;
export default temporaryUserPhone.reducer;