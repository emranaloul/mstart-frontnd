import { createSlice } from "@reduxjs/toolkit";

const toast = createSlice({
    name: 'toast',
    initialState: { type: '', text: '' },
    reducers: {
        setToast(state, action) {
            return { ...state, ...action.payload }
        },
        resetState() {
            return { type: '', text: '' }
        }
    }
})

export default toast.reducer
export const { setToast, resetState } = toast.actions