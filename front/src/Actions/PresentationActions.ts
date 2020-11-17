import { ThunkAction } from 'redux-thunk'
import { RootState } from '../Reducers/rootReducer';
import { PresentationAction, PRESENTATION_DETAILS_LOADING, PRESENTATION_DETAILS_SUCCESS, PRESENTATION_DETAILS_FAIL, PRESENTATION_ADD, PRESENTATION_ADD_SUCCESS, PRESENTATION_ADD_FAIL, PRESENTATION_DELETE, PRESENTATION_DELETE_SUCCESS, PRESENTATION_DELETE_FAIL, AddPresentationRequest } from '../Types/PresentationTypes';
import { apiClient } from './ApiClient';

export const GetPresentationDetails = (id:number): ThunkAction<void, RootState, null, PresentationAction> => 
{ return async dispatch => {
    try{
        dispatch({
            type: PRESENTATION_DETAILS_LOADING
        });
        const result = await apiClient.get(`/api/Presentation/get/${id}`)
        
        dispatch({
            type: PRESENTATION_DETAILS_SUCCESS,
            payload: result.data
        })
    } catch (e){
        dispatch({
            type: PRESENTATION_DETAILS_FAIL,
            payload: e.message
        })
    }
    }
}

export const AddPresentation = (values:AddPresentationRequest): ThunkAction<void, RootState, null, PresentationAction> => 
{ return async dispatch => {
    try{
        dispatch({
            type: PRESENTATION_ADD
        });
        const response = await apiClient.post(`/api/Presentation/add`, {
            ...values
            })
        
        dispatch({
            type: PRESENTATION_ADD_SUCCESS,
            payload: response.statusText
        })
    } catch (e){
        dispatch({
            type: PRESENTATION_ADD_FAIL,
            payload: e.message
        })
    }
    }
}

export const DeletePresentation = (key:number): ThunkAction<void, RootState, null, PresentationAction> =>
{
    return async dispatch => {
        try{
            dispatch({
                type: PRESENTATION_DELETE
            });
            const response = await apiClient.delete(`${process.env.REACT_APP_API_URI}/api/Presentation/delete/${key}`)
            
            dispatch({
                type: PRESENTATION_DELETE_SUCCESS,
                payload: response.statusText
            })
        } catch (e){
            dispatch({
                type: PRESENTATION_DELETE_FAIL,
                payload: e.message
            })
        }
    }
}