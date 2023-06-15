import { createSlice } from "@reduxjs/toolkit";
import { ClaimType } from "../types";
import { AppDispatch } from ".";
import { setToast } from "./toast";
import Claims from "../service/Claims";



const claims = createSlice({
    name: 'claims',
    initialState: { data: [], count: 0, detailed : {amounts:[], count: 0} },
    reducers: {
        setClaims(state, action) {
            return { ...state, ...action.payload }
        }
    }
})


export const createClaimHandler = (payload: ClaimType) => async (dispatch: AppDispatch) => {
    try {
        const { data, status, message } = await Claims.createClaim(payload)
        if (status === 200) {
            dispatch(setToast({ type: 'create', text: message }))
        } else dispatch(setToast({ type: 'error', text: message }))
    } catch (error) {
        if (error instanceof Error) {
            dispatch(setToast({ type: 'error', text: error.message }))
        }
    }
}

export const getClaimsDetails = () =>  async(dispatch: AppDispatch) =>{
    try {
        const {data, status, message } = await Claims.getClaimsDetails()
        if(status === 200) {
            dispatch(setClaims({detailed: data}))
        } else dispatch(setToast({type: 'error', text: message}))
    } catch (error) {
        if (error instanceof Error) {
            dispatch(setToast({ type: 'error', text: error.message }))
        }
    }
}

export default claims.reducer
export const { setClaims } = claims.actions
