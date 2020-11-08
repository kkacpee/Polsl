import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { RootState } from '../../Reducers/rootReducer'
import _ from 'lodash';
import { OrganizerState } from '../../Types/OrganizerTypes';
import { GetOrganizerList } from '../../Actions/OrganizerActions';
import { Container, Row } from 'react-bootstrap';
import Dialog from './AddOrganizerDialog';
import OrganizerDataGrid from '../../Components/DataGrids/OrganizerDataGrid';
import { CircularProgress } from '@material-ui/core';
const OrganizerList = () => {
    const dispatch = useDispatch();
    const organizerState:OrganizerState = useSelector((state: RootState ) => state.Organizer);
    
    React.useEffect( () => {
        FetchData()
    }, []);

    const FetchData = () => {
        dispatch(GetOrganizerList())
    }

    const ShowData = () => {
        if (!_.isEmpty(organizerState.data)){
            return (
                <>
                <Container>
                    <Row>
                    <OrganizerDataGrid data={organizerState.data} /> 
                    </Row>
                    <Row>
                        <div>
                        <Dialog dialogTitle="Add new Organizer" fetch={() => {FetchData()}}></Dialog>
                        </div>
                    </Row>
                </Container>
                </>
            )
        }
        if (organizerState.loading){
            return <CircularProgress />
        }

        if (organizerState.errorMsg !== ""){
            return <p>{organizerState.errorMsg}</p>
        }
    }
    
    return(
        <div> {ShowData()}</div>
    )
};

export default OrganizerList;