import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { RootState } from '../../Reducers/rootReducer'
import { RateState } from '../../Types/RateTypes';
import { GetRateCriterionList } from '../../Actions/RateActions';
import { Backdrop, CircularProgress, Container, createStyles, Grid, makeStyles, Theme } from '@material-ui/core';
import RateCriterionDataGrid from '../../Components/DataGrids/RateCriterionDataGrid';
import AddRateCriterionDialog from './RateDialogs/AddRateCriterionDialog';

const RateCriterionList = () => {
    const dispatch = useDispatch();
    const rateState:RateState = useSelector((state: RootState ) => state.Rate);
    
    React.useEffect( () => {
        FetchData()
    }, []);

    async function FetchData () {
       await dispatch(GetRateCriterionList())
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
            <Backdrop className={useStyles().backdrop} open={rateState.loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <Container style={{padding: 20}}>
                <Grid container direction="row" justify='space-evenly' alignItems='flex-start' >
                <RateCriterionDataGrid data={rateState.criterions} fetch={() => {FetchData()}} />
                </Grid>
                <Grid container direction="row" justify='center' alignItems='flex-end' >
                    <div>
                    <AddRateCriterionDialog dialogTitle="Add new Emergency Number" fetch={() => {FetchData()}}></AddRateCriterionDialog>
                    </div>
                </Grid>
            </Container>
            </>
        )
    }
    
    return(
        <>
         {ShowData()}
        </>
    )
};

export default RateCriterionList;