import {OrganizerState, 
    OrganizerAction, 
    ORGANIZER_LIST_LOADING, 
    ORGANIZER_LIST_FAIL, 
    ORGANIZER_LIST_SUCCESS,
    ORGANIZER_ADD,
    ORGANIZER_ADD_SUCCESS,
    ORGANIZER_ADD_FAIL} from '../Types/OrganizerTypes'
    
const DefaultState: OrganizerState  = {
    loading: false,
    data: [],
    errorMsg: ""
};

const OrganizerReducer = (state = DefaultState, action: OrganizerAction) => {
    switch (action.type) {
        case ORGANIZER_LIST_LOADING:
            return {
                ...state,
                loading: true,
                errorMsg: ""
            };
        case ORGANIZER_LIST_FAIL:
            return {
                ...state,
                loading: false,
                errorMsg: action.payload
            };
        case ORGANIZER_LIST_SUCCESS:
        return {
            ...state,
            loading: false,
            data: action.payload,
            errorMsg: ""
        };
        case ORGANIZER_ADD:
            return {
                ...state,
                loading: true,
                errorMsg: ""
            };
        case ORGANIZER_ADD_SUCCESS:
            return {
                ...state,
                loading: false,
                errorMsg: action.payload
            };
        case ORGANIZER_ADD_FAIL:
        return {
            ...state,
            loading: false,
            errorMsg: action.payload
        };
        default:
            return state
    }
};

export default OrganizerReducer;