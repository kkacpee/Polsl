import {BuildingPlanState, 
    BuildingPlanAction, 
    BUILDINGPLAN_LIST_LOADING, 
    BUILDINGPLAN_LIST_FAIL, 
    BUILDINGPLAN_LIST_SUCCESS,
    BUILDINGPLAN_ADD,
    BUILDINGPLAN_ADD_SUCCESS,
    BUILDINGPLAN_ADD_FAIL} from '../Types/BuildingPlanTypes'
    
const DefaultState: BuildingPlanState  = {
    loading: false,
    data: [],
    errorMsg: ""
};

const BuildingPlanReducer = (state = DefaultState, action: BuildingPlanAction) => {
    switch (action.type) {
        case BUILDINGPLAN_LIST_LOADING:
            return {
                ...state,
                loading: true,
                errorMsg: ""
            };
        case BUILDINGPLAN_LIST_FAIL:
            return {
                ...state,
                loading: false,
                errorMsg: action.payload
            };
        case BUILDINGPLAN_LIST_SUCCESS:
        return {
            ...state,
            loading: false,
            data: action.payload,
            errorMsg: ""
        };
        case BUILDINGPLAN_ADD:
            return {
                ...state,
                loading: true,
                errorMsg: ""
            };
        case BUILDINGPLAN_ADD_SUCCESS:
            return {
                ...state,
                loading: false,
                errorMsg: action.payload
            };
        case BUILDINGPLAN_ADD_FAIL:
        return {
            ...state,
            loading: false,
            errorMsg: action.payload
        };
        default:
            return state
    }
};

export default BuildingPlanReducer;