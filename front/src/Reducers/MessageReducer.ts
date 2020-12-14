import {MessageState, 
    MessageAction, 
    MESSAGE_LIST_LOADING, 
    MESSAGE_LIST_FAIL, 
    MESSAGE_LIST_SUCCESS,
    MESSAGE_ADD,
    MESSAGE_ADD_SUCCESS,
    MESSAGE_ADD_FAIL} from '../Types/MessageTypes'
    
const DefaultState: MessageState  = {
    loading: false,
    data: [],
    errorMsg: ""
};

const MessageReducer = (state = DefaultState, action: MessageAction) => {
    switch (action.type) {
        case MESSAGE_LIST_LOADING:
            return {
                ...state,
                loading: true,
                errorMsg: ""
            };
        case MESSAGE_LIST_FAIL:
            return {
                ...state,
                loading: false,
                errorMsg: action.payload
            };
        case MESSAGE_LIST_SUCCESS:
        return {
            ...state,
            loading: false,
            data: action.payload,
            errorMsg: ""
        };
        case MESSAGE_ADD:
            return {
                ...state,
                loading: true,
                errorMsg: ""
            };
        case MESSAGE_ADD_SUCCESS:
            return {
                ...state,
                loading: false,
                errorMsg: action.payload
            };
        case MESSAGE_ADD_FAIL:
        return {
            ...state,
            loading: false,
            errorMsg: action.payload
        };
        default:
            return state
    }
};

export default MessageReducer;