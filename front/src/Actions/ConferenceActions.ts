import axios from 'axios';
import { ThunkAction } from 'redux-thunk'
import { RootState } from '../Reducers/rootReducer';
import { AddConferenceRequest, ConferenceAction, CONFERENCE_ADD, CONFERENCE_ADD_FAIL, CONFERENCE_ADD_SUCCESS, CONFERENCE_DELETE, CONFERENCE_DELETE_FAIL, CONFERENCE_DELETE_SUCCESS, CONFERENCE_DETAILS_FAIL, CONFERENCE_DETAILS_LOADING, CONFERENCE_DETAILS_SUCCESS, CONFERENCE_LIST_FAIL, CONFERENCE_LIST_LOADING, CONFERENCE_LIST_SUCCESS } from '../Types/ConferenceTypes';
import { apiClient } from './ApiClient';


export const GetConferenceList = (): ThunkAction<void, RootState, null, ConferenceAction> => 
{ return async dispatch => {
    try{
        dispatch({
            type: CONFERENCE_LIST_LOADING
        });
        const result = await apiClient.get(`/api/Conference/get`)
        
        dispatch({
            type: CONFERENCE_LIST_SUCCESS,
            payload: result.data
        })
    } catch (e){
        dispatch({
            type: CONFERENCE_LIST_FAIL,
            payload: e.message
        })
    }
    }
}

export const GetConferenceDetails = (id:number): ThunkAction<void, RootState, null, ConferenceAction> => 
{ return async dispatch => {
    try{
        dispatch({
            type: CONFERENCE_DETAILS_LOADING
        });
        const result = await apiClient.get(`/api/Conference/get/${id}`)
        
        dispatch({
            type: CONFERENCE_DETAILS_SUCCESS,
            payload: result.data
        })
    } catch (e){
        dispatch({
            type: CONFERENCE_DETAILS_FAIL,
            payload: e.message
        })
    }
    }
}

export const AddConference = (values:AddConferenceRequest): ThunkAction<void, RootState, null, ConferenceAction> => 
{ return async dispatch => {
    try{
        dispatch({
            type: CONFERENCE_ADD
        });
        const response = await apiClient.post(`/api/Conference/add`, {
            ...values
            })
        
        dispatch({
            type: CONFERENCE_ADD_SUCCESS,
            payload: response.statusText
        })
    } catch (e){
        dispatch({
            type: CONFERENCE_ADD_FAIL,
            payload: e.message
        })
    }
    }
}

export const DeleteConference = (key:number): ThunkAction<void, RootState, null, ConferenceAction> =>
{
    return async dispatch => {
        try{
            dispatch({
                type: CONFERENCE_DELETE
            });
            const response = await apiClient.delete(`${process.env.REACT_APP_API_URI}/api/Conference/delete/${key}`)
            
            dispatch({
                type: CONFERENCE_DELETE_SUCCESS,
                payload: response.statusText
            })
        } catch (e){
            dispatch({
                type: CONFERENCE_DELETE_FAIL,
                payload: e.message
            })
        }
    }
}