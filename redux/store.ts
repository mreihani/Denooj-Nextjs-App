import {configureStore} from '@reduxjs/toolkit';
import smsCodeInput from './features/auth/smsCodeInputSlice';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import temporaryUserPhone from './features/auth/temporaryUserPhone';
import openSidebar from './features/shared/openSidebarSlice';
import openFloatingMiniCart from './features/shared/openFloatingMiniCart';

export const store = configureStore({
    reducer: {
        smsCodeInput,
        temporaryUserPhone,
        openSidebar,
        openFloatingMiniCart,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector :TypedUseSelectorHook<RootState> = useSelector;