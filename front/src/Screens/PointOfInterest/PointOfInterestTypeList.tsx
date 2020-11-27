import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { RootState } from '../../Reducers/rootReducer'
import { PointOfInterestState } from '../../Types/PointOfInterestTypes';
import { GetPointOfInterestList, GetPointOfInterestTypeList } from '../../Actions/PointOfInterestActions';
import { Container, Grid } from '@material-ui/core';
import Dialog from './AddPointOfInterestDialog';
import PointOfInterestTypeDataGrid from '../../Components/DataGrids/PointOfInterestTypeDataGrid';
import { apiClient } from '../../Actions/ApiClient';

const PointOfInterestTypeList = () => {
    const dispatch = useDispatch();
    const pointOfInterestState:PointOfInterestState = useSelector((state: RootState ) => state.PointOfInterest);

    React.useEffect( () => {
        FetchData()
    }, []);

    async function FetchData () {
       await dispatch(GetPointOfInterestTypeList())
    }

    const ShowData = () => {
        
        if (pointOfInterestState.errorMsg !== ""){
            return <p>{pointOfInterestState.errorMsg}</p>
        }

        if (pointOfInterestState.loading){
            return <p> loading... </p>
        }

        return (
            <Container style={{padding: 20}}>
                <Grid container direction="row" justify='space-evenly' alignItems='flex-start' >
                <PointOfInterestTypeDataGrid data={pointOfInterestState.types!} />
                </Grid>
                <Grid container direction="row" justify='center' alignItems='flex-end' >
                    <div>
                    <Dialog dialogTitle="Add new Point Of Interest" fetch={() => {FetchData()}}></Dialog>
                    </div>
                </Grid>
            </Container>
        )
    }
    
    const ShowPhotos = () => {
        if (pointOfInterestState.types){
            return (
                <>
                {pointOfInterestState.types.map((type) => {
                    <img src={type.path}/>
                })}
                </>
            )
        }
    }

    return(
    <div> {ShowData()} <div>{ShowPhotos()}</div></div>
    )
};

export default PointOfInterestTypeList;