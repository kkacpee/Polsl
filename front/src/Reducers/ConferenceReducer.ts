import {ConferenceState, 
    ConferenceAction, 
    CONFERENCE_LIST_LOADING, 
    CONFERENCE_LIST_FAIL, 
    CONFERENCE_LIST_SUCCESS,
    CONFERENCE_ADD,
    CONFERENCE_ADD_SUCCESS,
    CONFERENCE_ADD_FAIL,
    CONFERENCE_DETAILS_LOADING,
    CONFERENCE_DETAILS_FAIL,
    CONFERENCE_DETAILS_SUCCESS,
    CONFERENCE_EDIT,
    CONFERENCE_EDIT_FAIL,
    CONFERENCE_EDIT_SUCCESS} from '../Types/ConferenceTypes'
    
const DefaultState: ConferenceState  = {
    loading: false,
    data: [],
    errorMsg: "",
    details: undefined
};

const ConferenceReducer = (state = DefaultState, action: ConferenceAction) => {
    switch (action.type) {
        case CONFERENCE_LIST_LOADING:
            return {
                ...state,
                loading: true,
                errorMsg: ""
            };
        case CONFERENCE_LIST_FAIL:
            return {
                ...state,
                loading: false,
                errorMsg: action.payload
            };
        case CONFERENCE_LIST_SUCCESS:
        return {
            ...state,
            loading: false,
            data: action.payload,
            errorMsg: ""
        };
        case CONFERENCE_DETAILS_LOADING:
            return {
                ...state,
                loading: true,
                errorMsg: ""
            };
        case CONFERENCE_DETAILS_FAIL:
            return {
                ...state,
                loading: false,
                errorMsg: action.payload
            };
        case CONFERENCE_DETAILS_SUCCESS:
        return {
            ...state,
            loading: false,
            details: action.payload,
            errorMsg: ""
        };
        case CONFERENCE_ADD:
            return {
                ...state,
                loading: true,
                errorMsg: ""
            };
        case CONFERENCE_ADD_SUCCESS:
            return {
                ...state,
                loading: false,
                errorMsg: action.payload
            };
        case CONFERENCE_ADD_FAIL:
        return {
            ...state,
            loading: false,
            errorMsg: action.payload
        };
        case CONFERENCE_EDIT:
            return {
                ...state,
                loading: true,
                errorMsg: ""
            };
        case CONFERENCE_EDIT_SUCCESS:
            return {
                ...state,
                loading: false,
                errorMsg: action.payload
            };
        case CONFERENCE_EDIT_FAIL:
        return {
            ...state,
            loading: false,
            errorMsg: action.payload
        };
        default:
            return state
    }
};

export default ConferenceReducer;