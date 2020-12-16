import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { RootState } from '../../Reducers/rootReducer'
import { RateState } from '../../Types/RateTypes';
import { GetRateCriterionList } from '../../Actions/RateActions';
import { Container, Grid } from '@material-ui/core';
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
                <RateCriterionDataGrid data={rateState.criterions} fetch={() => {FetchData()}} />
                </Grid>
                <Grid container direction="row" justify='center' alignItems='flex-end' >
                    <div>
                    <AddRateCriterionDialog dialogTitle="Add new Emergency Number" fetch={() => {FetchData()}}></AddRateCriterionDialog>
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

export default RateCriterionList;