import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { RootState } from '../../Reducers/rootReducer'
import { RateState } from '../../Types/RateTypes';
import { GetRateList } from '../../Actions/RateActions';
import { Container, Grid } from '@material-ui/core';
import Dialog from './RateDialogs/AddRateDialog';
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

    const ShowData = () => {
        if (rateState.errorMsg !== "" && rateState.errorMsg !== "Created"){
            return <p>{rateState.errorMsg}</p>
        }

        if (rateState.loading){
            return <p> loading... </p>
        }

        return (
            <Container style={{padding: 20}}>
                <Grid container direction="row" justify='space-evenly' alignItems='flex-start' >
                <RateDataGrid data={rateState.data} fetch={() => {FetchData()}} />
                </Grid>
            </Container>
        )
    }
    
    return(
        <>
         {ShowData()}
        </>
    )
};

export default RateList;