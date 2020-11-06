import axios from 'axios';
import { ThunkAction } from 'redux-thunk'
import { RootState } from '../Reducers/rootReducer';
import { AddOrganizerRequest, OrganizerAction, ORGANIZER_ADD, ORGANIZER_ADD_FAIL, ORGANIZER_ADD_SUCCESS, ORGANIZER_DELETE, ORGANIZER_DELETE_FAIL, ORGANIZER_DELETE_SUCCESS, ORGANIZER_LIST_FAIL, ORGANIZER_LIST_LOADING, ORGANIZER_LIST_SUCCESS } from '../Types/OrganizerTypes';


export const GetOrganizerList = (): ThunkAction<void, RootState, null, OrganizerAction> => 
{ return async dispatch => {
    try{
        dispatch({
            type: ORGANIZER_LIST_LOADING
        });
        const result = await axios.get(`${process.env.REACT_APP_API_URI}/api/Organizer/get`)
        
        dispatch({
            type: ORGANIZER_LIST_SUCCESS,
            payload: result.data
        })
    } catch (e){
        dispatch({
            type: ORGANIZER_LIST_FAIL,
            payload: e.message
        })
    }
    }
}

export const AddOrganizer = (values:AddOrganizerRequest): ThunkAction<void, RootState, null, OrganizerAction> => 
{ return async dispatch => {
    try{
        dispatch({
            type: ORGANIZER_ADD
        });
        const response = await axios.post(`${process.env.REACT_APP_API_URI}/api/Organizer/add`, {
            ...values
            })
        
        dispatch({
            type: ORGANIZER_ADD_SUCCESS,
            payload: response.statusText
        })
    } catch (e){
        dispatch({
            type: ORGANIZER_ADD_FAIL,
            payload: e.message
        })
    }
    }
}

export const DeleteOrganizer = (key:number): ThunkAction<void, RootState, null, OrganizerAction> =>
{
    return async dispatch => {
        try{
            dispatch({
                type: ORGANIZER_DELETE
            });
            const response = await axios.delete(`${process.env.REACT_APP_API_URI}/api/Organizer/delete/${key}`)
            
            dispatch({
                type: ORGANIZER_DELETE_SUCCESS,
                payload: response.statusText
            })
        } catch (e){
            dispatch({
                type: ORGANIZER_DELETE_FAIL,
                payload: e.message
            })
        }
    }
}