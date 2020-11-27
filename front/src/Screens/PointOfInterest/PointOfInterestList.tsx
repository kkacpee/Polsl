import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { RootState } from '../../Reducers/rootReducer'
import { PointOfInterestState } from '../../Types/PointOfInterestTypes';
import { GetPointOfInterestList } from '../../Actions/PointOfInterestActions';
import { Container, Grid } from '@material-ui/core';
import Dialog from './AddPointOfInterestDialog';
import PointOfInterestDataGrid from '../../Components/DataGrids/PointOfInterestDataGrid';

const PointOfInterestList = () => {
    const dispatch = useDispatch();
    const pointOfInterestState:PointOfInterestState = useSelector((state: RootState ) => state.PointOfInterest);
    
    React.useEffect( () => {
        FetchData()
    }, []);

    async function FetchData () {
       await dispatch(GetPointOfInterestList())
    }

    const ShowData = () => {
        
        if (pointOfInterestState.errorMsg !== "" && pointOfInterestState.errorMsg !== "Created"){
            return <p>{pointOfInterestState.errorMsg}</p>
        }

        if (pointOfInterestState.loading){
            return <p> loading... </p>
        }

        return (
            <Container style={{padding: 20}}>
                <Grid container direction="row" justify='space-evenly' alignItems='flex-start' >
                <PointOfInterestDataGrid data={pointOfInterestState.data} />
                </Grid>
                <Grid container direction="row" justify='center' alignItems='flex-end' >
                    <div>
                    <Dialog dialogTitle="Add new Point Of Interest" fetch={() => {FetchData()}}></Dialog>
                    </div>
                </Grid>
            </Container>
        )
    }
    
    return(
        <div> {ShowData()}</div>
    )
};

export default PointOfInterestList;