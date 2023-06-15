import thunk from 'redux-thunk';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import auth from './auth'
import dialog from './dialog';
import toast from './toast';
import deals from './deals';
import users from './users';
import claims from './claims';
const reducers = combineReducers({ auth, dialog, toast, deals, users, claims })

const store = configureStore({
    reducer: reducers, middleware(getDefaultMiddleware) {
        return getDefaultMiddleware().concat(thunk)
    },
})
export default store

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>