import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { setAlert } from "../Actions/AlertActions";
import { AlertState } from "../Types/AlertTypes";
import { RootState } from "../Reducers/rootReducer";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2)
    }
  }
}));

const CustomizedSnackbars = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const AlertState:AlertState = useSelector((state: RootState ) => state.Alert);

  const handleClose = (event: React.SyntheticEvent<any, Event>) => {
    dispatch(setAlert(false, AlertState.aType, AlertState.message));
  };

  return (
    <div className={classes.root}>
      <Snackbar
        open={AlertState.open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert
          elevation={6}
          variant="filled"
          onClose={handleClose}
          color={AlertState.aType}
        >
          {AlertState.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CustomizedSnackbars;
