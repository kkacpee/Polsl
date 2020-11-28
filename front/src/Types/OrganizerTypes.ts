export const ORGANIZER_LIST_LOADING= "ORGANIZER_LIST_LOADING";
export const ORGANIZER_LIST_SUCCESS= "ORGANIZER_LIST_SUCCESS";
export const ORGANIZER_LIST_FAIL= "ORGANIZER_LIST_FAIL";
export const ORGANIZER_ADD= "ORGANIZER_ADD";
export const ORGANIZER_ADD_SUCCESS= "ORGANIZER_ADD_SUCCESS";
export const ORGANIZER_ADD_FAIL= "ORGANIZER_ADD_FAIL";
export const ORGANIZER_DELETE="ORGANIZER_DELETE";
export const ORGANIZER_DELETE_SUCCESS= "ORGANIZER_DELETE_SUCCESS";
export const ORGANIZER_DELETE_FAIL= "ORGANIZER_DELETE_FAIL";
export const ORGANIZER_EDIT="ORGANIZER_EDIT";
export const ORGANIZER_EDIT_SUCCESS= "ORGANIZER_EDIT_SUCCESS";
export const ORGANIZER_EDIT_FAIL= "ORGANIZER_EDIT_FAIL";

export interface Organizer {
    id: number,
    firstName: string,
    lastName: string,
    affiliation: string,
    company: string,
    contact: string
}

export interface AddOrganizerRequest {
    firstName: string,
    lastName: string,
    affiliation: string,
    company: string,
    contact: string
}

export interface OrganizerState {
    data: Organizer[],
    loading: boolean,
    errorMsg: string
}

export interface OrganizerError {
    cod: string,
    message: string
}

export interface OrganizerListLoadingAction {
    type: typeof ORGANIZER_LIST_LOADING,
}
export interface OrganizerListSuccessAction {
    type: typeof ORGANIZER_LIST_SUCCESS,
    payload: Organizer[]
}
export interface OrganizerListFailAction {
    type: typeof ORGANIZER_LIST_FAIL,
    payload: string
}

export interface OrganizerAddAction {
    type: typeof ORGANIZER_ADD,
}
export interface OrganizerAddSuccessAction {
    type: typeof ORGANIZER_ADD_SUCCESS,
    payload: string
}
export interface OrganizerAddFailAction {
    type: typeof ORGANIZER_ADD_FAIL,
    payload: string
}

export interface OrganizerDeleteAction {
    type: typeof ORGANIZER_DELETE,
}
export interface OrganizerDeleteSuccessAction {
    type: typeof ORGANIZER_DELETE_SUCCESS,
    payload: string
}
export interface OrganizerDeleteFailAction {
    type: typeof ORGANIZER_DELETE_FAIL,
    payload: string
}

export interface OrganizerEditAction {
    type: typeof ORGANIZER_EDIT,
}
export interface OrganizerEditSuccessAction {
    type: typeof ORGANIZER_EDIT_SUCCESS,
    payload: string
}
export interface OrganizerEditFailAction {
    type: typeof ORGANIZER_EDIT_FAIL,
    payload: string
}

export type OrganizerAction = 
OrganizerListLoadingAction | OrganizerListFailAction | OrganizerListSuccessAction |
OrganizerAddAction | OrganizerAddSuccessAction | OrganizerAddFailAction |
OrganizerDeleteAction | OrganizerDeleteSuccessAction | OrganizerDeleteFailAction | 
OrganizerEditAction | OrganizerEditSuccessAction | OrganizerEditFailAction;
