export const SPONSOR_LIST_LOADING= "SPONSOR_LIST_LOADING";
export const SPONSOR_LIST_SUCCESS= "SPONSOR_LIST_SUCCESS";
export const SPONSOR_LIST_FAIL= "SPONSOR_LIST_FAIL";
export const SPONSOR_ADD= "SPONSOR_ADD";
export const SPONSOR_ADD_SUCCESS= "SPONSOR_ADD_SUCCESS";
export const SPONSOR_ADD_FAIL= "SPONSOR_ADD_FAIL";
export const SPONSOR_DELETE="SPONSOR_DELETE";
export const SPONSOR_DELETE_SUCCESS= "SPONSOR_DELETE_SUCCESS";
export const SPONSOR_DELETE_FAIL= "SPONSOR_DELETE_FAIL";
export const SPONSOR_EDIT="SPONSOR_EDIT";
export const SPONSOR_EDIT_SUCCESS= "SPONSOR_EDIT_SUCCESS";
export const SPONSOR_EDIT_FAIL= "SPONSOR_EDIT_FAIL";

export interface Sponsor {
    id: number,
    name: string,
    country: string,
    description: string,
    logoPath: string,
    website: string
}

export interface AddSponsorRequest {
    name: string,
    country: string,
    description: string,
    logoPath: string,
    website: string
}

export interface SponsorState {
    data: Sponsor[],
    loading: boolean,
    errorMsg: string
}

export interface SponsorError {
    cod: string,
    message: string
}

export interface SponsorListLoadingAction {
    type: typeof SPONSOR_LIST_LOADING,
}
export interface SponsorListSuccessAction {
    type: typeof SPONSOR_LIST_SUCCESS,
    payload: Sponsor[]
}
export interface SponsorListFailAction {
    type: typeof SPONSOR_LIST_FAIL,
    payload: string
}

export interface SponsorAddAction {
    type: typeof SPONSOR_ADD,
}
export interface SponsorAddSuccessAction {
    type: typeof SPONSOR_ADD_SUCCESS,
    payload: string
}
export interface SponsorAddFailAction {
    type: typeof SPONSOR_ADD_FAIL,
    payload: string
}

export interface SponsorDeleteAction {
    type: typeof SPONSOR_DELETE,
}
export interface SponsorDeleteSuccessAction {
    type: typeof SPONSOR_DELETE_SUCCESS,
    payload: string
}
export interface SponsorDeleteFailAction {
    type: typeof SPONSOR_DELETE_FAIL,
    payload: string
}

export interface SponsorEditAction {
    type: typeof SPONSOR_EDIT,
}
export interface SponsorEditSuccessAction {
    type: typeof SPONSOR_EDIT_SUCCESS,
    payload: string
}
export interface SponsorEditFailAction {
    type: typeof SPONSOR_EDIT_FAIL,
    payload: string
}

export type SponsorAction = 
SponsorListLoadingAction | SponsorListFailAction | SponsorListSuccessAction |
SponsorAddAction | SponsorAddSuccessAction | SponsorAddFailAction |
SponsorDeleteAction | SponsorDeleteSuccessAction | SponsorDeleteFailAction |
SponsorEditAction | SponsorEditSuccessAction | SponsorEditFailAction;
