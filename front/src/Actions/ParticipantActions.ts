import axios from 'axios';
import { ThunkAction } from 'redux-thunk'
import { RootState } from '../Reducers/rootReducer';
import { AddParticipantRequest, ParticipantAction, PARTICIPANT_ADD, PARTICIPANT_ADD_FAIL, PARTICIPANT_ADD_SUCCESS, PARTICIPANT_DELETE, PARTICIPANT_DELETE_FAIL, PARTICIPANT_DELETE_SUCCESS, PARTICIPANT_LIST_FAIL, PARTICIPANT_LIST_LOADING, PARTICIPANT_LIST_SUCCESS } from '../Types/ParticipantTypes';


export const GetParticipantList = (): ThunkAction<void, RootState, null, ParticipantAction> => 
{ return async dispatch => {
    try{
        dispatch({
            type: PARTICIPANT_LIST_LOADING
        });
        const result = await axios.get(`${process.env.REACT_APP_API_URI}/api/Participant/get`)
        
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
        const response = await axios.post(`${process.env.REACT_APP_API_URI}/api/Participant/add`, {
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
            const response = await axios.delete(`${process.env.REACT_APP_API_URI}/api/Participant/delete/${key}`)
            
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