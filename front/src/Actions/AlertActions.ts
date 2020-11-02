import {SET_ALERT, AlertAction } from '../Types/AlertTypes';

export const setAlert = (open: boolean, aType:"success" | "info" | "warning" | "error" | undefined, message:string): AlertAction => {
    return {
        type: SET_ALERT,
        open,
        aType,
        message
    }
}