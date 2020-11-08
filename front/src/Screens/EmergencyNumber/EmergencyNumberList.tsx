import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { RootState } from '../../Reducers/rootReducer'
import _ from 'lodash';
import { EmergencyNumberState } from '../../Types/EmergencyNumberTypes';
import { GetEmergencyNumberList } from '../../Actions/EmergencyNumberActions';
import { Container, Row } from 'react-bootstrap';
import Dialog from './AddEmergencyNumberDialog';
import EmergencyNumberDataGrid from '../../Components/DataGrids/EmergencyNumberDataGrid';
import { CircularProgress } from '@material-ui/core';

const EmergencyNumberList = () => {
    const dispatch = useDispatch();
    const emergencyNumberState:EmergencyNumberState = useSelector((state: RootState ) => state.EmergencyNumber);
    
    React.useEffect( () => {
        FetchData()
    }, []);

    const FetchData = () => {
        dispatch(GetEmergencyNumberList())
    }

    const ShowData = () => {
        if (!_.isEmpty(emergencyNumberState.data)){
            return (
                <>
                <Container>
                    <Row>
                    <EmergencyNumberDataGrid data={emergencyNumberState.data} />
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
            return <CircularProgress />
        }

        if (emergencyNumberState.errorMsg !== ""){
            return <p>{emergencyNumberState.errorMsg}</p>
        }
    }
    
    return(
        <div> {ShowData()}</div>
    )
};

export default EmergencyNumberList;