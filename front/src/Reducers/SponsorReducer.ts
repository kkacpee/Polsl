import {SponsorState, 
    SponsorAction, 
    SPONSOR_LIST_LOADING, 
    SPONSOR_LIST_FAIL, 
    SPONSOR_LIST_SUCCESS,
    SPONSOR_ADD,
    SPONSOR_ADD_SUCCESS,
    SPONSOR_ADD_FAIL} from '../Types/SponsorTypes'
    
const DefaultState: SponsorState  = {
    loading: false,
    data: [],
    errorMsg: ""
};

const SponsorReducer = (state = DefaultState, action: SponsorAction) => {
    switch (action.type) {
        case SPONSOR_LIST_LOADING:
            return {
                ...state,
                loading: true,
                errorMsg: ""
            };
        case SPONSOR_LIST_FAIL:
            return {
                ...state,
                loading: false,
                errorMsg: action.payload
            };
        case SPONSOR_LIST_SUCCESS:
        return {
            ...state,
            loading: false,
            data: action.payload,
            errorMsg: ""
        };
        case SPONSOR_ADD:
            return {
                ...state,
                loading: true,
                errorMsg: ""
            };
        case SPONSOR_ADD_SUCCESS:
            return {
                ...state,
                loading: false,
                errorMsg: action.payload
            };
        case SPONSOR_ADD_FAIL:
        return {
            ...state,
            loading: false,
            errorMsg: action.payload
        };
        default:
            return state
    }
};

export default SponsorReducer;