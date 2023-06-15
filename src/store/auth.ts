import { createSlice } from "@reduxjs/toolkit";
import { UserType } from "../types";
import { AppDispatch, RootState } from ".";
import Auth from "../service/Auth";
import { setDialog } from "./dialog";
import { setToast } from "./toast";
import { remove, save } from "react-cookies";
import { stat } from "fs";
import Users from "../service/Users";

const initialState: { loggedIn: boolean, user: UserType, expired_session: boolean } = {
    loggedIn: false, user: {
        name: "",
        phone: "",
        email: "",
        gender: ""
    }, expired_session: false
}

const auth = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        addData(state, action) {
            return { ...state, ...action.payload }
        },
        resetSession(state) {
            return { ...state, expired_session: false }
        }
    }
})

export const signupHandler = (payload: UserType | FormData) => async (dispatch: AppDispatch, state: () => RootState) => {
    try {
        const { data, status, message } = await Auth.signup(payload)
        if (status === 200) {
            dispatch(addData({ user: data }))
            dispatch(setToast({ type: 'create', text: message }))
        } else {
            dispatch(setDialog({ type: 'error', title: 'Registration Error', text: message }))
        }
    } catch (error) {
        if (error instanceof Error) {
            dispatch(setDialog({ type: 'error', title: 'Registration Error', text: error.message }))
        }

    }
}

export const signinHandler = (payload: { email: string, password: string }) => async (dispatch: AppDispatch) => {
    try {
        const { message, user, token, status } = await Auth.signIn(payload)
        if (status === 200) {
            save('token', token.access_token, { path: '/' })
            dispatch(addData({ user, loggedIn: true }))
        } else dispatch(setDialog({ type: 'error', title: 'Login Error', text: message }))
    } catch (error) {
        if (error instanceof Error) {
            dispatch(setDialog({ type: 'error', title: 'Login Error', text: error.message }))
        }
    }
}

export const getMyProfile = () => async (dispatch: AppDispatch) => {
    try {
        const { message, data, status } = await Auth.getMyProfile()
        if (status === 200) {
            dispatch(addData({ user: data, loggedIn: true }))
        } else {
            remove('token')
            dispatch(addData({ loggedIn: false, user: {}, expired_session: true }))
            dispatch(setToast({ type: 'error', text: 'session has expired' }))
        }
    } catch (error) {
        if (error instanceof Error) {
            remove('token')
            dispatch(addData({ loggedIn: false, user: {}, expired_session: true }))
            dispatch(setToast({ type: 'error', text: error.message }))
        }
    }
}

export const updateImageHandler = (payload: FormData) => async (dispatch: AppDispatch, state: () => RootState) => {
    try {
        const { status, message, data } = await Auth.updateImage(payload)
        if(status === 200){
            const {user} = state().auth
            let _user = {...user}
            _user.image = data.image
            dispatch(addData({user: _user}))
            dispatch(setToast({type:'update', text: message}))
        } else dispatch(setToast({type: 'error', text: message}))
    } catch (error) {
        if (error instanceof Error) {
            dispatch(setToast({ type: 'error', text: error.message }))
        }
    }
}

export const updateUserHandler = (payload: UserType) =>async (dispatch:AppDispatch, state : ()=> RootState) => {
        try {
            const {message, status, data } = await Users.updateUser(payload)
            if(status=== 200){
                const {user} = state().auth
                dispatch(addData({user: {...user,...data}}))
                dispatch(setToast({type: 'update', text: message}))
            } else dispatch(setToast({type: 'error', text: message}))
        } catch (error) {
            if (error instanceof Error) {
                dispatch(setToast({ type: 'error', text: error.message }))
            }
        }
}

export const { addData, resetSession } = auth.actions
export default auth.reducer