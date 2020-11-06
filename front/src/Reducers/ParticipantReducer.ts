import {ParticipantState, 
    ParticipantAction, 
    PARTICIPANT_LIST_LOADING, 
    PARTICIPANT_LIST_FAIL, 
    PARTICIPANT_LIST_SUCCESS,
    PARTICIPANT_ADD,
    PARTICIPANT_ADD_SUCCESS,
    PARTICIPANT_ADD_FAIL} from '../Types/ParticipantTypes'
    
const DefaultState: ParticipantState  = {
    loading: false,
    data: [],
    errorMsg: ""
};

const ParticipantReducer = (state = DefaultState, action: ParticipantAction) => {
    switch (action.type) {
        case PARTICIPANT_LIST_LOADING:
            return {
                ...state,
                loading: true,
                errorMsg: ""
            };
        case PARTICIPANT_LIST_FAIL:
            return {
                ...state,
                loading: false,
                errorMsg: action.payload
            };
        case PARTICIPANT_LIST_SUCCESS:
        return {
            ...state,
            loading: false,
            data: action.payload,
            errorMsg: ""
        };
        case PARTICIPANT_ADD:
            return {
                ...state,
                loading: true,
                errorMsg: ""
            };
        case PARTICIPANT_ADD_SUCCESS:
            return {
                ...state,
                loading: false,
                errorMsg: action.payload
            };
        case PARTICIPANT_ADD_FAIL:
        return {
            ...state,
            loading: false,
            errorMsg: action.payload
        };
        default:
            return state
    }
};

export default ParticipantReducer;