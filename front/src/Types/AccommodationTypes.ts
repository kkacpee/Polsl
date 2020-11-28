export const ACCOMMODATION_LIST_LOADING= "ACCOMMODATION_LIST_LOADING";
export const ACCOMMODATION_LIST_SUCCESS= "ACCOMMODATION_LIST_SUCCESS";
export const ACCOMMODATION_LIST_FAIL= "ACCOMMODATION_LIST_FAIL";
export const ACCOMMODATION_ADD= "ACCOMMODATION_ADD";
export const ACCOMMODATION_ADD_SUCCESS= "ACCOMMODATION_ADD_SUCCESS";
export const ACCOMMODATION_ADD_FAIL= "ACCOMMODATION_ADD_FAIL";
export const ACCOMMODATION_DELETE="ACCOMMODATION_DELETE";
export const ACCOMMODATION_DELETE_SUCCESS= "ACCOMMODATION_DELETE_SUCCESS";
export const ACCOMMODATION_DELETE_FAIL= "ACCOMMODATION_DELETE_FAIL";
export const ACCOMMODATION_EDIT="ACCOMMODATION_EDIT";
export const ACCOMMODATION_EDIT_SUCCESS= "ACCOMMODATION_EDIT_SUCCESS";
export const ACCOMMODATION_EDIT_FAIL= "ACCOMMODATION_EDIT_FAIL";

export interface Accommodation {
    id: number,
    name: string,
    number: string,
    address: string,
    website: string
}

export interface AddAccommodationRequest {
    name: string,
    number: string,
    address: string,
    website: string
}

export interface AccommodationState {
    data: Accommodation[],
    loading: boolean,
    errorMsg: string
}

export interface AccommodationError {
    cod: string,
    message: string
}

export interface AccommodationListLoadingAction {
    type: typeof ACCOMMODATION_LIST_LOADING,
}
export interface AccommodationListSuccessAction {
    type: typeof ACCOMMODATION_LIST_SUCCESS,
    payload: Accommodation[]
}
export interface AccommodationListFailAction {
    type: typeof ACCOMMODATION_LIST_FAIL,
    payload: string
}

export interface AccommodationAddAction {
    type: typeof ACCOMMODATION_ADD,
}
export interface AccommodationAddSuccessAction {
    type: typeof ACCOMMODATION_ADD_SUCCESS,
    payload: string
}
export interface AccommodationAddFailAction {
    type: typeof ACCOMMODATION_ADD_FAIL,
    payload: string
}

export interface AccommodationDeleteAction {
    type: typeof ACCOMMODATION_DELETE,
}
export interface AccommodationDeleteSuccessAction {
    type: typeof ACCOMMODATION_DELETE_SUCCESS,
    payload: string
}
export interface AccommodationDeleteFailAction {
    type: typeof ACCOMMODATION_DELETE_FAIL,
    payload: string
}

export interface AccommodationEditAction {
    type: typeof ACCOMMODATION_EDIT,
}
export interface AccommodationEditSuccessAction {
    type: typeof ACCOMMODATION_EDIT_SUCCESS,
    payload: string
}
export interface AccommodationEditFailAction {
    type: typeof ACCOMMODATION_EDIT_FAIL,
    payload: string
}

export type AccommodationAction = 
AccommodationListLoadingAction | AccommodationListFailAction | AccommodationListSuccessAction |
AccommodationAddAction | AccommodationAddSuccessAction | AccommodationAddFailAction |
AccommodationDeleteAction | AccommodationDeleteSuccessAction | AccommodationDeleteFailAction |
AccommodationEditAction | AccommodationEditSuccessAction | AccommodationEditFailAction;
