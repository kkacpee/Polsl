import { Accommodation } from "./AccommodationTypes";
import { ConferenceBuildngPlan } from "./BuildingPlanTypes";
import { EmergencyNumber } from "./EmergencyNumberTypes";
import { Organizer } from "./OrganizerTypes";
import { PointOfInterest } from "./PointOfInterestTypes";
import { Presentation } from "./PresentationTypes";
import { Sponsor } from "./SponsorTypes";

export const CONFERENCE_LIST_LOADING= "CONFERENCE_LIST_LOADING";
export const CONFERENCE_LIST_SUCCESS= "CONFERENCE_LIST_SUCCESS";
export const CONFERENCE_LIST_FAIL= "CONFERENCE_LIST_FAIL";
export const CONFERENCE_ADD= "CONFERENCE_ADD";
export const CONFERENCE_ADD_SUCCESS= "CONFERENCE_ADD_SUCCESS";
export const CONFERENCE_ADD_FAIL= "CONFERENCE_ADD_FAIL";
export const CONFERENCE_DELETE="CONFERENCE_DELETE";
export const CONFERENCE_DELETE_SUCCESS= "CONFERENCE_DELETE_SUCCESS";
export const CONFERENCE_DELETE_FAIL= "CONFERENCE_DELETE_FAIL"
export const CONFERENCE_DETAILS_LOADING= "CONFERENCE_DETAILS_LOADING";
export const CONFERENCE_DETAILS_SUCCESS= "CONFERENCE_DETAILS_SUCCESS";
export const CONFERENCE_DETAILS_FAIL= "CONFERENCE_DETAILS_FAIL";

export type requestType = "Accommodation" | "Organizer" | "Sponsor" | "EmergencyNumber" | "PointOfInterest";

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

export interface AddToConferenceRequest {
    conferenceID: number,
    arrayOfIDs: number[]
}

export interface DeleteFromConferenceRequest {
    conferenceID: number,
    arrayOfIDs: number[]
}

export interface ConferenceDetails {
    id: number,
    address: string,
    country: string,
    description: string,
    startDate: Date,
    endDate: Date,
    title: string,
    socialMedia: string,
    buildingPlans: ConferenceBuildngPlan[],
    accommodations: Accommodation[],
    sponsors: Sponsor[],
    pointsOfInterest: PointOfInterest[],
    emergencyNumbers: EmergencyNumber[],
    rates: [
      {
        id: number,
        description: string,
        value: number,
        userID: number,
        rateCriterionID: number
      }
    ],
    presentations: Presentation[],
    organizers: Organizer[]
} 

export interface ConferenceState {
    data: Conference[],
    loading: boolean,
    errorMsg: string,
    details: ConferenceDetails | undefined
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

export interface ConferenceDetailsLoadingAction {
    type: typeof CONFERENCE_DETAILS_LOADING,
}
export interface ConferenceDetailsSuccessAction {
    type: typeof CONFERENCE_DETAILS_SUCCESS,
    payload: ConferenceDetails
}
export interface ConferenceDetailsFailAction {
    type: typeof CONFERENCE_DETAILS_FAIL,
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

export interface ConferenceDeleteAction {
    type: typeof CONFERENCE_DELETE,
}
export interface ConferenceDeleteSuccessAction {
    type: typeof CONFERENCE_DELETE_SUCCESS,
    payload: string
}
export interface ConferenceDeleteFailAction {
    type: typeof CONFERENCE_DELETE_FAIL,
    payload: string
}

export type ConferenceAction = 
ConferenceListLoadingAction | ConferenceListFailAction | ConferenceListSuccessAction |
ConferenceDetailsLoadingAction | ConferenceDetailsFailAction | ConferenceDetailsSuccessAction |
ConferenceAddAction | ConferenceAddSuccessAction | ConferenceAddFailAction |
ConferenceDeleteAction | ConferenceDeleteSuccessAction | ConferenceDeleteFailAction;
