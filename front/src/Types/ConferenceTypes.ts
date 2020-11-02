export const CONFERENCE_LIST_LOADING= "CONFERENCE_LIST_LOADING";
export const CONFERENCE_LIST_SUCCESS= "CONFERENCE_LIST_SUCCESS";
export const CONFERENCE_LIST_FAIL= "CONFERENCE_LIST_FAIL";
export const CONFERENCE_ADD= "CONFERENCE_ADD";
export const CONFERENCE_ADD_SUCCESS= "CONFERENCE_ADD_SUCCESS";
export const CONFERENCE_ADD_FAIL= "CONFERENCE_ADD_FAIL";

export interface Conference {
    id: number,
    address: string,
    country: string,
    description:string,
    startDate:Date,
    endDate:Date,
    title: string,
    socialMedia: string
}

export interface AddConferenceRequest {
    address: string,
    country: string,
    description:string,
    startDate:Date,
    endDate:Date,
    title: string,
    socialMedia: string
}

export interface ConferenceState {
    data: Conference[],
    loading: boolean,
    errorMsg: string
}

export interface ConferenceError {
    cod: string,
    message: string
}

export interface ConferenceListLoadingAction {
    type: typeof CONFERENCE_LIST_LOADING,
}
export interface ConferenceListSuccessAction {
    type: typeof CONFERENCE_LIST_SUCCESS,
    payload: Conference[]
}
export interface ConferenceListFailAction {
    type: typeof CONFERENCE_LIST_FAIL,
    payload: string
}

export interface ConferenceAddAction {
    type: typeof CONFERENCE_ADD,
}
export interface ConferenceAddSuccessAction {
    type: typeof CONFERENCE_ADD_SUCCESS,
    payload: string
}
export interface ConferenceAddFailAction {
    type: typeof CONFERENCE_ADD_FAIL,
    payload: string
}

export type ConferenceAction = 
ConferenceListLoadingAction | ConferenceListFailAction | ConferenceListSuccessAction |
ConferenceAddAction | ConferenceAddSuccessAction | ConferenceAddFailAction;
