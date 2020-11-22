import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { RootState } from '../../Reducers/rootReducer'
import { EmergencyNumberState } from '../../Types/EmergencyNumberTypes';
import { GetEmergencyNumberList } from '../../Actions/EmergencyNumberActions';
import Dialog from './AddEmergencyNumberDialog';
import EmergencyNumberDataGrid from '../../Components/DataGrids/EmergencyNumberDataGrid';
import { CircularProgress, Container, Grid } from '@material-ui/core';

const EmergencyNumberList = () => {
    const dispatch = useDispatch();
    const emergencyNumberState:EmergencyNumberState = useSelector((state: RootState ) => state.EmergencyNumber);
    
    React.useEffect( () => {
        FetchData()
    }, []);

    const FetchData = () => {
        dispatch(GetEmergencyNumberList())
    }

    const ShowData = () => {
        if (emergencyNumberState.errorMsg !== ""){
            return <p>{emergencyNumberState.errorMsg}</p>
        }

        if (emergencyNumberState.loading){
            return <CircularProgress />
        }

        return (
            <Container style={{padding: 20}}>
                <Grid container direction="row" justify='space-evenly' alignItems='flex-start' >
                <EmergencyNumberDataGrid data={emergencyNumberState.data} />
                </Grid>
                <Grid container direction="row" justify='center' alignItems='flex-end' >
                    <div>
                    <Dialog dialogTitle="Add new Emergency Number" fetch={() => {FetchData()}}></Dialog>
                    </div>
                </Grid>
            </Container>
        )
    }
    
    return(
        <div> {ShowData()}</div>
    )
};

export default EmergencyNumberList;