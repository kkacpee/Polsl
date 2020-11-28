export const POINTOFINTEREST_LIST_LOADING= "POINTOFINTEREST_LIST_LOADING";
export const POINTOFINTEREST_LIST_SUCCESS= "POINTOFINTEREST_LIST_SUCCESS";
export const POINTOFINTEREST_LIST_FAIL= "POINTOFINTEREST_LIST_FAIL";
export const POINTOFINTEREST_ADD= "POINTOFINTEREST_ADD";
export const POINTOFINTEREST_ADD_SUCCESS= "POINTOFINTEREST_ADD_SUCCESS";
export const POINTOFINTEREST_ADD_FAIL= "POINTOFINTEREST_ADD_FAIL";
export const POINTOFINTEREST_DELETE="POINTOFINTEREST_DELETE";
export const POINTOFINTEREST_DELETE_SUCCESS= "POINTOFINTEREST_DELETE_SUCCESS";
export const POINTOFINTEREST_DELETE_FAIL= "POINTOFINTEREST_DELETE_FAIL";
export const POINTOFINTEREST_EDIT="POINTOFINTEREST_EDIT";
export const POINTOFINTEREST_EDIT_SUCCESS= "POINTOFINTEREST_EDIT_SUCCESS";
export const POINTOFINTEREST_EDIT_FAIL= "POINTOFINTEREST_EDIT_FAIL";

export const POINTOFINTEREST_TYPE_LIST= "POINTOFINTEREST_TYPE_LIST";
export const POINTOFINTEREST_TYPE_LIST_SUCCESS= "POINTOFINTEREST_TYPE_LIST_SUCCESS";
export const POINTOFINTEREST_TYPE_LIST_FAIL= "POINTOFINTEREST_TYPE_LIST_FAIL";
export const POINTOFINTEREST_TYPE_ADD= "POINTOFINTEREST_TYPE_ADD";
export const POINTOFINTEREST_TYPE_ADD_SUCCESS= "POINTOFINTEREST_TYPE_ADD_SUCCESS";
export const POINTOFINTEREST_TYPE_ADD_FAIL= "POINTOFINTEREST_TYPE_ADD_FAIL";
export const POINTOFINTEREST_TYPE_DELETE="POINTOFINTEREST_TYPE_DELETE";
export const POINTOFINTEREST_TYPE_DELETE_SUCCESS= "POINTOFINTEREST_TYPE_DELETE_SUCCESS";
export const POINTOFINTEREST_TYPE_DELETE_FAIL= "POINTOFINTEREST_TYPE_DELETE_FAIL";
export const POINTOFINTEREST_TYPE_EDIT="POINTOFINTEREST_TYPE_EDIT";
export const POINTOFINTEREST_TYPE_EDIT_SUCCESS= "POINTOFINTEREST_TYPE_EDIT_SUCCESS";
export const POINTOFINTEREST_TYPE_EDIT_FAIL= "POINTOFINTEREST_TYPE_EDIT_FAIL";

export interface PointOfInterest {
    id: number,
    name: string,
    address: string,
    description: string,
    contact: string,
    pointOfInterestTypeID: number,
    pointOfInterestTypeName: number
}

export interface PointOfInterestType {
    id: number,
    name: string,
    path: string
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
    errorMsg: string,
    types: PointOfInterestType[] | undefined
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

export interface PointOfInterestEditAction {
    type: typeof POINTOFINTEREST_EDIT,
}
export interface PointOfInterestEditSuccessAction {
    type: typeof POINTOFINTEREST_EDIT_SUCCESS,
    payload: string
}
export interface PointOfInterestEditFailAction {
    type: typeof POINTOFINTEREST_EDIT_FAIL,
    payload: string
}

export interface PointOfInterestTypeListLoadingAction {
    type: typeof POINTOFINTEREST_TYPE_LIST,
}
export interface PointOfInterestTypeListSuccessAction {
    type: typeof POINTOFINTEREST_TYPE_LIST_SUCCESS,
    payload: PointOfInterestType[]
}
export interface PointOfInterestTypeListFailAction {
    type: typeof POINTOFINTEREST_TYPE_LIST_FAIL,
    payload: string
}

export interface PointOfInterestTypeAddAction {
    type: typeof POINTOFINTEREST_TYPE_ADD,
}
export interface PointOfInterestTypeAddSuccessAction {
    type: typeof POINTOFINTEREST_TYPE_ADD_SUCCESS,
    payload: string
}
export interface PointOfInterestTypeAddFailAction {
    type: typeof POINTOFINTEREST_TYPE_ADD_FAIL,
    payload: string
}

export interface PointOfInterestTypeDeleteAction {
    type: typeof POINTOFINTEREST_TYPE_DELETE,
}
export interface PointOfInterestTypeDeleteSuccessAction {
    type: typeof POINTOFINTEREST_TYPE_DELETE_SUCCESS,
    payload: string
}
export interface PointOfInterestTypeDeleteFailAction {
    type: typeof POINTOFINTEREST_TYPE_DELETE_FAIL,
    payload: string
}

export interface PointOfInterestTypeEditAction {
    type: typeof POINTOFINTEREST_TYPE_EDIT,
}
export interface PointOfInterestTypeEditSuccessAction {
    type: typeof POINTOFINTEREST_TYPE_EDIT_SUCCESS,
    payload: string
}
export interface PointOfInterestTypeEditFailAction {
    type: typeof POINTOFINTEREST_TYPE_EDIT_FAIL,
    payload: string
}

export type PointOfInterestAction = 
PointOfInterestListLoadingAction | PointOfInterestListFailAction | PointOfInterestListSuccessAction |
PointOfInterestAddAction | PointOfInterestAddSuccessAction | PointOfInterestAddFailAction |
PointOfInterestDeleteAction | PointOfInterestDeleteSuccessAction | PointOfInterestDeleteFailAction |
PointOfInterestEditAction | PointOfInterestEditSuccessAction | PointOfInterestEditFailAction |
PointOfInterestTypeListLoadingAction | PointOfInterestTypeListFailAction | PointOfInterestTypeListSuccessAction |
PointOfInterestTypeAddAction | PointOfInterestTypeAddSuccessAction | PointOfInterestTypeAddFailAction |
PointOfInterestTypeDeleteAction | PointOfInterestTypeDeleteSuccessAction | PointOfInterestTypeDeleteFailAction |
PointOfInterestTypeEditAction | PointOfInterestTypeEditSuccessAction | PointOfInterestTypeEditFailAction;
