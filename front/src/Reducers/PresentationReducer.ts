import {PresentationState, 
    PresentationAction, 
    PRESENTATION_ADD,
    PRESENTATION_ADD_SUCCESS,
    PRESENTATION_ADD_FAIL,
    PRESENTATION_DETAILS_LOADING,
    PRESENTATION_DETAILS_FAIL,
    PRESENTATION_DETAILS_SUCCESS,
    PRESENTATION_TYPE_LIST,
    PRESENTATION_TYPE_LIST_FAIL,
    PRESENTATION_TYPE_LIST_SUCCESS} from '../Types/PresentationTypes'
    
const DefaultState: PresentationState  = {
    loading: false,
    errorMsg: "",
    details: undefined,
    types: []
};

const PresentationReducer = (state = DefaultState, action: PresentationAction) => {
    switch (action.type) {
        case PRESENTATION_DETAILS_LOADING:
            return {
                ...state,
                loading: true,
                errorMsg: ""
            };
        case PRESENTATION_DETAILS_FAIL:
            return {
                ...state,
                loading: false,
                errorMsg: action.payload
            };
        case PRESENTATION_DETAILS_SUCCESS:
        return {
            ...state,
            loading: false,
            details: action.payload,
            errorMsg: ""
        };
        case PRESENTATION_ADD:
            return {
                ...state,
                loading: true,
                errorMsg: ""
            };
        case PRESENTATION_ADD_SUCCESS:
            return {
                ...state,
                loading: false,
                errorMsg: action.payload
            };
        case PRESENTATION_ADD_FAIL:
        return {
            ...state,
            loading: false,
            errorMsg: action.payload
        };
        case PRESENTATION_TYPE_LIST:
            return {
                ...state,
                loading: true,
                errorMsg: ""
            };
        case PRESENTATION_TYPE_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                types: action.payload
            };
        case PRESENTATION_TYPE_LIST_FAIL:
        return {
            ...state,
            loading: false,
            errorMsg: action.payload
        };
        default:
            return state
    }
};

export default PresentationReducer;