import React, { useEffect } from 'react'
import {useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import {
    AnimationType,
    DialogType,
    OutAnimationType,
    usePopup,
} from 'react-custom-popup';
import { resetState } from '../store/dialog';

export const Dialog = () => {
    const dispatch = useDispatch()
    const { showAlert } = usePopup();
    const {title, text, type} = useSelector((state: RootState) => state.dialog)
    const showDialog = ({text, title, type}: {text: string, title: string, type: string}) : void => {
        showAlert({
            type: type ==='error'? DialogType.DANGER : DialogType.INFO,
            text: text,
            title: title,
            animationType: AnimationType.FADE_IN,
            outAnimationType: OutAnimationType.FADE_OUT,
        })
    }
    useEffect(()=>{
        type && showDialog({title, text, type})
        dispatch(resetState())
    },[type])
    return (
        <></>
    )
}

export default Dialog