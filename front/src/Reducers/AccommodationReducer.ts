import {AccommodationState, 
    AccommodationAction, 
    ACCOMMODATION_LIST_LOADING, 
    ACCOMMODATION_LIST_FAIL, 
    ACCOMMODATION_LIST_SUCCESS,
    ACCOMMODATION_ADD,
    ACCOMMODATION_ADD_SUCCESS,
    ACCOMMODATION_ADD_FAIL} from '../Types/AccommodationTypes'
    
const DefaultState: AccommodationState  = {
    loading: false,
    data: [],
    errorMsg: ""
};

const AccommodationReducer = (state = DefaultState, action: AccommodationAction) => {
    switch (action.type) {
        case ACCOMMODATION_LIST_LOADING:
            return {
                ...state,
                loading: true,
                errorMsg: ""
            };
        case ACCOMMODATION_LIST_FAIL:
            return {
                ...state,
                loading: false,
                errorMsg: action.payload
            };
        case ACCOMMODATION_LIST_SUCCESS:
        return {
            ...state,
            loading: false,
            data: action.payload,
            errorMsg: ""
        };
        case ACCOMMODATION_ADD:
            return {
                ...state,
                loading: true,
                errorMsg: ""
            };
        case ACCOMMODATION_ADD_SUCCESS:
            return {
                ...state,
                loading: false,
                errorMsg: action.payload
            };
        case ACCOMMODATION_ADD_FAIL:
        return {
            ...state,
            loading: false,
            errorMsg: action.payload
        };
        default:
            return state
    }
};

export default AccommodationReducer;