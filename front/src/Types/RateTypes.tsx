export const RATE_LIST_LOADING= "RATE_LIST_LOADING";
export const RATE_LIST_SUCCESS= "RATE_LIST_SUCCESS";
export const RATE_LIST_FAIL= "RATE_LIST_FAIL";
export const RATE_ADD= "RATE_ADD";
export const RATE_ADD_SUCCESS= "RATE_ADD_SUCCESS";
export const RATE_ADD_FAIL= "RATE_ADD_FAIL";
export const RATE_DELETE="RATE_DELETE";
export const RATE_DELETE_SUCCESS= "RATE_DELETE_SUCCESS";
export const RATE_DELETE_FAIL= "RATE_DELETE_FAIL";
export const RATE_EDIT="RATE_EDIT";
export const RATE_EDIT_SUCCESS= "RATE_EDIT_SUCCESS";
export const RATE_EDIT_FAIL= "RATE_EDIT_FAIL";

export const RATE_CRITERION_LIST_LOADING= "RATE_CRITERION_LIST_LOADING";
export const RATE_CRITERION_LIST_SUCCESS= "RATE_CRITERION_LIST_SUCCESS";
export const RATE_CRITERION_LIST_FAIL= "RATE_CRITERION_LIST_FAIL";
export const RATE_CRITERION_ADD= "RATE_CRITERION_ADD";
export const RATE_CRITERION_ADD_SUCCESS= "RATE_CRITERION_ADD_SUCCESS";
export const RATE_CRITERION_ADD_FAIL= "RATE_CRITERION_ADD_FAIL";
export const RATE_CRITERION_DELETE="RATE_CRITERION_DELETE";
export const RATE_CRITERION_DELETE_SUCCESS= "RATE_CRITERION_DELETE_SUCCESS";
export const RATE_CRITERION_DELETE_FAIL= "RATE_CRITERION_DELETE_FAIL";
export const RATE_CRITERION_EDIT="RATE_CRITERION_EDIT";
export const RATE_CRITERION_EDIT_SUCCESS= "RATE_CRITERION_EDIT_SUCCESS";
export const RATE_CRITERION_EDIT_FAIL= "RATE_CRITERION_EDIT_FAIL";

export const RATE_CRITERION_TYPE_LIST_LOADING= "RATE_CRITERION_TYPE_LIST_LOADING";
export const RATE_CRITERION_TYPE_LIST_SUCCESS= "RATE_CRITERION_TYPE_LIST_SUCCESS";
export const RATE_CRITERION_TYPE_LIST_FAIL= "RATE_CRITERION_TYPE_LIST_FAIL";
export const RATE_CRITERION_TYPE_ADD= "RATE_CRITERION_TYPE_ADD";
export const RATE_CRITERION_TYPE_ADD_SUCCESS= "RATE_CRITERION_TYPE_ADD_SUCCESS";
export const RATE_CRITERION_TYPE_ADD_FAIL= "RATE_CRITERION_TYPE_ADD_FAIL";
export const RATE_CRITERION_TYPE_DELETE="RATE_CRITERION_TYPE_DELETE";
export const RATE_CRITERION_TYPE_DELETE_SUCCESS= "RATE_CRITERION_TYPE_DELETE_SUCCESS";
export const RATE_CRITERION_TYPE_DELETE_FAIL= "RATE_CRITERION_TYPE_DELETE_FAIL";
export const RATE_CRITERION_TYPE_EDIT="RATE_CRITERION_TYPE_EDIT";
export const RATE_CRITERION_TYPE_EDIT_SUCCESS= "RATE_CRITERION_TYPE_EDIT_SUCCESS";
export const RATE_CRITERION_TYPE_EDIT_FAIL= "RATE_CRITERION_TYPE_EDIT_FAIL";

export interface Rate {
    id: number,
    description: string,
    value: number,
    mobileUserID: number,
    rateCriterionID: number,
    rateCriterionName: string,
    conferenceID: number | null,
    conferenceName: string,
    presentationID: number | null,
    presentationName: string,
}

export interface EditRateRequest {
    id: number,
    description: string,
    value: number,
    mobileUserID: number,
    rateCriterionID: number,
    conferenceID: number | null,
    presentationID: number | null
}

export interface AddRateRequest {
    description: string,
    value: number,
    mobileUserID: number,
    rateCriterionID: number,
    conferenceID: number | null,
    presentationID: number | null
}

export interface RateCriterion {
    id: number,
    name: string,
    rateCriterionTypeID: number,
    rateCriterionTypeName: string,
}

export interface EditRateCriterionRequest {
    id: number,
    name: string,
    rateCriterionTypeID: number
}

export interface AddRateCriterionRequest {
    name: string,
    rateCriterionTypeID: number,
}

export interface RateCriterionType {
    id: number,
    name: string,
}

export interface AddRateCriterionTypeRequest {
    name: string,
}


export interface RateState {
    data: Rate[],
    loading: boolean,
    errorMsg: string,
    criterions: RateCriterion[],
    types: RateCriterionType[]
}

export interface RateError {
    cod: string,
    message: string
}

export interface RateListLoadingAction {
    type: typeof RATE_LIST_LOADING,
}
export interface RateListSuccessAction {
    type: typeof RATE_LIST_SUCCESS,
    payload: Rate[]
}
export interface RateListFailAction {
    type: typeof RATE_LIST_FAIL,
    payload: string
}

export interface RateAddAction {
    type: typeof RATE_ADD,
}
export interface RateAddSuccessAction {
    type: typeof RATE_ADD_SUCCESS,
    payload: string
}
export interface RateAddFailAction {
    type: typeof RATE_ADD_FAIL,
    payload: string
}

export interface RateDeleteAction {
    type: typeof RATE_DELETE,
}
export interface RateDeleteSuccessAction {
    type: typeof RATE_DELETE_SUCCESS,
    payload: string
}
export interface RateDeleteFailAction {
    type: typeof RATE_DELETE_FAIL,
    payload: string
}

export interface RateEditAction {
    type: typeof RATE_EDIT,
}
export interface RateEditSuccessAction {
    type: typeof RATE_EDIT_SUCCESS,
    payload: string
}
export interface RateEditFailAction {
    type: typeof RATE_EDIT_FAIL,
    payload: string
}


export interface RateCriterionListLoadingAction {
    type: typeof RATE_CRITERION_LIST_LOADING,
}
export interface RateCriterionListSuccessAction {
    type: typeof RATE_CRITERION_LIST_SUCCESS,
    payload: RateCriterion[]
}
export interface RateCriterionListFailAction {
    type: typeof RATE_CRITERION_LIST_FAIL,
    payload: string
}

export interface RateCriterionAddAction {
    type: typeof RATE_CRITERION_ADD,
}
export interface RateCriterionAddSuccessAction {
    type: typeof RATE_CRITERION_ADD_SUCCESS,
    payload: string
}
export interface RateCriterionAddFailAction {
    type: typeof RATE_CRITERION_ADD_FAIL,
    payload: string
}

export interface RateCriterionDeleteAction {
    type: typeof RATE_CRITERION_DELETE,
}
export interface RateCriterionDeleteSuccessAction {
    type: typeof RATE_CRITERION_DELETE_SUCCESS,
    payload: string
}
export interface RateCriterionDeleteFailAction {
    type: typeof RATE_CRITERION_DELETE_FAIL,
    payload: string
}

export interface RateCriterionEditAction {
    type: typeof RATE_CRITERION_EDIT,
}
export interface RateCriterionEditSuccessAction {
    type: typeof RATE_CRITERION_EDIT_SUCCESS,
    payload: string
}
export interface RateCriterionEditFailAction {
    type: typeof RATE_CRITERION_EDIT_FAIL,
    payload: string
}


export interface RateCriterionTypeListLoadingAction {
    type: typeof RATE_CRITERION_TYPE_LIST_LOADING,
}
export interface RateCriterionTypeListSuccessAction {
    type: typeof RATE_CRITERION_TYPE_LIST_SUCCESS,
    payload: RateCriterionType[]
}
export interface RateCriterionTypeListFailAction {
    type: typeof RATE_CRITERION_TYPE_LIST_FAIL,
    payload: string
}

export interface RateCriterionTypeAddAction {
    type: typeof RATE_CRITERION_TYPE_ADD,
}
export interface RateCriterionTypeAddSuccessAction {
    type: typeof RATE_CRITERION_TYPE_ADD_SUCCESS,
    payload: string
}
export interface RateCriterionTypeAddFailAction {
    type: typeof RATE_CRITERION_TYPE_ADD_FAIL,
    payload: string
}

export interface RateCriterionTypeDeleteAction {
    type: typeof RATE_CRITERION_TYPE_DELETE,
}
export interface RateCriterionTypeDeleteSuccessAction {
    type: typeof RATE_CRITERION_TYPE_DELETE_SUCCESS,
    payload: string
}
export interface RateCriterionTypeDeleteFailAction {
    type: typeof RATE_CRITERION_TYPE_DELETE_FAIL,
    payload: string
}

export interface RateCriterionTypeEditAction {
    type: typeof RATE_CRITERION_TYPE_EDIT,
}
export interface RateCriterionTypeEditSuccessAction {
    type: typeof RATE_CRITERION_TYPE_EDIT_SUCCESS,
    payload: string
}
export interface RateCriterionTypeEditFailAction {
    type: typeof RATE_CRITERION_TYPE_EDIT_FAIL,
    payload: string
}

export type RateAction = 
RateListLoadingAction | RateListFailAction | RateListSuccessAction |
RateAddAction | RateAddSuccessAction | RateAddFailAction |
RateDeleteAction | RateDeleteSuccessAction | RateDeleteFailAction |
RateEditAction | RateEditSuccessAction | RateEditFailAction | 
RateCriterionListLoadingAction | RateCriterionListFailAction | RateCriterionListSuccessAction |
RateCriterionAddAction | RateCriterionAddSuccessAction | RateCriterionAddFailAction |
RateCriterionDeleteAction | RateCriterionDeleteSuccessAction | RateCriterionDeleteFailAction |
RateCriterionEditAction | RateCriterionEditSuccessAction | RateCriterionEditFailAction |
RateCriterionTypeListLoadingAction | RateCriterionTypeListFailAction | RateCriterionTypeListSuccessAction |
RateCriterionTypeAddAction | RateCriterionTypeAddSuccessAction | RateCriterionTypeAddFailAction |
RateCriterionTypeDeleteAction | RateCriterionTypeDeleteSuccessAction | RateCriterionTypeDeleteFailAction |
RateCriterionTypeEditAction | RateCriterionTypeEditSuccessAction | RateCriterionTypeEditFailAction;
