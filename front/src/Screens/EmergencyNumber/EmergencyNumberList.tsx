import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { RootState } from '../../Reducers/rootReducer'
import { EmergencyNumberState } from '../../Types/EmergencyNumberTypes';
import { GetEmergencyNumberList } from '../../Actions/EmergencyNumberActions';
import Dialog from './AddEmergencyNumberDialog';
import EmergencyNumberDataGrid from '../../Components/DataGrids/EmergencyNumberDataGrid';
import { Backdrop, CircularProgress, Container, createStyles, Grid, makeStyles, Theme } from '@material-ui/core';

const EmergencyNumberList = () => {
    const dispatch = useDispatch();
    const emergencyNumberState:EmergencyNumberState = useSelector((state: RootState ) => state.EmergencyNumber);
    
    React.useEffect( () => {
        FetchData()
    }, []);

    async function FetchData () {
       await dispatch(GetEmergencyNumberList())
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
        <Backdrop className={useStyles().backdrop} open={emergencyNumberState.loading}>
            <CircularProgress color="inherit" />
        </Backdrop>
            <Container style={{padding: 20}}>
                <Grid container direction="row" justify='space-evenly' alignItems='flex-start' >
                <EmergencyNumberDataGrid data={emergencyNumberState.data} fetch={() => {FetchData()}} />
                </Grid>
                <Grid container direction="row" justify='center' alignItems='flex-end' >
                    <div>
                    <Dialog dialogTitle="Add new Emergency Number" fetch={() => {FetchData()}}></Dialog>
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

export default EmergencyNumberList;