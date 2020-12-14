export const MESSAGE_LIST_LOADING= "MESSAGE_LIST_LOADING";
export const MESSAGE_LIST_SUCCESS= "MESSAGE_LIST_SUCCESS";
export const MESSAGE_LIST_FAIL= "MESSAGE_LIST_FAIL";
export const MESSAGE_ADD= "MESSAGE_ADD";
export const MESSAGE_ADD_SUCCESS= "MESSAGE_ADD_SUCCESS";
export const MESSAGE_ADD_FAIL= "MESSAGE_ADD_FAIL";
export const MESSAGE_DELETE="MESSAGE_DELETE";
export const MESSAGE_DELETE_SUCCESS= "MESSAGE_DELETE_SUCCESS";
export const MESSAGE_DELETE_FAIL= "MESSAGE_DELETE_FAIL";

export interface Message {
    id: number,
    SentDate: Date,
    MobileUserID: number,
    Content: string
}

export interface AddMessageRequest {
    MobileUserID: number,
    Content: string
}

export interface MessageState {
    data: Message[],
    loading: boolean,
    errorMsg: string
}

export interface MessageError {
    cod: string,
    message: string
}

export interface MessageListLoadingAction {
    type: typeof MESSAGE_LIST_LOADING,
}
export interface MessageListSuccessAction {
    type: typeof MESSAGE_LIST_SUCCESS,
    payload: Message[]
}
export interface MessageListFailAction {
    type: typeof MESSAGE_LIST_FAIL,
    payload: string
}

export interface MessageAddAction {
    type: typeof MESSAGE_ADD,
}
export interface MessageAddSuccessAction {
    type: typeof MESSAGE_ADD_SUCCESS,
    payload: string
}
export interface MessageAddFailAction {
    type: typeof MESSAGE_ADD_FAIL,
    payload: string
}

export interface MessageDeleteAction {
    type: typeof MESSAGE_DELETE,
}
export interface MessageDeleteSuccessAction {
    type: typeof MESSAGE_DELETE_SUCCESS,
    payload: string
}
export interface MessageDeleteFailAction {
    type: typeof MESSAGE_DELETE_FAIL,
    payload: string
}

export type MessageAction = 
MessageListLoadingAction | MessageListFailAction | MessageListSuccessAction |
MessageAddAction | MessageAddSuccessAction | MessageAddFailAction |
MessageDeleteAction | MessageDeleteSuccessAction | MessageDeleteFailAction;
