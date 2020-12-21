import { ThunkAction } from 'redux-thunk'
import { RootState } from '../Reducers/rootReducer';
import { AddAccommodationRequest, AccommodationAction, ACCOMMODATION_ADD, ACCOMMODATION_ADD_FAIL, ACCOMMODATION_ADD_SUCCESS, ACCOMMODATION_DELETE, ACCOMMODATION_DELETE_FAIL, ACCOMMODATION_DELETE_SUCCESS, ACCOMMODATION_LIST_FAIL, ACCOMMODATION_LIST_LOADING, ACCOMMODATION_LIST_SUCCESS, Accommodation, ACCOMMODATION_EDIT, ACCOMMODATION_EDIT_SUCCESS, ACCOMMODATION_EDIT_FAIL } from '../Types/AccommodationTypes';
import { apiClient } from './ApiClient';

export const GetAccommodationList = (): ThunkAction<void, RootState, null, AccommodationAction> => 
{ return async dispatch => {
    try{
        dispatch({
            type: ACCOMMODATION_LIST_LOADING
        });
        const result = await apiClient.get(`/api/Accommodation/get`)

        dispatch({
            type: ACCOMMODATION_LIST_SUCCESS,
            payload: result.data
        })
    } catch (e){
        dispatch({
            type: ACCOMMODATION_LIST_FAIL,
            payload: e.message
        })
    }
    }
}

export const GetAccommodationsForConferenceList = (id:number): ThunkAction<void, RootState, null, AccommodationAction> => 
{ return async dispatch => {
    try{
        dispatch({
            type: ACCOMMODATION_LIST_LOADING
        });
        const result = await apiClient.get(`/api/Accommodation/get/${id}`)
        
        dispatch({
            type: ACCOMMODATION_LIST_SUCCESS,
            payload: result.data
        })
    } catch (e){
        
        dispatch({
            type: ACCOMMODATION_LIST_FAIL,
            payload: e.message
        })
    }
    }
}

export const AddAccommodation = (values:AddAccommodationRequest): ThunkAction<void, RootState, null, AccommodationAction> => 
{ return async dispatch => {
    try{
        dispatch({
            type: ACCOMMODATION_ADD
        });
        const response = await apiClient.post(`/api/Accommodation/add`, {
            ...values
            })
        
        dispatch({
            type: ACCOMMODATION_ADD_SUCCESS,
            payload: response.statusText
        })
    } catch (e){
        dispatch({
            type: ACCOMMODATION_ADD_FAIL,
            payload: e.message
        })
    }
    }
}

export const DeleteAccommodation = (key:number): ThunkAction<void, RootState, null, AccommodationAction> =>
{
    return async dispatch => {
        try{
            dispatch({
                type: ACCOMMODATION_DELETE
            });
            const response = await apiClient.delete(`/api/Accommodation/delete/${key}`)

            dispatch({
                type: ACCOMMODATION_DELETE_SUCCESS,
                payload: response.statusText
            })
        } catch (e){
            dispatch({
                type: ACCOMMODATION_DELETE_FAIL,
                payload: e.message
            })
        }
    }
}

export const EditAccommodation = (values:Accommodation): ThunkAction<void, RootState, null, AccommodationAction> => 
{ return async dispatch => {
    try{
        dispatch({
            type: ACCOMMODATION_EDIT
        });
        const response = await apiClient.put(`/api/Accommodation/edit`, {
            ...values
            })
        
        dispatch({
            type: ACCOMMODATION_EDIT_SUCCESS,
            payload: response.statusText
        })
    } catch (e){
        dispatch({
            type: ACCOMMODATION_EDIT_FAIL,
            payload: e.message
        })
    }
    }
}