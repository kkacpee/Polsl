import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { RootState } from '../../Reducers/rootReducer'
import { BuildingPlanState } from '../../Types/BuildingPlanTypes';
import { GetBuildingPlanList } from '../../Actions/BuildingPlanActions';
import BuildingPlanDataGrid from '../../Components/DataGrids/BuildingPlanDataGrid';
import { CircularProgress, Container, Grid } from '@material-ui/core';

const BuildingPlanList = () => {
    const dispatch = useDispatch();
    const buildingPlanState:BuildingPlanState = useSelector((state: RootState ) => state.BuildingPlan);
    
    React.useEffect( () => {
        FetchData()
    }, []);

    const FetchData = () => {
        dispatch(GetBuildingPlanList())
    }

    const ShowData = () => {
        if (buildingPlanState.errorMsg !== ""){
            return <p>{buildingPlanState.errorMsg}</p>
        }

        if (buildingPlanState.loading){
            return <CircularProgress />
        }

        return (
            <Container style={{padding: 20}}>
                <Grid container direction="row" justify='space-evenly' alignItems='flex-start' >
                <BuildingPlanDataGrid type='id' data={buildingPlanState.data} />
                </Grid>
                <Grid container direction="row" justify='center' alignItems='flex-end' >
                    <div>
                    {/* <Dialog dialogTitle="Add new Accommodation" fetch={() => {FetchData()}}></Dialog> */}
                    </div>
                </Grid>
            </Container>
        )
    }
    
    return(
        <div> {ShowData()}</div>
    )
};

export default BuildingPlanList;