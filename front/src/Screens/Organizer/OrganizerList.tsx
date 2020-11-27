import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { RootState } from '../../Reducers/rootReducer'
import { OrganizerState } from '../../Types/OrganizerTypes';
import { GetOrganizerList } from '../../Actions/OrganizerActions';
import Dialog from './AddOrganizerDialog';
import OrganizerDataGrid from '../../Components/DataGrids/OrganizerDataGrid';
import { CircularProgress, Container, Grid } from '@material-ui/core';
import axios from 'axios';
import { apiClient } from '../../Actions/ApiClient';

const OrganizerList = () => {
    const dispatch = useDispatch();
    const organizerState:OrganizerState = useSelector((state: RootState ) => state.Organizer);
    
   

    React.useEffect( () => {
        FetchData();
    }, []);

    async function FetchData () {
       await dispatch(GetOrganizerList())
    }

    const ShowData = () => {
        if (organizerState.errorMsg !== "" && organizerState.errorMsg !== "Created"){
            return <p>{organizerState.errorMsg}</p>
        }

        if (organizerState.loading){
            return <CircularProgress />
        }

        return (
            <Container style={{padding: 20}}>
                <Grid container direction="row" justify='space-evenly' alignItems='flex-start' >
                <OrganizerDataGrid data={organizerState.data} /> 
                </Grid>
                <Grid container direction="row" justify='center' alignItems='flex-end' >
                    <div>
                    <Dialog dialogTitle="Add new Organizer" fetch={() => {FetchData()}}></Dialog>
                    </div>
                </Grid>
            </Container>
        )
    }
    
    return(
        <div> {ShowData()}</div>
    
    )
};

export default OrganizerList;