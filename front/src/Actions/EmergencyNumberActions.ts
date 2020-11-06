import axios from 'axios';
import { ThunkAction } from 'redux-thunk'
import { RootState } from '../Reducers/rootReducer';
import { AddEmergencyNumberRequest, EmergencyNumberAction, EMERGENCYNUMBER_ADD, EMERGENCYNUMBER_ADD_FAIL, EMERGENCYNUMBER_ADD_SUCCESS, EMERGENCYNUMBER_DELETE, EMERGENCYNUMBER_DELETE_FAIL, EMERGENCYNUMBER_DELETE_SUCCESS, EMERGENCYNUMBER_LIST_FAIL, EMERGENCYNUMBER_LIST_LOADING, EMERGENCYNUMBER_LIST_SUCCESS } from '../Types/EmergencyNumberTypes';


export const GetEmergencyNumberList = (): ThunkAction<void, RootState, null, EmergencyNumberAction> => 
{ return async dispatch => {
    try{
        dispatch({
            type: EMERGENCYNUMBER_LIST_LOADING
        });
        const result = await axios.get(`${process.env.REACT_APP_API_URI}/api/EmergencyNumber/get`)
        
        dispatch({
            type: EMERGENCYNUMBER_LIST_SUCCESS,
            payload: result.data
        })
    } catch (e){
        dispatch({
            type: EMERGENCYNUMBER_LIST_FAIL,
            payload: e.message
        })
    }
    }
}

export const AddEmergencyNumber = (values:AddEmergencyNumberRequest): ThunkAction<void, RootState, null, EmergencyNumberAction> => 
{ return async dispatch => {
    try{
        dispatch({
            type: EMERGENCYNUMBER_ADD
        });
        const response = await axios.post(`${process.env.REACT_APP_API_URI}/api/EmergencyNumber/add`, {
            ...values
            })
        
        dispatch({
            type: EMERGENCYNUMBER_ADD_SUCCESS,
            payload: response.statusText
        })
    } catch (e){
        dispatch({
            type: EMERGENCYNUMBER_ADD_FAIL,
            payload: e.message
        })
    }
    }
}

export const DeleteEmergencyNumber = (key:number): ThunkAction<void, RootState, null, EmergencyNumberAction> =>
{
    return async dispatch => {
        try{
            dispatch({
                type: EMERGENCYNUMBER_DELETE
            });
            const response = await axios.delete(`${process.env.REACT_APP_API_URI}/api/EmergencyNumber/delete/${key}`)
            
            dispatch({
                type: EMERGENCYNUMBER_DELETE_SUCCESS,
                payload: response.statusText
            })
        } catch (e){
            dispatch({
                type: EMERGENCYNUMBER_DELETE_FAIL,
                payload: e.message
            })
        }
    }
}