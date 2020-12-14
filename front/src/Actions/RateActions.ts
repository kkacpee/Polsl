import { ThunkAction } from 'redux-thunk'
import { RootState } from '../Reducers/rootReducer';
import { AddRateCriterionRequest, AddRateRequest, AddRateCriterionTypeRequest, Rate, RateAction, RateCriterionType, RATE_ADD, RATE_ADD_FAIL, RATE_ADD_SUCCESS, RATE_DELETE, RATE_DELETE_FAIL, RATE_DELETE_SUCCESS, RATE_EDIT, RATE_EDIT_FAIL, RATE_EDIT_SUCCESS, RATE_CRITERION_ADD, RATE_CRITERION_ADD_FAIL, RATE_CRITERION_ADD_SUCCESS, RATE_CRITERION_DELETE, RATE_CRITERION_DELETE_FAIL, RATE_CRITERION_DELETE_SUCCESS, RATE_CRITERION_LIST_LOADING, RATE_CRITERION_LIST_FAIL, RATE_CRITERION_LIST_SUCCESS, RATE_LIST_FAIL, RATE_LIST_LOADING, RATE_LIST_SUCCESS, RATE_CRITERION_TYPE_ADD, RATE_CRITERION_TYPE_ADD_FAIL, RATE_CRITERION_TYPE_ADD_SUCCESS, RATE_CRITERION_TYPE_DELETE, RATE_CRITERION_TYPE_DELETE_FAIL, RATE_CRITERION_TYPE_DELETE_SUCCESS, RATE_CRITERION_TYPE_EDIT, RATE_CRITERION_TYPE_EDIT_FAIL, RATE_CRITERION_TYPE_EDIT_SUCCESS, RATE_CRITERION_TYPE_LIST_LOADING, RATE_CRITERION_TYPE_LIST_FAIL, RATE_CRITERION_TYPE_LIST_SUCCESS, RateCriterion, RATE_CRITERION_EDIT, RATE_CRITERION_EDIT_FAIL, RATE_CRITERION_EDIT_SUCCESS } from '../Types/RateTypes';
import { apiClient } from './ApiClient';


export const GetRateList = (): ThunkAction<void, RootState, null, RateAction> => 
{ return async dispatch => {
    try{
        dispatch({
            type: RATE_LIST_LOADING
        });
        const result = await apiClient.get(`/api/Rate/get`)
        console.log(result.data);
        dispatch({
            type: RATE_LIST_SUCCESS,
            payload: result.data
        })
    } catch (e){
        dispatch({
            type: RATE_LIST_FAIL,
            payload: e.message
        })
    }
    }
}

export const GetRateCriterionTypeList = (): ThunkAction<void, RootState, null, RateAction> => 
{ return async dispatch => {
    try{
        dispatch({
            type: RATE_CRITERION_TYPE_LIST_LOADING
        });
        const result = await apiClient.get(`/api/Rate/RateCriterionType/get`)
        dispatch({
            type: RATE_CRITERION_TYPE_LIST_SUCCESS,
            payload: result.data
        })
    } catch (e){
        dispatch({
            type: RATE_CRITERION_TYPE_LIST_FAIL,
            payload: e.message
        })
    }
    }
}

export const GetRateCriterionList = (): ThunkAction<void, RootState, null, RateAction> => 
{ return async dispatch => {
    try{
        dispatch({
            type: RATE_CRITERION_LIST_LOADING
        });
        const result = await apiClient.get(`/api/Rate/RateCriterion/get`)

        dispatch({
            type: RATE_CRITERION_LIST_SUCCESS,
            payload: result.data
        })
    } catch (e){
        dispatch({
            type: RATE_CRITERION_LIST_FAIL,
            payload: e.message
        })
    }
    }
}

export const GetRatesForConferenceList = (id:number): ThunkAction<void, RootState, null, RateAction> => 
{ return async dispatch => {
    try{
        dispatch({
            type: RATE_LIST_LOADING
        });
        const result = await apiClient.get(`/api/Rate/get/${id}/conference`)
        
        dispatch({
            type: RATE_LIST_SUCCESS,
            payload: result.data
        })
    } catch (e){
        dispatch({
            type: RATE_LIST_FAIL,
            payload: e.message
        })
    }
    }
}

export const GetRatesForPresentationList = (id:number): ThunkAction<void, RootState, null, RateAction> => 
{ return async dispatch => {
    try{
        dispatch({
            type: RATE_LIST_LOADING
        });
        const result = await apiClient.get(`/api/Rate/get/${id}/presentation`)
        
        dispatch({
            type: RATE_LIST_SUCCESS,
            payload: result.data
        })
    } catch (e){
        dispatch({
            type: RATE_LIST_FAIL,
            payload: e.message
        })
    }
    }
}

export const AddRate = (values:AddRateRequest): ThunkAction<void, RootState, null, RateAction> => 
{ return async dispatch => {
    try{
        dispatch({
            type: RATE_ADD
        });
        const response = await apiClient.post(`/api/Rate/add`, {
            ...values
            })
        
        dispatch({
            type: RATE_ADD_SUCCESS,
            payload: response.statusText
        })
    } catch (e){
        dispatch({
            type: RATE_ADD_FAIL,
            payload: e.message
        })
    }
    }
}

export const AddRateCriterionType = (values:AddRateCriterionTypeRequest): ThunkAction<void, RootState, null, RateAction> => 
{ return async dispatch => {
    try{
        dispatch({
            type: RATE_CRITERION_TYPE_ADD
        });
        const response = await apiClient.post(`/api/Rate/RateCriterionType/add`, {
            ...values
            })
        
        dispatch({
            type: RATE_CRITERION_TYPE_ADD_SUCCESS,
            payload: response.statusText
        })
    } catch (e){
        dispatch({
            type: RATE_CRITERION_TYPE_ADD_FAIL,
            payload: e.message
        })
    }
    }
}

export const AddRateCriterion = (values:AddRateCriterionRequest): ThunkAction<void, RootState, null, RateAction> => 
{ return async dispatch => {
    try{
        dispatch({
            type: RATE_CRITERION_ADD
        });
        const response = await apiClient.post(`/api/Rate/RateCriterion/add`, {
            ...values
        })
        
        dispatch({
            type: RATE_CRITERION_ADD_SUCCESS,
            payload: response.statusText
        })
    } catch (e){
        dispatch({
            type: RATE_CRITERION_ADD_FAIL,
            payload: e.message
        })
    }
    }
}

export const DeleteRate = (key:number): ThunkAction<void, RootState, null, RateAction> =>
{
    return async dispatch => {
        try{
            dispatch({
                type: RATE_DELETE
            });
            const response = await apiClient.delete(`/api/Rate/delete/${key}`)
            
            dispatch({
                type: RATE_DELETE_SUCCESS,
                payload: response.statusText
            })
        } catch (e){
            dispatch({
                type: RATE_DELETE_FAIL,
                payload: e.message
            })
        }
    }
}

export const DeleteRateCriterionType = (key:number): ThunkAction<void, RootState, null, RateAction> =>
{
    return async dispatch => {
        try{
            dispatch({
                type: RATE_CRITERION_TYPE_DELETE
            });
            const response = await apiClient.delete(`/api/Rate/RateCriterionType/delete/${key}`)
            
            dispatch({
                type: RATE_CRITERION_TYPE_DELETE_SUCCESS,
                payload: response.statusText
            })
        } catch (e){
            dispatch({
                type: RATE_CRITERION_TYPE_DELETE_FAIL,
                payload: e.message
            })
        }
    }
}

export const DeleteRateCriterion = (key:number): ThunkAction<void, RootState, null, RateAction> =>
{
    return async dispatch => {
        try{
            dispatch({
                type: RATE_CRITERION_DELETE
            });
            const response = await apiClient.delete(`/api/Rate/RateCriterion/delete/${key}`)
            
            dispatch({
                type: RATE_CRITERION_DELETE_SUCCESS,
                payload: response.statusText
            })
        } catch (e){
            dispatch({
                type: RATE_CRITERION_DELETE_FAIL,
                payload: e.message
            })
        }
    }
}

export const EditRate = (values:Rate): ThunkAction<void, RootState, null, RateAction> => 
{ return async dispatch => {
    try{
        dispatch({
            type: RATE_EDIT
        });
        const response = await apiClient.post(`/api/Rate/edit`, {
            ...values
            })
        
        dispatch({
            type: RATE_EDIT_SUCCESS,
            payload: response.statusText
        })
    } catch (e){
        dispatch({
            type: RATE_EDIT_FAIL,
            payload: e.message
        })
    }
    }
}

export const EditRateCriterion = (values:RateCriterion): ThunkAction<void, RootState, null, RateAction> => 
{ return async dispatch => {
    try{
        dispatch({
            type: RATE_CRITERION_EDIT
        });
        const response = await apiClient.post(`/api/Rate/RateCriterion/edit`, {
            ...values
            })
        
        dispatch({
            type: RATE_CRITERION_EDIT_SUCCESS,
            payload: response.statusText
        })
    } catch (e){
        dispatch({
            type: RATE_CRITERION_EDIT_FAIL,
            payload: e.message
        })
    }
    }
}

export const EditRateCriterionType = (values:RateCriterionType): ThunkAction<void, RootState, null, RateAction> => 
{ return async dispatch => {
    try{
        dispatch({
            type: RATE_CRITERION_TYPE_EDIT
        });
        const response = await apiClient.post(`/api/Rate/RateCriterionType/edit`, {
            ...values
            })
        
        dispatch({
            type: RATE_CRITERION_TYPE_EDIT_SUCCESS,
            payload: response.statusText
        })
    } catch (e){
        dispatch({
            type: RATE_CRITERION_TYPE_EDIT_FAIL,
            payload: e.message
        })
    }
    }
}