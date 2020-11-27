import { pathToFileURL } from 'url';
import {PointOfInterestState, 
    PointOfInterestAction, 
    POINTOFINTEREST_LIST_LOADING, 
    POINTOFINTEREST_LIST_FAIL, 
    POINTOFINTEREST_LIST_SUCCESS,
    POINTOFINTEREST_ADD,
    POINTOFINTEREST_ADD_SUCCESS,
    POINTOFINTEREST_ADD_FAIL,
    POINTOFINTEREST_TYPE_LIST,
    POINTOFINTEREST_TYPE_LIST_FAIL,
    POINTOFINTEREST_TYPE_LIST_SUCCESS} from '../Types/PointOfInterestTypes'
    
const DefaultState: PointOfInterestState  = {
    loading: false,
    data: [],
    errorMsg: "",
    types: []
};

const PointOfInterestReducer = (state = DefaultState, action: PointOfInterestAction) => {
    switch (action.type) {
        case POINTOFINTEREST_LIST_LOADING:
            return {
                ...state,
                loading: true,
                errorMsg: ""
            };
        case POINTOFINTEREST_LIST_FAIL:
            return {
                ...state,
                loading: false,
                errorMsg: action.payload
            };
        case POINTOFINTEREST_LIST_SUCCESS:
        return {
            ...state,
            loading: false,
            data: action.payload,
            errorMsg: ""
        };
        case POINTOFINTEREST_ADD:
            return {
                ...state,
                loading: true,
                errorMsg: ""
            };
        case POINTOFINTEREST_ADD_SUCCESS:
            return {
                ...state,
                loading: false,
                errorMsg: action.payload
            };
        case POINTOFINTEREST_ADD_FAIL:
        return {
            ...state,
            loading: false,
            errorMsg: action.payload
        };
        case POINTOFINTEREST_TYPE_LIST:
            return {
                ...state,
                loading: true,
                errorMsg: ""
            };
        case POINTOFINTEREST_TYPE_LIST_FAIL:
            return {
                ...state,
                loading: false,
                errorMsg: action.payload
            };
        case POINTOFINTEREST_TYPE_LIST_SUCCESS:
        return {
            ...state,
            loading: false,
            types: action.payload,
            errorMsg: ""
        };
        default:
            return state
    }
};

export default PointOfInterestReducer;