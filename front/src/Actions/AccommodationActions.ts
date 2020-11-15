import axios from 'axios';
import { useDispatch } from 'react-redux';
import { ThunkAction } from 'redux-thunk'
import { RootState } from '../Reducers/rootReducer';
import { AddAccommodationRequest, AccommodationAction, ACCOMMODATION_ADD, ACCOMMODATION_ADD_FAIL, ACCOMMODATION_ADD_SUCCESS, ACCOMMODATION_DELETE, ACCOMMODATION_DELETE_FAIL, ACCOMMODATION_DELETE_SUCCESS, ACCOMMODATION_LIST_FAIL, ACCOMMODATION_LIST_LOADING, ACCOMMODATION_LIST_SUCCESS } from '../Types/AccommodationTypes';
import { setAlert } from './AlertActions';
import { apiClient } from './ApiClient';

export const GetAccommodationList = (): ThunkAction<void, RootState, null, AccommodationAction> => 
{ return async dispatch => {
    try{
        dispatch({
            type: ACCOMMODATION_LIST_LOADING
        });
        const result = await axios.get(`${process.env.REACT_APP_API_URI}/api/Accommodation/get`)
        
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