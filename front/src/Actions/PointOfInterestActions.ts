import { ThunkAction } from 'redux-thunk'
import { RootState } from '../Reducers/rootReducer';
import { AddPointOfInterestRequest, PointOfInterest, PointOfInterestAction, PointOfInterestType, POINTOFINTEREST_ADD, POINTOFINTEREST_ADD_FAIL, POINTOFINTEREST_ADD_SUCCESS, POINTOFINTEREST_DELETE, POINTOFINTEREST_DELETE_FAIL, POINTOFINTEREST_DELETE_SUCCESS, POINTOFINTEREST_EDIT, POINTOFINTEREST_EDIT_FAIL, POINTOFINTEREST_EDIT_SUCCESS, POINTOFINTEREST_LIST_FAIL, POINTOFINTEREST_LIST_LOADING, POINTOFINTEREST_LIST_SUCCESS, POINTOFINTEREST_TYPE_DELETE, POINTOFINTEREST_TYPE_DELETE_FAIL, POINTOFINTEREST_TYPE_DELETE_SUCCESS, POINTOFINTEREST_TYPE_EDIT, POINTOFINTEREST_TYPE_EDIT_FAIL, POINTOFINTEREST_TYPE_EDIT_SUCCESS, POINTOFINTEREST_TYPE_LIST, POINTOFINTEREST_TYPE_LIST_FAIL, POINTOFINTEREST_TYPE_LIST_SUCCESS } from '../Types/PointOfInterestTypes';
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

export const GetPointOfInterestTypeList = (): ThunkAction<void, RootState, null, PointOfInterestAction> => 
{ return async dispatch => {
    try{
        dispatch({
            type: POINTOFINTEREST_TYPE_LIST
        });
        const result = await apiClient.get(`/api/PointOfInterest/PointOfInterestType/get`)
        dispatch({
            type: POINTOFINTEREST_TYPE_LIST_SUCCESS,
            payload: result.data
        })
    } catch (e){
        dispatch({
            type: POINTOFINTEREST_TYPE_LIST_FAIL,
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

export const DeletePointOfInterestType = (key:number): ThunkAction<void, RootState, null, PointOfInterestAction> =>
{
    return async dispatch => {
        try{
            dispatch({
                type: POINTOFINTEREST_TYPE_DELETE
            });
            const response = await apiClient.delete(`/api/PointOfInterest/PointOfInterestType/delete/${key}`)
            
            dispatch({
                type: POINTOFINTEREST_TYPE_DELETE_SUCCESS,
                payload: response.statusText
            })
        } catch (e){
            dispatch({
                type: POINTOFINTEREST_TYPE_DELETE_FAIL,
                payload: e.message
            })
        }
    }
}

export const EditPointOfInterest = (values:PointOfInterest): ThunkAction<void, RootState, null, PointOfInterestAction> => 
{ return async dispatch => {
    try{
        dispatch({
            type: POINTOFINTEREST_EDIT
        });
        const response = await apiClient.post(`/api/PointOfInterest/edit`, {
            ...values
            })
        
        dispatch({
            type: POINTOFINTEREST_EDIT_SUCCESS,
            payload: response.statusText
        })
    } catch (e){
        dispatch({
            type: POINTOFINTEREST_EDIT_FAIL,
            payload: e.message
        })
    }
    }
}

export const EditPointOfInterestType = (values:PointOfInterestType): ThunkAction<void, RootState, null, PointOfInterestAction> => 
{ return async dispatch => {
    try{
        dispatch({
            type: POINTOFINTEREST_TYPE_EDIT
        });
        const response = await apiClient.post(`/api/PointOfInterest/PointOfInterestType/edit`, {
            ...values
            })
        
        dispatch({
            type: POINTOFINTEREST_TYPE_EDIT_SUCCESS,
            payload: response.statusText
        })
    } catch (e){
        dispatch({
            type: POINTOFINTEREST_TYPE_EDIT_FAIL,
            payload: e.message
        })
    }
    }
}