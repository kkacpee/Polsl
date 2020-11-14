import React from "react";
import { useDispatch } from "react-redux";
import { setAlert } from "../Actions/AlertActions";
import { SignIn } from "../Actions/AuthActions";
import { AuthRequest } from "../Types/AuthTypes";

 const Login = () => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const dispatch = useDispatch();

    async function handleSubmit(){
        const request:AuthRequest = {
            email: email,
            password: password
        }
        await dispatch(SignIn(request));  
        dispatch(setAlert(true, "success", "Logged in successfully"));
      }
        return (
            <form className="card p-3 bg-light align-items-center ">

                <h3>Log in</h3>

                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} />
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <button type="submit" className="btn btn-dark btn-lg btn-block" onClick={handleSubmit}>Sign in</button>
                <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p>
            </form>
        );
}

export default Login;