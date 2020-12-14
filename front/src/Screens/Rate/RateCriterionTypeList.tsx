import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { RootState } from '../../Reducers/rootReducer'
import { RateState } from '../../Types/RateTypes';
import { GetRateCriterionTypeList, GetRateList } from '../../Actions/RateActions';
import { Container, Grid } from '@material-ui/core';
import Dialog from './RateDialogs/AddRateDialog';
import RateDataGrid from '../../Components/DataGrids/RateDataGrid';
import RateCriterionTypeDataGrid from '../../Components/DataGrids/RateCriterionTypeDataGrid';

const RateCriterionTypeList = () => {
    const dispatch = useDispatch();
    const rateState:RateState = useSelector((state: RootState ) => state.Rate);
    
    React.useEffect( () => {
        FetchData()
    }, []);

    async function FetchData () {
       await dispatch(GetRateCriterionTypeList())
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
                <RateCriterionTypeDataGrid data={rateState.types} fetch={() => {FetchData()}} />
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
        <>
         {ShowData()}
        </>
    )
};

export default RateCriterionTypeList;