import * as React from "react";
import {Link} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import { default as Tab } from '@material-ui/core/Tab';
import HomeIcon from '@material-ui/icons/Home';
import CodeIcon from '@material-ui/icons/Code';
import TimelineIcon from '@material-ui/icons/Timeline';

function NavBar() {
  const [value, setValue] = React.useState(0);
  
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  return (
    <div >
      <AppBar position="static" >
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label='Home' icon={ <HomeIcon />} component={Link} to="/" />
          <Tab label='Conference' icon={<CodeIcon />} component={Link} to="/conference" />
          <Tab label='Misc' icon={<TimelineIcon />} component={Link} to="/misc" />
          <Tab label='Sign In' icon={<TimelineIcon />} component={Link} to="/sign-in" />
        </Tabs>
      </AppBar>
    </div>
  )
};

export default NavBar;