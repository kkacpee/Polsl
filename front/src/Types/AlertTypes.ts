export const SET_ALERT= "SET_ALERT";

export interface AlertAction {
    type: typeof SET_ALERT;
    open: boolean,
    aType: "success" | "info" | "warning" | "error" | undefined,
    message: string
}

export interface AlertState {
    open: boolean,
    aType: "success" | "info" | "warning" | "error" | undefined,
    message: string
}