import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { RootState } from '../../Reducers/rootReducer'
import { ParticipantState } from '../../Types/ParticipantTypes';
import { GetParticipantList } from '../../Actions/ParticipantActions';
import Dialog from './AddParticipantDialog';
import ParticipantDataGrid from '../../Components/DataGrids/ParticipantDataGrid';
import { Backdrop, CircularProgress, Container, createStyles, Grid, makeStyles, Theme } from '@material-ui/core';

const ParticipantList = () => {
    const dispatch = useDispatch();
    const participantState:ParticipantState = useSelector((state: RootState ) => state.Participant);
    
    React.useEffect( () => {
        FetchData()
    }, []);

    async function FetchData () {
       await dispatch(GetParticipantList())
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
            <Backdrop className={useStyles().backdrop} open={participantState.loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <Container style={{padding: 20}}>
                <Grid container direction="row" justify='space-evenly' alignItems='flex-start' >
                <ParticipantDataGrid data={participantState.data} fetch={() => {FetchData()}}/>
                </Grid>
                <Grid container direction="row" justify='center' alignItems='flex-end' >
                    <div>
                    <Dialog dialogTitle="Add new Participant" fetch={() => {FetchData()}}></Dialog>
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

export default ParticipantList;