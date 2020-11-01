export const ACCOMMODATION_LIST_LOADING= "ACCOMMODATION_LIST_LOADING";
export const ACCOMMODATION_LIST_SUCCESS= "ACCOMMODATION_LIST_SUCCESS";
export const ACCOMMODATION_LIST_FAIL= "ACCOMMODATION_LIST_FAIL";

export interface Accommodation {
    id: number,
    address: string,
    name: string,
    website:string,
    number:string
}

export interface AccomodationState {
    data: Accommodation[],
    loading: boolean,
    errorMsg: string
}

export interface AccommodationError {
    cod: string,
    message: string
}

export interface AccomodationListLoadingAction {
    type: typeof ACCOMMODATION_LIST_LOADING,
}
export interface AccomodationListSuccessAction {
    type: typeof ACCOMMODATION_LIST_SUCCESS,
    payload: Accommodation[]
}
export interface AccomodationListFailAction {
    type: typeof ACCOMMODATION_LIST_FAIL,
    payload: string
}

export type AccommodationAction = AccomodationListLoadingAction | AccomodationListFailAction | AccomodationListSuccessAction;