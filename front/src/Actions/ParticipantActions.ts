import { ThunkAction } from 'redux-thunk'
import { RootState } from '../Reducers/rootReducer';
import { AddParticipantRequest, ParticipantAction, PARTICIPANT_ADD, PARTICIPANT_ADD_FAIL, PARTICIPANT_ADD_SUCCESS, PARTICIPANT_DELETE, PARTICIPANT_DELETE_FAIL, PARTICIPANT_DELETE_SUCCESS, PARTICIPANT_LIST_FAIL, PARTICIPANT_LIST_LOADING, PARTICIPANT_LIST_SUCCESS } from '../Types/ParticipantTypes';
import { apiClient } from './ApiClient';


export const GetParticipantList = (): ThunkAction<void, RootState, null, ParticipantAction> => 
{ return async dispatch => {
    try{
        dispatch({
            type: PARTICIPANT_LIST_LOADING
        });
        const result = await apiClient.get(`/api/Participant/get`)
        
        dispatch({
            type: PARTICIPANT_LIST_SUCCESS,
            payload: result.data
        })
    } catch (e){
        dispatch({
            type: PARTICIPANT_LIST_FAIL,
            payload: e.message
        })
    }
    }
}

export const GetParticipantsForPresentationList = (id:number): ThunkAction<void, RootState, null, ParticipantAction> => 
{ return async dispatch => {
    try{
        dispatch({
            type: PARTICIPANT_LIST_LOADING
        });
        const result = await apiClient.get(`/api/Participant/get/${id}`)
        
        dispatch({
            type: PARTICIPANT_LIST_SUCCESS,
            payload: result.data
        })
    } catch (e){
        dispatch({
            type: PARTICIPANT_LIST_FAIL,
            payload: e.message
        })
    }
    }
}

export const AddParticipant = (values:AddParticipantRequest): ThunkAction<void, RootState, null, ParticipantAction> => 
{ return async dispatch => {
    try{
        dispatch({
            type: PARTICIPANT_ADD
        });
        const response = await apiClient.post(`/api/Participant/add`, {
            ...values
            })
        
        dispatch({
            type: PARTICIPANT_ADD_SUCCESS,
            payload: response.statusText
        })
    } catch (e){
        dispatch({
            type: PARTICIPANT_ADD_FAIL,
            payload: e.message
        })
    }
    }
}

export const DeleteParticipant = (key:number): ThunkAction<void, RootState, null, ParticipantAction> =>
{
    return async dispatch => {
        try{
            dispatch({
                type: PARTICIPANT_DELETE
            });
            const response = await apiClient.delete(`/api/Participant/delete/${key}`)
            
            dispatch({
                type: PARTICIPANT_DELETE_SUCCESS,
                payload: response.statusText
            })
        } catch (e){
            dispatch({
                type: PARTICIPANT_DELETE_FAIL,
                payload: e.message
            })
        }
    }
}