import axios from 'axios';
import { ThunkAction } from 'redux-thunk'
import { RootState } from '../Reducers/rootReducer';
import { AddSponsorRequest, SponsorAction, SPONSOR_ADD, SPONSOR_ADD_FAIL, SPONSOR_ADD_SUCCESS, SPONSOR_DELETE, SPONSOR_DELETE_FAIL, SPONSOR_DELETE_SUCCESS, SPONSOR_LIST_FAIL, SPONSOR_LIST_LOADING, SPONSOR_LIST_SUCCESS } from '../Types/SponsorTypes';


export const GetSponsorList = (): ThunkAction<void, RootState, null, SponsorAction> => 
{ return async dispatch => {
    try{
        dispatch({
            type: SPONSOR_LIST_LOADING
        });
        const result = await axios.get(`${process.env.REACT_APP_API_URI}/api/Sponsor/get`)
        
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
        const response = await axios.post(`${process.env.REACT_APP_API_URI}/api/Sponsor/add`, {
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
            const response = await axios.delete(`${process.env.REACT_APP_API_URI}/api/Sponsor/delete/${key}`)
            
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