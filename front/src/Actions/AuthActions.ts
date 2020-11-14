import axios from 'axios';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../Reducers/rootReducer';
import {AUTHENTICATED, AUTHENTICATION_ERROR, AuthRequest, AuthenticationAction} from '../Types/AuthTypes';
import { apiClient } from './ApiClient';

export const SignIn = (values:AuthRequest): ThunkAction<void, RootState, null, AuthenticationAction> => 
{ 
    return async dispatch => {    
    try{
      const res = await apiClient.post(`/api/Auth/Login`, {
        ...values
        });
      dispatch({ type: AUTHENTICATED, payload: res.data });
    } catch(error) {
      dispatch({
        type: AUTHENTICATION_ERROR,
        payload: 'Invalid email or password'
      });
    }
  };
}