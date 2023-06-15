import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    DialogType,
    usePopup,
    ToastPosition,
} from 'react-custom-popup';
import { RootState } from '../store';
import { resetState } from '../store/toast';


const Toast = () => {
    const dispatch = useDispatch()

    const { showToast } = usePopup();
    const { type, text } = useSelector((state: RootState) => state.toast)
    const displayToast = ({ text, type }: { text: string, type: string }): void => {
        showToast({
            text: text,
            type: type === 'error' ? DialogType.DANGER : DialogType.INFO,
            position: ToastPosition.BOTTOM_RIGHT,
            timeoutDuration: 5000
        })

    }
    useEffect(() => {
        type && displayToast({ text, type })
        dispatch(resetState())

    }, [type])
    return (
        <></>
    )
}


export default Toast