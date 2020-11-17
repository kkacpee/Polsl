import { Button, Card, CardActions, CardContent, CardHeader, createStyles, makeStyles, TextField, Theme } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import { setAlert } from "../Actions/AlertActions";
import { SignIn } from "../Actions/AuthActions";
import { AuthRequest } from "../Types/AuthTypes";
import {default as MyTheme } from "../Styles/ThemeProvider";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      width: 400,
      margin: `${theme.spacing(0)} auto`
    },
    loginBtn: {
      marginTop: theme.spacing(2),
      flexGrow: 1
    },
    header: {
      textAlign: 'center',
      background: MyTheme.palette.primary.main,
      color: '#fff'
    },
    card: {
      marginTop: theme.spacing(10)
    }
  })
);

 const Login = () => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const classes = useStyles();

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
            <form className={classes.container} noValidate autoComplete="off">
            <Card className={classes.card}>
              <CardHeader className={classes.header} title="Login" />
              <CardContent>
                <div>
                  <TextField
                 //   error={state.isError}
                    fullWidth
                    id="username"
                    type="email"
                    label="Username"
                    placeholder="Username"
                    margin="normal"
                    onChange={(e) => setEmail(e.target.value)}
                 //   onKeyPress={handleKeyPress}
                  />
                  <TextField
                //    error={state.isError}
                    fullWidth
                    id="password"
                    type="password"
                    label="Password"
                    placeholder="Password"
                    margin="normal"
                  //  helperText={state.helperText}
                    onChange={(e) => setPassword(e.target.value)}
                   // onKeyPress={handleKeyPress}
                  />
                </div>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  size="large"
                  color="secondary"
                  className={classes.loginBtn}
                  onClick={handleSubmit}
                  //disabled={state.isButtonDisabled}
                  >
                  Login
                </Button>
              </CardActions>
            </Card>
          </form>
        );
}

export default Login;