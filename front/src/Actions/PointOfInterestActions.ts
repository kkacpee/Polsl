import axios from 'axios';
import { ThunkAction } from 'redux-thunk'
import { RootState } from '../Reducers/rootReducer';
import { AddPointOfInterestRequest, PointOfInterestAction, POINTOFINTEREST_ADD, POINTOFINTEREST_ADD_FAIL, POINTOFINTEREST_ADD_SUCCESS, POINTOFINTEREST_DELETE, POINTOFINTEREST_DELETE_FAIL, POINTOFINTEREST_DELETE_SUCCESS, POINTOFINTEREST_LIST_FAIL, POINTOFINTEREST_LIST_LOADING, POINTOFINTEREST_LIST_SUCCESS } from '../Types/PointOfInterestTypes';


export const GetPointOfInterestList = (): ThunkAction<void, RootState, null, PointOfInterestAction> => 
{ return async dispatch => {
    try{
        dispatch({
            type: POINTOFINTEREST_LIST_LOADING
        });
        const result = await axios.get(`${process.env.REACT_APP_API_URI}/api/PointOfInterest/get`)
        
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
        const response = await axios.post(`${process.env.REACT_APP_API_URI}/api/PointOfInterest/add`, {
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
            const response = await axios.delete(`${process.env.REACT_APP_API_URI}/api/PointOfInterest/delete/${key}`)
            
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