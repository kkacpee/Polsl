export const BUILDINGPLAN_LIST_LOADING= "BUILDINGPLAN_LIST_LOADING";
export const BUILDINGPLAN_LIST_SUCCESS= "BUILDINGPLAN_LIST_SUCCESS";
export const BUILDINGPLAN_LIST_FAIL= "BUILDINGPLAN_LIST_FAIL";
export const BUILDINGPLAN_ADD= "BUILDINGPLAN_ADD";
export const BUILDINGPLAN_ADD_SUCCESS= "BUILDINGPLAN_ADD_SUCCESS";
export const BUILDINGPLAN_ADD_FAIL= "BUILDINGPLAN_ADD_FAIL";
export const BUILDINGPLAN_DELETE="BUILDINGPLAN_DELETE";
export const BUILDINGPLAN_DELETE_SUCCESS= "BUILDINGPLAN_DELETE_SUCCESS";
export const BUILDINGPLAN_DELETE_FAIL= "BUILDINGPLAN_DELETE_FAIL";
export const BUILDINGPLAN_EDIT="BUILDINGPLAN_EDIT";
export const BUILDINGPLAN_EDIT_SUCCESS= "BUILDINGPLAN_EDIT_SUCCESS";
export const BUILDINGPLAN_EDIT_FAIL= "BUILDINGPLAN_EDIT_FAIL";

export interface BuildingPlan {
    id: number,
    name: string,
    path: string,
    description: string,
    conferenceId: number
}

export interface ConferenceBuildngPlan {
    id: number,
    name: string,
    path: string,
    description: string
}

export interface AddBuildingPlanRequest {
    name: string,
    file: File,
    description: string,
    conferenceId: number
}

export interface BuildingPlanState {
    data: BuildingPlan[],
    loading: boolean,
    errorMsg: string
}

export interface BuildingPlanError {
    cod: string,
    message: string
}

export interface BuildingPlanListLoadingAction {
    type: typeof BUILDINGPLAN_LIST_LOADING,
}
export interface BuildingPlanListSuccessAction {
    type: typeof BUILDINGPLAN_LIST_SUCCESS,
    payload: BuildingPlan[]
}
export interface BuildingPlanListFailAction {
    type: typeof BUILDINGPLAN_LIST_FAIL,
    payload: string
}

export interface BuildingPlanAddAction {
    type: typeof BUILDINGPLAN_ADD,
}
export interface BuildingPlanAddSuccessAction {
    type: typeof BUILDINGPLAN_ADD_SUCCESS,
    payload: string
}
export interface BuildingPlanAddFailAction {
    type: typeof BUILDINGPLAN_ADD_FAIL,
    payload: string
}

export interface BuildingPlanDeleteAction {
    type: typeof BUILDINGPLAN_DELETE,
}
export interface BuildingPlanDeleteSuccessAction {
    type: typeof BUILDINGPLAN_DELETE_SUCCESS,
    payload: string
}
export interface BuildingPlanDeleteFailAction {
    type: typeof BUILDINGPLAN_DELETE_FAIL,
    payload: string
}

export interface BuildingPlanEditAction {
    type: typeof BUILDINGPLAN_EDIT,
}
export interface BuildingPlanEditSuccessAction {
    type: typeof BUILDINGPLAN_EDIT_SUCCESS,
    payload: string
}
export interface BuildingPlanEditFailAction {
    type: typeof BUILDINGPLAN_EDIT_FAIL,
    payload: string
}

export type BuildingPlanAction = 
BuildingPlanListLoadingAction | BuildingPlanListFailAction | BuildingPlanListSuccessAction |
BuildingPlanAddAction | BuildingPlanAddSuccessAction | BuildingPlanAddFailAction |
BuildingPlanDeleteAction | BuildingPlanDeleteSuccessAction | BuildingPlanDeleteFailAction |
BuildingPlanEditAction | BuildingPlanEditSuccessAction | BuildingPlanEditFailAction;
