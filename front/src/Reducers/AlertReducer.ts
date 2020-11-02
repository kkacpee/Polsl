import { AlertAction, AlertState, SET_ALERT } from "../Types/AlertTypes"

const initialState: AlertState = {
    open: false,
    aType: "success",
    message: ""
}

const AlertReducer = (state = initialState, action: AlertAction):AlertState => {
    switch(action.type) {
        case SET_ALERT:
            return {
                open: action.open,
                aType: action.aType,
                message: action.message
            }
            default:
                return state;
    }
}

export default AlertReducer;