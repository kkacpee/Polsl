import { ThunkAction } from 'redux-thunk';
import { RootState } from '../Reducers/rootReducer';
import {AUTHENTICATED, AUTHENTICATION_ERROR, AuthRequest, AuthenticationAction} from '../Types/AuthTypes';
import { apiClient } from './ApiClient';
import history from '../Helpers/HistoryHelper'

export const SignIn = (values:AuthRequest): ThunkAction<void, RootState, null, AuthenticationAction> => 
{ 
    return async dispatch => {    
    try{
      const res = await apiClient.post(`/api/Auth/Login`, {
        ...values
        });

      dispatch({ type: AUTHENTICATED, payload: res.data });
      history.push('/conference');
    } catch(error) {
      dispatch({
        type: AUTHENTICATION_ERROR,
        payload: 'Invalid email or password'
      });
    }
  };
}