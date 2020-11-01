import axios from 'axios';
import { ThunkAction } from 'redux-thunk'
import { RootState } from '../Reducers/rootReducer';
import { AddConferenceRequest, ConferenceAction, CONFERENCE_ADD, CONFERENCE_ADD_FAIL, CONFERENCE_ADD_SUCCESS, CONFERENCE_LIST_FAIL, CONFERENCE_LIST_LOADING, CONFERENCE_LIST_SUCCESS } from '../Types/ConferenceTypes';


export const GetConferenceList = (): ThunkAction<void, RootState, null, ConferenceAction> => 
{ return async dispatch => {
    try{
        dispatch({
            type: CONFERENCE_LIST_LOADING
        });
        const result = await axios.get('http://localhost:50561/api/Conference/get')
        
        dispatch({
            type: CONFERENCE_LIST_SUCCESS,
            payload: result.data
        })
    } catch (e){
        dispatch({
            type: CONFERENCE_LIST_FAIL,
            payload: e.message
        })
    }
    }
}

export const AddConference = (values:AddConferenceRequest): ThunkAction<void, RootState, null, ConferenceAction> => 
{ return async dispatch => {
    try{
        dispatch({
            type: CONFERENCE_ADD
        });
        await axios.post('http://localhost:50561/api/Conference/add', {
            ...values
            })
        
        dispatch({
            type: CONFERENCE_ADD_SUCCESS,
            payload: "success"
        })
    } catch (e){
        dispatch({
            type: CONFERENCE_ADD_FAIL,
            payload: e.message
        })
    }
    }
}