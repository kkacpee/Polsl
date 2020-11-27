import { Participant } from "./ParticipantTypes";

export const PRESENTATION_DETAILS_LOADING= "PRESENTATION_DETAILS_LOADING";
export const PRESENTATION_DETAILS_SUCCESS= "PRESENTATION_DETAILS_SUCCESS";
export const PRESENTATION_DETAILS_FAIL= "PRESENTATION_DETAILS_FAIL";
export const PRESENTATION_ADD= "PRESENTATION_ADD";
export const PRESENTATION_ADD_SUCCESS= "PRESENTATION_ADD_SUCCESS";
export const PRESENTATION_ADD_FAIL= "PRESENTATION_ADD_FAIL";
export const PRESENTATION_DELETE="PRESENTATION_DELETE";
export const PRESENTATION_DELETE_SUCCESS= "PRESENTATION_DELETE_SUCCESS";
export const PRESENTATION_DELETE_FAIL= "PRESENTATION_DELETE_FAIL";
export const PRESENTATION_TYPE_LIST= "PRESENTATION_TYPE_LIST";
export const PRESENTATION_TYPE_LIST_SUCCESS= "PRESENTATION_TYPE_LIST_SUCCESS";
export const PRESENTATION_TYPE_LIST_FAIL= "PRESENTATION_TYPE_LIST_FAIL";

export interface Presentation{
    id: number,
    startDate: Date,
    endDate: Date,
    place: string,
    authors: string,
    description: string,
    title: string,
    presentationTypeID: number,
    presentationTypeName: string
}

export interface PresentationType{
    id: number,
    name: number
}

export interface AddPresentationRequest{
    startDate: Date,
    endDate: Date,
    place: string,
    authors: string,
    description: string,
    title: string,
    ConferenceID: number,
    presentationTypeID: number
}

export interface AddToPresentationRequest {
    presentationID: number,
    arrayOfIDs: number[]
}

export interface DeleteFromPresentationRequest {
    presentationID: number,
    arrayOfIDs: number[]
}

export type requestType = "Participant";

export interface PresentationDetails{
    id: number,
    startDate: Date,
    endDate: Date,
    place: string,
    authors: string,
    description: string,
    title: string,
    PresentationID: number,
    presentationTypeID: number,
    presentationTypeName: string,
    participants: Participant[]
}

export interface PresentationState {
    loading: boolean,
    errorMsg: string,
    details: PresentationDetails | undefined,
    types: PresentationType | undefined
}

export interface PresentationDetailsLoadingAction {
    type: typeof PRESENTATION_DETAILS_LOADING,
}
export interface PresentationDetailsSuccessAction {
    type: typeof PRESENTATION_DETAILS_SUCCESS,
    payload: PresentationDetails
}
export interface PresentationDetailsFailAction {
    type: typeof PRESENTATION_DETAILS_FAIL,
    payload: string
}

export interface PresentationAddAction {
    type: typeof PRESENTATION_ADD,
}
export interface PresentationAddSuccessAction {
    type: typeof PRESENTATION_ADD_SUCCESS,
    payload: string
}
export interface PresentationAddFailAction {
    type: typeof PRESENTATION_ADD_FAIL,
    payload: string
}

export interface PresentationDeleteAction {
    type: typeof PRESENTATION_DELETE,
}
export interface PresentationDeleteSuccessAction {
    type: typeof PRESENTATION_DELETE_SUCCESS,
    payload: string
}
export interface PresentationDeleteFailAction {
    type: typeof PRESENTATION_DELETE_FAIL,
    payload: string
}

export interface PresentationTypeLoadingAction {
    type: typeof PRESENTATION_TYPE_LIST,
}
export interface PresentationTypeSuccessAction {
    type: typeof PRESENTATION_TYPE_LIST_SUCCESS,
    payload: PresentationType
}
export interface PresentationTypeFailAction {
    type: typeof PRESENTATION_TYPE_LIST_FAIL,
    payload: string
}

export type PresentationAction = 
PresentationDetailsLoadingAction | PresentationDetailsFailAction | PresentationDetailsSuccessAction |
PresentationAddAction | PresentationAddSuccessAction | PresentationAddFailAction |
PresentationDeleteAction | PresentationDeleteSuccessAction | PresentationDeleteFailAction | 
PresentationTypeLoadingAction | PresentationTypeSuccessAction | PresentationTypeFailAction;
