import * as React from "react";
import {Link} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import { default as Tab } from '@material-ui/core/Tab';
import CodeIcon from '@material-ui/icons/Code';
import TimelineIcon from '@material-ui/icons/Timeline';
import { Button, createStyles, makeStyles, Theme, Toolbar } from "@material-ui/core";
import { AuthState } from "../Types/AuthTypes";
import { useSelector } from "react-redux";
import { RootState } from "../Reducers/rootReducer";
import history from "../Helpers/HistoryHelper";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.primary.main
    },
    tabs: {
      flexGrow: 1,
    },
  }),
);

function NavBar() {
  const [value, setValue] = React.useState(0);
  const Auth:AuthState = useSelector((state: RootState ) => state.Auth);
  const classes = useStyles();
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  const handleLogout = () => {
    Auth.token = "";
    Auth.authenticated = false;
    history.push('/login');
  }

  const renderLogout = () => {
    if (Auth.authenticated){
      return(
          <>
          <Link to="/login">
            <Button onClick={handleLogout}>Logout</Button>
          </Link> 
          </>
      ) 
    }
  }
  return (
    <div className={classes.root}>
      <AppBar position="static" color="transparent">
        <Toolbar>
        <Tabs value={value} onChange={handleChange} className={classes.tabs} centered>
          <Tab label='Conference' icon={<CodeIcon />} component={Link} to="/conference" />
          <Tab label='Misc' icon={<TimelineIcon />} component={Link} to="/misc" />    
        </Tabs>
        {renderLogout()}
        </Toolbar>
        
      </AppBar>
    </div>
  )
};

export default NavBar;