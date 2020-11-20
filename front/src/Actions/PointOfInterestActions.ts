import { ThunkAction } from 'redux-thunk'
import { RootState } from '../Reducers/rootReducer';
import { AddPointOfInterestRequest, PointOfInterestAction, POINTOFINTEREST_ADD, POINTOFINTEREST_ADD_FAIL, POINTOFINTEREST_ADD_SUCCESS, POINTOFINTEREST_DELETE, POINTOFINTEREST_DELETE_FAIL, POINTOFINTEREST_DELETE_SUCCESS, POINTOFINTEREST_LIST_FAIL, POINTOFINTEREST_LIST_LOADING, POINTOFINTEREST_LIST_SUCCESS } from '../Types/PointOfInterestTypes';
import { apiClient } from './ApiClient';


export const GetPointOfInterestList = (): ThunkAction<void, RootState, null, PointOfInterestAction> => 
{ return async dispatch => {
    try{
        dispatch({
            type: POINTOFINTEREST_LIST_LOADING
        });
        const result = await apiClient.get(`/api/PointOfInterest/get`)
        
        dispatch({
            type: POINTOFINTEREST_LIST_SUCCESS,
            payload: result.data
        })
    } catch (e){
        dispatch({
            type: POINTOFINTEREST_LIST_FAIL,
            payload: e.message
        })
    }
    }
}

export const GetPointsOfInterestForConferenceList = (id:number): ThunkAction<void, RootState, null, PointOfInterestAction> => 
{ return async dispatch => {
    try{
        dispatch({
            type: POINTOFINTEREST_LIST_LOADING
        });
        const result = await apiClient.get(`/api/PointOfInterest/get/${id}`)
        
        dispatch({
            type: POINTOFINTEREST_LIST_SUCCESS,
            payload: result.data
        })
    } catch (e){
        dispatch({
            type: POINTOFINTEREST_LIST_FAIL,
            payload: e.message
        })
    }
    }
}

export const AddPointOfInterest = (values:AddPointOfInterestRequest): ThunkAction<void, RootState, null, PointOfInterestAction> => 
{ return async dispatch => {
    try{
        dispatch({
            type: POINTOFINTEREST_ADD
        });
        const response = await apiClient.post(`/api/PointOfInterest/add`, {
            ...values
            })
        
        dispatch({
            type: POINTOFINTEREST_ADD_SUCCESS,
            payload: response.statusText
        })
    } catch (e){
        dispatch({
            type: POINTOFINTEREST_ADD_FAIL,
            payload: e.message
        })
    }
    }
}

export const DeletePointOfInterest = (key:number): ThunkAction<void, RootState, null, PointOfInterestAction> =>
{
    return async dispatch => {
        try{
            dispatch({
                type: POINTOFINTEREST_DELETE
            });
            const response = await apiClient.delete(`/api/PointOfInterest/delete/${key}`)
            
            dispatch({
                type: POINTOFINTEREST_DELETE_SUCCESS,
                payload: response.statusText
            })
        } catch (e){
            dispatch({
                type: POINTOFINTEREST_DELETE_FAIL,
                payload: e.message
            })
        }
    }
}