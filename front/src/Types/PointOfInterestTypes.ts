export const POINTOFINTEREST_LIST_LOADING= "POINTOFINTEREST_LIST_LOADING";
export const POINTOFINTEREST_LIST_SUCCESS= "POINTOFINTEREST_LIST_SUCCESS";
export const POINTOFINTEREST_LIST_FAIL= "POINTOFINTEREST_LIST_FAIL";
export const POINTOFINTEREST_ADD= "POINTOFINTEREST_ADD";
export const POINTOFINTEREST_ADD_SUCCESS= "POINTOFINTEREST_ADD_SUCCESS";
export const POINTOFINTEREST_ADD_FAIL= "POINTOFINTEREST_ADD_FAIL";
export const POINTOFINTEREST_DELETE="POINTOFINTEREST_DELETE";
export const POINTOFINTEREST_DELETE_SUCCESS= "POINTOFINTEREST_DELETE_SUCCESS";
export const POINTOFINTEREST_DELETE_FAIL= "POINTOFINTEREST_DELETE_FAIL"

export interface PointOfInterest {
    id: number,
    name: string,
    address: string,
    description: string,
    contact: string,
    pointOfInterestTypeID: number
    pointOfInterestTypeName: number
}

export interface AddPointOfInterestRequest {
    name: string,
    address: string,
    description: string,
    contact: string,
    pointOfInterestTypeID: number
}

export interface PointOfInterestState {
    data: PointOfInterest[],
    loading: boolean,
    errorMsg: string
}

export interface PointOfInterestError {
    cod: string,
    message: string
}

export interface PointOfInterestListLoadingAction {
    type: typeof POINTOFINTEREST_LIST_LOADING,
}
export interface PointOfInterestListSuccessAction {
    type: typeof POINTOFINTEREST_LIST_SUCCESS,
    payload: PointOfInterest[]
}
export interface PointOfInterestListFailAction {
    type: typeof POINTOFINTEREST_LIST_FAIL,
    payload: string
}

export interface PointOfInterestAddAction {
    type: typeof POINTOFINTEREST_ADD,
}
export interface PointOfInterestAddSuccessAction {
    type: typeof POINTOFINTEREST_ADD_SUCCESS,
    payload: string
}
export interface PointOfInterestAddFailAction {
    type: typeof POINTOFINTEREST_ADD_FAIL,
    payload: string
}

export interface PointOfInterestDeleteAction {
    type: typeof POINTOFINTEREST_DELETE,
}
export interface PointOfInterestDeleteSuccessAction {
    type: typeof POINTOFINTEREST_DELETE_SUCCESS,
    payload: string
}
export interface PointOfInterestDeleteFailAction {
    type: typeof POINTOFINTEREST_DELETE_FAIL,
    payload: string
}

export type PointOfInterestAction = 
PointOfInterestListLoadingAction | PointOfInterestListFailAction | PointOfInterestListSuccessAction |
PointOfInterestAddAction | PointOfInterestAddSuccessAction | PointOfInterestAddFailAction |
PointOfInterestDeleteAction | PointOfInterestDeleteSuccessAction | PointOfInterestDeleteFailAction;
