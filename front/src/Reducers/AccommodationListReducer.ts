import {AccomodationState, AccommodationAction, ACCOMMODATION_LIST_LOADING, ACCOMMODATION_LIST_FAIL, ACCOMMODATION_LIST_SUCCESS} from '../Types/AccommodationTypes'
const DefaultState: AccomodationState  = {
    loading: false,
    data: [],
    errorMsg: ""
};

const AccommodationListReducer = (state = DefaultState, action: AccommodationAction) => {
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
        default:
            return state
    }
};

export default AccommodationListReducer;