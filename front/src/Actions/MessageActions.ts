import { ThunkAction } from 'redux-thunk'
import { RootState } from '../Reducers/rootReducer';
import { AddMessageRequest, MessageAction, MESSAGE_ADD, MESSAGE_ADD_FAIL, MESSAGE_ADD_SUCCESS, MESSAGE_DELETE, MESSAGE_DELETE_FAIL, MESSAGE_DELETE_SUCCESS, MESSAGE_LIST_FAIL, MESSAGE_LIST_LOADING, MESSAGE_LIST_SUCCESS } from '../Types/MessageTypes';
import { apiClient } from './ApiClient';


export const GetMessageList = (): ThunkAction<void, RootState, null, MessageAction> => 
{ return async dispatch => {
    try{
        dispatch({
            type: MESSAGE_LIST_LOADING
        });
        const result = await apiClient.get(`/api/Message/get`)
        
        dispatch({
            type: MESSAGE_LIST_SUCCESS,
            payload: result.data
        })
    } catch (e){
        dispatch({
            type: MESSAGE_LIST_FAIL,
            payload: e.message
        })
    }
    }
}

export const AddMessage = (values:AddMessageRequest): ThunkAction<void, RootState, null, MessageAction> => 
{ return async dispatch => {
    try{
        dispatch({
            type: MESSAGE_ADD
        });
        const response = await apiClient.post(`/api/Message/add`, {
            ...values
            })
        
        dispatch({
            type: MESSAGE_ADD_SUCCESS,
            payload: response.statusText
        })
    } catch (e){
        dispatch({
            type: MESSAGE_ADD_FAIL,
            payload: e.message
        })
    }
    }
}

export const DeleteMessage = (key:number): ThunkAction<void, RootState, null, MessageAction> =>
{
    return async dispatch => {
        try{
            dispatch({
                type: MESSAGE_DELETE
            });
            const response = await apiClient.delete(`/api/Message/delete/${key}`)
            
            dispatch({
                type: MESSAGE_DELETE_SUCCESS,
                payload: response.statusText
            })
        } catch (e){
            dispatch({
                type: MESSAGE_DELETE_FAIL,
                payload: e.message
            })
        }
    }
}