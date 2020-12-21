import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { RootState } from '../../Reducers/rootReducer'
import { AccommodationState } from '../../Types/AccommodationTypes';
import { GetAccommodationList } from '../../Actions/AccommodationActions';
import Dialog from './AddAccommodationDialog';
import AccommodationDataGrid from '../../Components/DataGrids/AccommodationDataGrid';
import { Backdrop, CircularProgress, Container, createStyles, Grid, makeStyles, Theme } from '@material-ui/core';

const AccommodationList = () => {
    const dispatch = useDispatch();
    const accommodationList:AccommodationState = useSelector((state: RootState ) => state.Accommodation);
    
    React.useEffect( () => {
        FetchData()
    }, []);

    async function FetchData () {
      await dispatch(GetAccommodationList())
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
            <Backdrop className={useStyles().backdrop} open={accommodationList.loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <Container style={{padding: 20}} key="accommodation.key">
                <Grid container direction="row" justify='space-evenly' alignItems='flex-start' >
                <AccommodationDataGrid data={accommodationList.data} fetch={() => {FetchData()}} />
                </Grid>
                <Grid container direction="row" justify='center' alignItems='flex-end' >
                    <div>
                    <Dialog dialogTitle="Add new Accommodation" fetch={() => {FetchData()}}></Dialog>
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

export default AccommodationList;