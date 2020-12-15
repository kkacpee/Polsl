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
export const PRESENTATION_EDIT="PRESENTATION_EDIT";
export const PRESENTATION_EDIT_SUCCESS= "PRESENTATION_EDIT_SUCCESS";
export const PRESENTATION_EDIT_FAIL= "PRESENTATION_EDIT_FAIL";

export const PRESENTATION_TYPE_LIST= "PRESENTATION_TYPE_LIST";
export const PRESENTATION_TYPE_LIST_SUCCESS= "PRESENTATION_TYPE_LIST_SUCCESS";
export const PRESENTATION_TYPE_LIST_FAIL= "PRESENTATION_TYPE_LIST_FAIL";
export const PRESENTATION_TYPE_ADD= "PRESENTATION_TYPE_ADD";
export const PRESENTATION_TYPE_ADD_SUCCESS= "PRESENTATION_TYPE_ADD_SUCCESS";
export const PRESENTATION_TYPE_ADD_FAIL= "PRESENTATION_TYPE_ADD_FAIL";
export const PRESENTATION_TYPE_DELETE="PRESENTATION_TYPE_DELETE";
export const PRESENTATION_TYPE_DELETE_SUCCESS= "PRESENTATION_TYPE_DELETE_SUCCESS";
export const PRESENTATION_TYPE_DELETE_FAIL= "PRESENTATION_TYPE_DELETE_FAIL";
export const PRESENTATION_TYPE_EDIT="PRESENTATION_TYPE_EDIT";
export const PRESENTATION_TYPE_EDIT_SUCCESS= "PRESENTATION_TYPE_EDIT_SUCCESS";
export const PRESENTATION_TYPE_EDIT_FAIL= "PRESENTATION_TYPE_EDIT_FAIL";

export interface Presentation{
    id: number,
    startDate: Date,
    endDate: Date,
    place: string,
    authors: string,
    description: string,
    title: string,
    conferenceID: number,
    presentationTypeID: number
}

export interface PresentationType{
    id: number,
    name: string
}

export interface PresentationPhoto {
    id: number,
    path: string,
    isMain: boolean
}

export interface AddPresentationPhotoRequest {
    file: File,
    presentationId: number
}

export interface ChangePresentationMainPhotoRequest {
    photoId: number,
    presentationId: number
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

export interface AddPresentationTypeRequest {
    name: string
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
    conferenceID: number,
    presentationTypeID: number,
    presentationTypeName: string,
    participants: Participant[],
    photos: PresentationPhoto[],
    rates: [
        {
          id: number,
          description: string,
          value: number,
          mobileUserID: number,
          rateCriterionID: number
        }
      ]
}

export interface PresentationState {
    loading: boolean,
    errorMsg: string,
    details: PresentationDetails | undefined,
    types: PresentationType[]
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

export interface PresentationEditAction {
    type: typeof PRESENTATION_EDIT,
}
export interface PresentationEditSuccessAction {
    type: typeof PRESENTATION_EDIT_SUCCESS,
    payload: string
}
export interface PresentationEditFailAction {
    type: typeof PRESENTATION_EDIT_FAIL,
    payload: string
}

export interface PresentationTypeListLoadingAction {
    type: typeof PRESENTATION_TYPE_LIST,
}
export interface PresentationTypeListSuccessAction {
    type: typeof PRESENTATION_TYPE_LIST_SUCCESS,
    payload: PresentationType[]
}
export interface PresentationTypeListFailAction {
    type: typeof PRESENTATION_TYPE_LIST_FAIL,
    payload: string
}

export interface PresentationTypeAddAction {
    type: typeof PRESENTATION_TYPE_ADD,
}
export interface PresentationTypeAddSuccessAction {
    type: typeof PRESENTATION_TYPE_ADD_SUCCESS,
    payload: string
}
export interface PresentationTypeAddFailAction {
    type: typeof PRESENTATION_TYPE_ADD_FAIL,
    payload: string
}

export interface PresentationTypeDeleteAction {
    type: typeof PRESENTATION_TYPE_DELETE,
}
export interface PresentationTypeDeleteSuccessAction {
    type: typeof PRESENTATION_TYPE_DELETE_SUCCESS,
    payload: string
}
export interface PresentationTypeDeleteFailAction {
    type: typeof PRESENTATION_TYPE_DELETE_FAIL,
    payload: string
}

export interface PresentationTypeEditAction {
    type: typeof PRESENTATION_TYPE_EDIT,
}
export interface PresentationTypeEditSuccessAction {
    type: typeof PRESENTATION_TYPE_EDIT_SUCCESS,
    payload: string
}
export interface PresentationTypeEditFailAction {
    type: typeof PRESENTATION_TYPE_EDIT_FAIL,
    payload: string
}
export type PresentationAction = 
PresentationDetailsLoadingAction | PresentationDetailsFailAction | PresentationDetailsSuccessAction |
PresentationAddAction | PresentationAddSuccessAction | PresentationAddFailAction |
PresentationDeleteAction | PresentationDeleteSuccessAction | PresentationDeleteFailAction | 
PresentationEditAction | PresentationEditSuccessAction | PresentationEditFailAction | 
PresentationTypeListLoadingAction | PresentationTypeListFailAction | PresentationTypeListSuccessAction |
PresentationTypeAddAction | PresentationTypeAddSuccessAction | PresentationTypeAddFailAction |
PresentationTypeDeleteAction | PresentationTypeDeleteSuccessAction | PresentationTypeDeleteFailAction | 
PresentationTypeEditAction | PresentationTypeEditSuccessAction | PresentationTypeEditFailAction;
