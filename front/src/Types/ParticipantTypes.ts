export const PARTICIPANT_LIST_LOADING= "PARTICIPANT_LIST_LOADING";
export const PARTICIPANT_LIST_SUCCESS= "PARTICIPANT_LIST_SUCCESS";
export const PARTICIPANT_LIST_FAIL= "PARTICIPANT_LIST_FAIL";
export const PARTICIPANT_ADD= "PARTICIPANT_ADD";
export const PARTICIPANT_ADD_SUCCESS= "PARTICIPANT_ADD_SUCCESS";
export const PARTICIPANT_ADD_FAIL= "PARTICIPANT_ADD_FAIL";
export const PARTICIPANT_DELETE="PARTICIPANT_DELETE";
export const PARTICIPANT_DELETE_SUCCESS= "PARTICIPANT_DELETE_SUCCESS";
export const PARTICIPANT_DELETE_FAIL= "PARTICIPANT_DELETE_FAIL"

export interface Participant {
    id: number,
    firstName: string,
    lastName: string,
    affiliation: string,
    company: string,
    country: string,
    description: string
}

export interface AddParticipantRequest {
    firstName: string,
    lastName: string,
    affiliation: string,
    company: string,
    country: string,
    description: string
}

export interface ParticipantState {
    data: Participant[],
    loading: boolean,
    errorMsg: string
}

export interface ParticipantError {
    cod: string,
    message: string
}

export interface ParticipantListLoadingAction {
    type: typeof PARTICIPANT_LIST_LOADING,
}
export interface ParticipantListSuccessAction {
    type: typeof PARTICIPANT_LIST_SUCCESS,
    payload: Participant[]
}
export interface ParticipantListFailAction {
    type: typeof PARTICIPANT_LIST_FAIL,
    payload: string
}

export interface ParticipantAddAction {
    type: typeof PARTICIPANT_ADD,
}
export interface ParticipantAddSuccessAction {
    type: typeof PARTICIPANT_ADD_SUCCESS,
    payload: string
}
export interface ParticipantAddFailAction {
    type: typeof PARTICIPANT_ADD_FAIL,
    payload: string
}

export interface ParticipantDeleteAction {
    type: typeof PARTICIPANT_DELETE,
}
export interface ParticipantDeleteSuccessAction {
    type: typeof PARTICIPANT_DELETE_SUCCESS,
    payload: string
}
export interface ParticipantDeleteFailAction {
    type: typeof PARTICIPANT_DELETE_FAIL,
    payload: string
}

export type ParticipantAction = 
ParticipantListLoadingAction | ParticipantListFailAction | ParticipantListSuccessAction |
ParticipantAddAction | ParticipantAddSuccessAction | ParticipantAddFailAction |
ParticipantDeleteAction | ParticipantDeleteSuccessAction | ParticipantDeleteFailAction;
