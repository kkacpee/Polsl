import React from 'react';
import './App.css';
import {Switch, Route, Redirect} from 'react-router-dom';
import AccommodationList from './Screens/Accommodation/AccommodationList';
import AccommodationDetails from './Screens/Accommodation/AccommodationDetails';
import ConferenceList from './Screens/Conference/ConferenceList';
import SignIn from './Screens/SignIn';
import NavBar from './Components/Navbar';
import Snackbar from './Components/Snackbar'
import ConferenceDetails from './Screens/Conference/ConferenceDetails';
import Misc from './Screens/Misc';
import PrivateRoute from './PrivateRoutes/PrivateRoute'
import Store from './Store';

const App = () => {
  const state = Store.getState();
  return (
    <div>
        <NavBar></NavBar>
        <Snackbar />
        <Switch>
                <Route exact path='/' />
                <PrivateRoute path={"/login"} exact component={SignIn} />
                <PrivateRoute path={'/conference'} exact component={ConferenceList} />
                <PrivateRoute path={'/misc'} exact component={Misc} />
                <PrivateRoute path={'/accommodation'} exact component={AccommodationList} />
                <PrivateRoute path={'/accommodation/:id'} exact component={AccommodationDetails} />
                <PrivateRoute path={'/conference/:id'} exact component={ConferenceDetails} />
                <Redirect to={'/'}></Redirect>
        </Switch>
      </div>
  )
};

export default App;
