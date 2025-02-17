import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { RootState } from '../../Reducers/rootReducer'
import { OrganizerState } from '../../Types/OrganizerTypes';
import { GetOrganizerList } from '../../Actions/OrganizerActions';
import Dialog from './AddOrganizerDialog';
import OrganizerDataGrid from '../../Components/DataGrids/OrganizerDataGrid';
import { Backdrop, CircularProgress, Container, createStyles, Grid, makeStyles, Theme } from '@material-ui/core';

const OrganizerList = () => {
    const dispatch = useDispatch();
    const organizerState:OrganizerState = useSelector((state: RootState ) => state.Organizer);
    
   

    React.useEffect( () => {
        FetchData();
    }, []);

    async function FetchData () {
       await dispatch(GetOrganizerList())
    }

    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: '#000',
            },
        }),
    );

    const ShowData = () => {
        return (
            <>
            <Backdrop className={useStyles().backdrop} open={organizerState.loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
                <Container style={{padding: 20}}>
                    <Grid container direction="row" justify='space-evenly' alignItems='flex-start' >
                    <OrganizerDataGrid data={organizerState.data} fetch={() => {FetchData()}}/> 
                    </Grid>
                    <Grid container direction="row" justify='center' alignItems='flex-end' >
                        <div>
                        <Dialog dialogTitle="Add new Organizer" fetch={() => {FetchData()}}></Dialog>
                        </div>
                    </Grid>
                </Container>
            </>
        )
    }
    
    return(
        <div> {ShowData()}</div>
    
    )
};

export default OrganizerList;