import { AuthenticationAction, AuthState, AUTHENTICATED, UNAUTHENTICATED, AUTHENTICATION_ERROR } from '../Types/AuthTypes';

const DefaultState: AuthState  = {
    authenticated: false,
    errorMsg: "",
    token: ""
};

const Authenticate = (state=DefaultState, action:AuthenticationAction) => {
  switch(action.type) {
    case AUTHENTICATED:
      return { ...state, token: action.payload, authenticated: true };
    case UNAUTHENTICATED:
      return { ...state, authenticated: false };
    case AUTHENTICATION_ERROR:
      return { ...state, errorMsg: action.payload };
    default :
        return state;
  }
}

export default Authenticate;