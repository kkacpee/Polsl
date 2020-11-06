import React from 'react';
import './App.css';
import {Switch, Route, Redirect} from 'react-router-dom';
import AccommodationList from './Screens/Accommodation/AccommodationList';
import AccommodationDetails from './Screens/Accommodation/AccommodationDetails';
import ConferenceList from './Screens/Conference/ConferenceList';
import SignIn from './Screens/SignIn';
import NavBar from './Components/Navbar';
import Snackbar from './Components/Snackbar'
import { CONFERENCE_DELETE_FAIL } from './Types/ConferenceTypes';
import ConferenceDetails from './Screens/Conference/ConferenceDetails';
import Misc from './Screens/Misc';

const App = () => {
  console.log(process.env);
  return (
    <div>
        <NavBar></NavBar>
        <Snackbar />
        <Switch>
                <Route exact path='/' />
                <Route path={"/sign-in"} exact component={SignIn} />
                <Route path={'/conference'} exact component={ConferenceList} />
                <Route path={'/misc'} exact component={Misc} />
                <Route path={'/accommodation'} exact component={AccommodationList} />
                <Route path={'/accommodation/:id'} exact component={AccommodationDetails} />
                <Route path={'/conference/:id'} exact component={ConferenceDetails} />
                <Redirect to={'/'}></Redirect>
        </Switch>
      </div>
  )
};

export default App;
