export const EMERGENCYNUMBER_LIST_LOADING= "EMERGENCYNUMBER_LIST_LOADING";
export const EMERGENCYNUMBER_LIST_SUCCESS= "EMERGENCYNUMBER_LIST_SUCCESS";
export const EMERGENCYNUMBER_LIST_FAIL= "EMERGENCYNUMBER_LIST_FAIL";
export const EMERGENCYNUMBER_ADD= "EMERGENCYNUMBER_ADD";
export const EMERGENCYNUMBER_ADD_SUCCESS= "EMERGENCYNUMBER_ADD_SUCCESS";
export const EMERGENCYNUMBER_ADD_FAIL= "EMERGENCYNUMBER_ADD_FAIL";
export const EMERGENCYNUMBER_DELETE="EMERGENCYNUMBER_DELETE";
export const EMERGENCYNUMBER_DELETE_SUCCESS= "EMERGENCYNUMBER_DELETE_SUCCESS";
export const EMERGENCYNUMBER_DELETE_FAIL= "EMERGENCYNUMBER_DELETE_FAIL";
export const EMERGENCYNUMBER_EDIT="EMERGENCYNUMBER_EDIT";
export const EMERGENCYNUMBER_EDIT_SUCCESS= "EMERGENCYNUMBER_EDIT_SUCCESS";
export const EMERGENCYNUMBER_EDIT_FAIL= "EMERGENCYNUMBER_EDIT_FAIL";

export interface EmergencyNumber {
    id: number,
    name: string,
    number: string
}

export interface AddEmergencyNumberRequest {
    name: string,
    number: string
}

export interface EmergencyNumberState {
    data: EmergencyNumber[],
    loading: boolean,
    errorMsg: string
}

export interface EmergencyNumberError {
    cod: string,
    message: string
}

export interface EmergencyNumberListLoadingAction {
    type: typeof EMERGENCYNUMBER_LIST_LOADING,
}
export interface EmergencyNumberListSuccessAction {
    type: typeof EMERGENCYNUMBER_LIST_SUCCESS,
    payload: EmergencyNumber[]
}
export interface EmergencyNumberListFailAction {
    type: typeof EMERGENCYNUMBER_LIST_FAIL,
    payload: string
}

export interface EmergencyNumberAddAction {
    type: typeof EMERGENCYNUMBER_ADD,
}
export interface EmergencyNumberAddSuccessAction {
    type: typeof EMERGENCYNUMBER_ADD_SUCCESS,
    payload: string
}
export interface EmergencyNumberAddFailAction {
    type: typeof EMERGENCYNUMBER_ADD_FAIL,
    payload: string
}

export interface EmergencyNumberDeleteAction {
    type: typeof EMERGENCYNUMBER_DELETE,
}
export interface EmergencyNumberDeleteSuccessAction {
    type: typeof EMERGENCYNUMBER_DELETE_SUCCESS,
    payload: string
}
export interface EmergencyNumberDeleteFailAction {
    type: typeof EMERGENCYNUMBER_DELETE_FAIL,
    payload: string
}

export interface EmergencyNumberEditAction {
    type: typeof EMERGENCYNUMBER_EDIT,
}
export interface EmergencyNumberEditSuccessAction {
    type: typeof EMERGENCYNUMBER_EDIT_SUCCESS,
    payload: string
}
export interface EmergencyNumberEditFailAction {
    type: typeof EMERGENCYNUMBER_EDIT_FAIL,
    payload: string
}

export type EmergencyNumberAction = 
EmergencyNumberListLoadingAction | EmergencyNumberListFailAction | EmergencyNumberListSuccessAction |
EmergencyNumberAddAction | EmergencyNumberAddSuccessAction | EmergencyNumberAddFailAction |
EmergencyNumberDeleteAction | EmergencyNumberDeleteSuccessAction | EmergencyNumberDeleteFailAction |
EmergencyNumberEditAction | EmergencyNumberEditSuccessAction | EmergencyNumberEditFailAction;
