import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { RootState } from '../../Reducers/rootReducer'
import _ from 'lodash';
import { AccommodationState } from '../../Types/AccommodationTypes';
import { GetAccommodationList } from '../../Actions/AccommodationActions';
import Dialog from './AddAccommodationDialog';
import AccommodationDataGrid from '../../Components/DataGrids/AccommodationDataGrid';
import { CircularProgress, Container, Grid } from '@material-ui/core';
import { RowData } from '@material-ui/data-grid';

const AccommodationList = () => {
    const dispatch = useDispatch();
    const accommodationList:AccommodationState = useSelector((state: RootState ) => state.Accommodation);
    const [rows, setRows] = useState<RowData[]>();
    
    React.useEffect( () => {
        FetchData()
    }, []);

    const FetchData = () => {
        dispatch(GetAccommodationList())
    }

    const ShowData = () => {
        if (!_.isEmpty(accommodationList.data)){
            return (
                <Container style={{padding: 20}}>
                    <Grid container direction="row" justify='space-evenly' alignItems='flex-start' >
                    <AccommodationDataGrid data={accommodationList.data} setSelection={setRows}/>
                    </Grid>
                    <Grid container direction="row" justify='center' alignItems='flex-end' >
                        <div>
                        <Dialog dialogTitle="Add new Accommodation" fetch={() => {FetchData()}}></Dialog>
                        </div>
                    </Grid>
                </Container>
            )
        }
        if (accommodationList.loading){
            return <CircularProgress />
        }

        if (accommodationList.errorMsg !== ""){
            return <p>{accommodationList.errorMsg}</p>
        }
    }
    
    return(
        <div> {ShowData()}</div>
    )
};

export default AccommodationList;