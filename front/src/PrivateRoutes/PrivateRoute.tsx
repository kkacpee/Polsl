import  React from  "react";
import { Route, Redirect } from  "react-router-dom";
import Store from '../Store';

const  PrivateRoute: React.FC<{
        component: React.FC;
        path: string;
        exact: boolean;
    }> = (props) => {
    const state = Store.getState();
    const condition = state.Auth.authenticated;
    if( !condition && props.path === "/login"){
        <Redirect  to="/"  />
    }
    if(props.path === "/login"){
        return  !condition ? (<Route  path={props.path}  exact={props.exact} component={props.component} />) : 
        (<Redirect  to="/"  />);
    }
    return  condition ? (<Route  path={props.path}  exact={props.exact} component={props.component} />) : 
        (<Redirect  to="/login"  />);
};
export  default  PrivateRoute;