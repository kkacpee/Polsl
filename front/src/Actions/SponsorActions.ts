import { ThunkAction } from 'redux-thunk'
import { RootState } from '../Reducers/rootReducer';
import { AddSponsorRequest, Sponsor, SponsorAction, SPONSOR_ADD, SPONSOR_ADD_FAIL, SPONSOR_ADD_SUCCESS, SPONSOR_DELETE, SPONSOR_DELETE_FAIL, SPONSOR_DELETE_SUCCESS, SPONSOR_EDIT, SPONSOR_EDIT_FAIL, SPONSOR_EDIT_SUCCESS, SPONSOR_LIST_FAIL, SPONSOR_LIST_LOADING, SPONSOR_LIST_SUCCESS } from '../Types/SponsorTypes';
import { apiClient } from './ApiClient';


export const GetSponsorList = (): ThunkAction<void, RootState, null, SponsorAction> => 
{ return async dispatch => {
    try{
        dispatch({
            type: SPONSOR_LIST_LOADING
        });
        const result = await apiClient.get(`/api/Sponsor/get`)
        
        dispatch({
            type: SPONSOR_LIST_SUCCESS,
            payload: result.data
        })
    } catch (e){
        dispatch({
            type: SPONSOR_LIST_FAIL,
            payload: e.message
        })
    }
    }
}

export const GetSponsorsForConferenceList = (id:number): ThunkAction<void, RootState, null, SponsorAction> => 
{ return async dispatch => {
    try{
        dispatch({
            type: SPONSOR_LIST_LOADING
        });
        const result = await apiClient.get(`/api/Sponsor/get/${id}`)
        
        dispatch({
            type: SPONSOR_LIST_SUCCESS,
            payload: result.data
        })
    } catch (e){
        dispatch({
            type: SPONSOR_LIST_FAIL,
            payload: e.message
        })
    }
    }
}

export const AddSponsor = (values:AddSponsorRequest): ThunkAction<void, RootState, null, SponsorAction> => 
{ return async dispatch => {
    try{
        dispatch({
            type: SPONSOR_ADD
        });
        const response = await apiClient.post(`/api/Sponsor/add`, {
            ...values
            })
        
        dispatch({
            type: SPONSOR_ADD_SUCCESS,
            payload: response.statusText
        })
    } catch (e){
        dispatch({
            type: SPONSOR_ADD_FAIL,
            payload: e.message
        })
    }
    }
}

export const DeleteSponsor = (key:number): ThunkAction<void, RootState, null, SponsorAction> =>
{
    return async dispatch => {
        try{
            dispatch({
                type: SPONSOR_DELETE
            });
            const response = await apiClient.delete(`/api/Sponsor/delete/${key}`)
            
            dispatch({
                type: SPONSOR_DELETE_SUCCESS,
                payload: response.statusText
            })
        } catch (e){
            dispatch({
                type: SPONSOR_DELETE_FAIL,
                payload: e.message
            })
        }
    }
}

export const EditSponsor = (values:Sponsor): ThunkAction<void, RootState, null, SponsorAction> => 
{ return async dispatch => {
    try{
        dispatch({
            type: SPONSOR_EDIT
        });
        const response = await apiClient.put(`/api/Sponsor/edit`, {
            ...values
            })
        
        dispatch({
            type: SPONSOR_EDIT_SUCCESS,
            payload: response.statusText
        })
    } catch (e){
        dispatch({
            type: SPONSOR_EDIT_FAIL,
            payload: e.message
        })
    }
    }
}