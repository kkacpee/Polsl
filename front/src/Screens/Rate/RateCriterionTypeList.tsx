import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { RootState } from '../../Reducers/rootReducer'
import { RateState } from '../../Types/RateTypes';
import { GetRateCriterionTypeList } from '../../Actions/RateActions';
import { Backdrop, CircularProgress, Container, createStyles, Grid, makeStyles, Theme } from '@material-ui/core';
import RateCriterionTypeDataGrid from '../../Components/DataGrids/RateCriterionTypeDataGrid';
import AddRateCriterionTypeDialog from './RateDialogs/AddRateCriterionTypeDialog';

const RateCriterionTypeList = () => {
    const dispatch = useDispatch();
    const rateState:RateState = useSelector((state: RootState ) => state.Rate);
    
    React.useEffect( () => {
        FetchData()
    }, []);

    async function FetchData () {
       await dispatch(GetRateCriterionTypeList())
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
                <RateCriterionTypeDataGrid data={rateState.types} fetch={() => {FetchData()}} />
                </Grid>
                <Grid container direction="row" justify='center' alignItems='flex-end' >
                    <div>
                    <AddRateCriterionTypeDialog dialogTitle="Add new Emergency Number" fetch={() => {FetchData()}}></AddRateCriterionTypeDialog>
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

export default RateCriterionTypeList;