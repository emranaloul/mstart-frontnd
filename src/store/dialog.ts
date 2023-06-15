import { createSlice } from "@reduxjs/toolkit";

const dialog =  createSlice({
    name: 'dialog',
    initialState: {type:'', title: '', text:'' },
    reducers: {
        setDialog(state, action) {
            return {...state,...action.payload}
        },
        resetState() {
            return {type:'', title: '', text:'' }
        }

    }
})


export default dialog.reducer
export const {setDialog, resetState} = dialog.actions