import { createSlice } from "@reduxjs/toolkit";
import { DealType } from "../types";
import { AppDispatch, RootState } from ".";
import Deals from "../service/Deals";
import { setToast } from "./toast";




const initialState: { data: DealType[], count: number } = {
    data: [],
    count: 0
}
const deals = createSlice({
    name: 'deals',
    initialState: initialState,
    reducers: {
        setDeals: (state, action) => {
            return { ...state, ...action.payload }
        }
    }
})

export const createDealHandler = (payload: DealType) => async (dispatch: AppDispatch) => {
    try {
        const { data, status, message } = await Deals.createDeal(payload)
        if (status === 200) {
            // dispatch(setDeals(data))
            dispatch(setToast({ type: 'create', text: message }))
        } else {
            dispatch(setToast({ type: 'error', text: message }))
        }
    } catch (error) {
        if (error instanceof Error) {
            dispatch(setToast({ type: 'error', text: error.message }))
        }
    }
}

export const updateDealHandler = (payload: DealType) => async (dispatch: AppDispatch, state: () => RootState) => {
    try {
        const { data, status, message } = await Deals.updateDeal(payload)
        const { data: deals, count } = state().deals
        if (status === 200) {
            const index = deals.findIndex(deal => deal.id === payload.id)
            const newState = deals.map(deal => deal.id === payload.id ? { ...deal, ...data } : deal)
            dispatch(setDeals({ data: newState, count }))
            dispatch(setToast({ type: 'update', text: message }))
        } else dispatch(setToast({ type: 'error', text: message }))
    } catch (error) {
        if (error instanceof Error) {
            dispatch(setToast({ type: 'error', text: error.message }))
        }
    }
}

export const deleteDealHandler = (payload: string) => async (dispatch: AppDispatch) => {
    try {
        const { data, message, status } = await Deals.deleteDeal(payload)
        if (status === 200) {
            dispatch(setToast({ type: 'delete', text: message }))
        } else dispatch(setToast({ type: 'error', text: message }))
    } catch (error) {
        if (error instanceof Error) {
            dispatch(setToast({ type: 'error', text: error.message }))
        }
    }
}

export const getDealsHandler = (payload: {}) => async (dispatch: AppDispatch) => {
    try {
        const { data, status, message } = await Deals.getDeals(payload)
        if (status === 200) {
            dispatch(setDeals(data))
        } else dispatch(setToast({type: 'error', text: message}))
    } catch (error) {
        if (error instanceof Error) {
            dispatch(setToast({ type: 'error', text: error.message }))
        }
    }
}


export default deals.reducer
export const { setDeals } = deals.actions