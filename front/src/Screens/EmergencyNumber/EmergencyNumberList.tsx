import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { RootState } from '../../Reducers/rootReducer'
import _ from 'lodash';
import { EmergencyNumberState } from '../../Types/EmergencyNumberTypes';
import { GetEmergencyNumberList } from '../../Actions/EmergencyNumberActions';
import { Container, Row } from 'react-bootstrap';
import { DataGrid } from '@material-ui/data-grid';
import Dialog from './AddEmergencyNumberDialog';

const EmergencyNumberList = () => {
    const dispatch = useDispatch();
    const emergencyNumberState:EmergencyNumberState = useSelector((state: RootState ) => state.EmergencyNumber);
    
    React.useEffect( () => {
        FetchData()
    }, []);

    const FetchData = () => {
        dispatch(GetEmergencyNumberList())
    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Name', width: 130 },
        { field: 'number', headerName: 'Number', width: 130 }
      ];

    const ShowData = () => {
        if (!_.isEmpty(emergencyNumberState.data)){
            return (
                <>
                <Container>
                    <Row>
                    <div style={{ height: 400, width: '100%' }}>
                    <DataGrid autoHeight rows={emergencyNumberState.data} columns={columns} pageSize={5} checkboxSelection />
                    </div> 
                    </Row>
                    <Row>
                        <div>
                        <Dialog dialogTitle="Add new Emergency Number" fetch={() => {FetchData()}}></Dialog>
                        </div>
                    </Row>
                </Container>
                </>
            )
        }
        if (emergencyNumberState.loading){
            return <p> loading... </p>
        }

        if (emergencyNumberState.errorMsg !== ""){
            return <p>{emergencyNumberState.errorMsg}</p>
        }

        return <p> unable to do shit </p>
    }
    
    return(
        <div> {ShowData()}</div>
    )
};

export default EmergencyNumberList;