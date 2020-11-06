import {EmergencyNumberState, 
    EmergencyNumberAction, 
    EMERGENCYNUMBER_LIST_LOADING, 
    EMERGENCYNUMBER_LIST_FAIL, 
    EMERGENCYNUMBER_LIST_SUCCESS,
    EMERGENCYNUMBER_ADD,
    EMERGENCYNUMBER_ADD_SUCCESS,
    EMERGENCYNUMBER_ADD_FAIL} from '../Types/EmergencyNumberTypes'
    
const DefaultState: EmergencyNumberState  = {
    loading: false,
    data: [],
    errorMsg: ""
};

const EmergencyNumberReducer = (state = DefaultState, action: EmergencyNumberAction) => {
    switch (action.type) {
        case EMERGENCYNUMBER_LIST_LOADING:
            return {
                ...state,
                loading: true,
                errorMsg: ""
            };
        case EMERGENCYNUMBER_LIST_FAIL:
            return {
                ...state,
                loading: false,
                errorMsg: action.payload
            };
        case EMERGENCYNUMBER_LIST_SUCCESS:
        return {
            ...state,
            loading: false,
            data: action.payload,
            errorMsg: ""
        };
        case EMERGENCYNUMBER_ADD:
            return {
                ...state,
                loading: true,
                errorMsg: ""
            };
        case EMERGENCYNUMBER_ADD_SUCCESS:
            return {
                ...state,
                loading: false,
                errorMsg: action.payload
            };
        case EMERGENCYNUMBER_ADD_FAIL:
        return {
            ...state,
            loading: false,
            errorMsg: action.payload
        };
        default:
            return state
    }
};

export default EmergencyNumberReducer;