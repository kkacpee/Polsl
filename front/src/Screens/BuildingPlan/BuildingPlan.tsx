import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { RootState } from '../../Reducers/rootReducer'
import _ from 'lodash';
import { BuildingPlanState } from '../../Types/BuildingPlanTypes';
import { GetBuildingPlanList } from '../../Actions/BuildingPlanActions';
import { Container, Row } from 'react-bootstrap';
import { DataGrid } from '@material-ui/data-grid';

const BuildingPlanList = () => {
    const dispatch = useDispatch();
    const buildingPlanState:BuildingPlanState = useSelector((state: RootState ) => state.BuildingPlan);
    
    React.useEffect( () => {
        FetchData()
    }, []);

    const FetchData = () => {
        dispatch(GetBuildingPlanList())
    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 10 },
        { field: 'name', headerName: 'Name', width: 130 },
        { field: 'path', headerName: 'Path', width: 130 },
        { field: 'description', headerName: 'Description', width: 130 },
        { field: 'conferenceID', headerName: 'Conference ID', width: 130 }
      ];

    const ShowData = () => {
        if (!_.isEmpty(buildingPlanState.data)){
            return (
                <>
                <Container>
                    <Row>
                    <div style={{ height: 400, width: '100%' }}>
                    <DataGrid autoHeight rows={buildingPlanState.data} columns={columns} pageSize={5} checkboxSelection />
                    </div> 
                    </Row>
                    <Row>
                        <div>
                            {/* place for dialog */}
                        </div>
                    </Row>
                </Container>
                </>
            )
        }
        if (buildingPlanState.loading){
            return <p> loading... </p>
        }

        if (buildingPlanState.errorMsg !== ""){
            return <p>{buildingPlanState.errorMsg}</p>
        }

        return <p> unable to do shit </p>
    }
    
    return(
        <div> {ShowData()}</div>
    )
};

export default BuildingPlanList;