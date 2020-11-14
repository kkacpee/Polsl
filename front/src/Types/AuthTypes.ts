export const AUTHENTICATED = 'AUTHENTICATED';
export const UNAUTHENTICATED = 'UNAUTHENTICATED';
export const AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR';

export interface AuthRequest {
    email: string,
    password: string
}

export interface AuthState {
    authenticated: boolean,
    errorMsg: string,
    token: string
}

export interface AuthenticatedAction {
    type: typeof AUTHENTICATED,
    payload:string
}
export interface UnauthenticatedActionAction {
    type: typeof UNAUTHENTICATED,
    payload: string
}
export interface AuthenticationErrorAction {
    type: typeof AUTHENTICATION_ERROR,
    payload: string
}

export type AuthenticationAction = AuthenticatedAction | UnauthenticatedActionAction | AuthenticationErrorAction;