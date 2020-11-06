import {ConferenceState, 
    ConferenceAction, 
    CONFERENCE_LIST_LOADING, 
    CONFERENCE_LIST_FAIL, 
    CONFERENCE_LIST_SUCCESS,
    CONFERENCE_ADD,
    CONFERENCE_ADD_SUCCESS,
    CONFERENCE_ADD_FAIL} from '../Types/ConferenceTypes'
    
const DefaultState: ConferenceState  = {
    loading: false,
    data: [],
    errorMsg: ""
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
        default:
            return state
    }
};

export default ConferenceReducer;