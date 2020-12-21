import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { RootState } from '../../Reducers/rootReducer'
import { RateState } from '../../Types/RateTypes';
import { GetRateList } from '../../Actions/RateActions';
import { Backdrop, CircularProgress, Container, createStyles, Grid, makeStyles, Theme } from '@material-ui/core';
import RateDataGrid from '../../Components/DataGrids/RateDataGrid';

const RateList = () => {
    const dispatch = useDispatch();
    const rateState:RateState = useSelector((state: RootState ) => state.Rate);
    
    React.useEffect( () => {
        FetchData()
    }, []);

    async function FetchData () {
       await dispatch(GetRateList())
       console.log(rateState.data)
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
                <RateDataGrid data={rateState.data} fetch={() => {FetchData()}} />
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

export default RateList;