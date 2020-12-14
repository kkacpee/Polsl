import { pathToFileURL } from 'url';
import {RateState, 
    RateAction, 
    RATE_LIST_LOADING, 
    RATE_LIST_FAIL, 
    RATE_LIST_SUCCESS,
    RATE_ADD,
    RATE_ADD_SUCCESS,
    RATE_ADD_FAIL,
    RATE_CRITERION_TYPE_LIST_LOADING,
    RATE_CRITERION_TYPE_LIST_FAIL,
    RATE_CRITERION_TYPE_LIST_SUCCESS,
    RATE_CRITERION_LIST_LOADING,
    RATE_CRITERION_LIST_FAIL,
    RATE_CRITERION_LIST_SUCCESS} from '../Types/RateTypes'
    
const DefaultState: RateState  = {
    loading: false,
    data: [],
    errorMsg: "",
    types: [],
    criterions: []
};

const RateReducer = (state = DefaultState, action: RateAction) => {
    switch (action.type) {
        case RATE_LIST_LOADING:
            return {
                ...state,
                loading: true,
                errorMsg: ""
            };
        case RATE_LIST_FAIL:
            return {
                ...state,
                loading: false,
                errorMsg: action.payload
            };
        case RATE_LIST_SUCCESS:
        return {
            ...state,
            loading: false,
            data: action.payload,
            errorMsg: ""
        };
        case RATE_ADD:
            return {
                ...state,
                loading: true,
                errorMsg: ""
            };
        case RATE_ADD_SUCCESS:
            return {
                ...state,
                loading: false,
                errorMsg: action.payload
            };
        case RATE_ADD_FAIL:
        return {
            ...state,
            loading: false,
            errorMsg: action.payload
        };
        case RATE_CRITERION_TYPE_LIST_LOADING:
            return {
                ...state,
                loading: true,
                errorMsg: ""
            };
        case RATE_CRITERION_TYPE_LIST_FAIL:
            return {
                ...state,
                loading: false,
                errorMsg: action.payload
            };
        case RATE_CRITERION_TYPE_LIST_SUCCESS:
        return {
            ...state,
            loading: false,
            types: action.payload,
            errorMsg: ""
            };
        case RATE_CRITERION_LIST_LOADING:
        return {
            ...state,
            loading: true,
            errorMsg: ""
            };
        case RATE_CRITERION_LIST_FAIL:
            return {
                ...state,
                loading: false,
                errorMsg: action.payload
            };
        case RATE_CRITERION_LIST_SUCCESS:
        return {
            ...state,
            loading: false,
            criterions: action.payload,
            errorMsg: ""
            };
        default:
            return state
    }
};

export default RateReducer;