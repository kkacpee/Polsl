import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { RootState } from '../../Reducers/rootReducer'
import { BuildingPlanState } from '../../Types/BuildingPlanTypes';
import { GetBuildingPlanList } from '../../Actions/BuildingPlanActions';
import BuildingPlanDataGrid from '../../Components/DataGrids/BuildingPlanDataGrid';
import { Backdrop, CircularProgress, Container, createStyles, Grid, makeStyles, Theme } from '@material-ui/core';

const BuildingPlanList = () => {
    const dispatch = useDispatch();
    const buildingPlanState:BuildingPlanState = useSelector((state: RootState ) => state.BuildingPlan);
    
    React.useEffect( () => {
        FetchData()
    }, []);

    async function FetchData () {
      await dispatch(GetBuildingPlanList())
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
        <Backdrop className={useStyles().backdrop} open={buildingPlanState.loading}>
            <CircularProgress color="inherit" />
        </Backdrop>
            <Container style={{padding: 20}}>
                <Grid container direction="row" justify='space-evenly' alignItems='flex-start' >
                <BuildingPlanDataGrid type='id' data={buildingPlanState.data} fetch={() => {FetchData()}}/>
                </Grid>
            </Container>
            </>
        )
    }
    
    return(
        <div> {ShowData()}</div>
    )
};

export default BuildingPlanList;