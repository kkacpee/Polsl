import axios from 'axios';
import { ThunkAction } from 'redux-thunk'
import { RootState } from '../Reducers/rootReducer';
import { AccommodationAction, ACCOMMODATION_LIST_FAIL, ACCOMMODATION_LIST_LOADING, ACCOMMODATION_LIST_SUCCESS } from '../Types/AccommodationTypes';


export const GetAccommodationList = (): ThunkAction<void, RootState, null, AccommodationAction> => 
{ return async dispatch => {
    try{
        dispatch({
            type: ACCOMMODATION_LIST_LOADING
        });
        const result = await axios.get('http://localhost:50561/api/Accommodation/get')
        
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