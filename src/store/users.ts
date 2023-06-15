import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from ".";
import { ParamsType, UserType } from "../types";
import Users from "../service/Users";
import { setToast } from "./toast";



const users = createSlice({
    name: 'users',
    initialState: { data: [], count: 0 },
    reducers: {
        setUsers(state, action) {
            return { ...state, ...action.payload }
        }
    }
})

export const getUsers = (payload: ParamsType) => async (dispatch: AppDispatch) => {
    try {
        const { status, data, message } = await Users.getUsers(payload)
        if (status === 200) {
            dispatch(setUsers(data))
        } else dispatch(setToast({ type: 'error', text: message }))
    } catch (error) {
        if (error instanceof Error) {
            dispatch(setToast({ type: 'error', text: error.message }))

        }
    }
}

export const updateUser = (payload: UserType) => async (dispatch: AppDispatch, state: () => RootState) => {
    try {
        const { status, data, message } = await Users.updateUser(payload)
        if (status === 200) {
            const { data: users, count } = state().users
            const newState = users.map((user: UserType) => (data.id === user.id) ? { ...user, ...data } : user)
            dispatch(setUsers({ data: newState, count }))
            dispatch(setToast({ type: 'update', text: message }))
        } else dispatch(setToast({ type: 'error', text: message }))
    } catch (error) {
        if (error instanceof Error) {
            dispatch(setToast({ type: 'error', text: error.message }))
        }
    }
}

export const deleteUsers = (payload : string) =>async (dispatch:AppDispatch) => {
    try {
        const { status, data, message } = await Users.deleteUsers(payload)
        if (status === 200) {
            dispatch(setToast({ type: 'delete', text: message }))
        } else dispatch(setToast({ type: 'error', text: message }))
    } catch (error) {
        if (error instanceof Error) {
            dispatch(setToast({ type: 'error', text: error.message }))
        }
    }
}

export const { setUsers } = users.actions
export default users.reducer
