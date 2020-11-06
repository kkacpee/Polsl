import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { RootState } from '../../Reducers/rootReducer'
import _ from 'lodash';
import { OrganizerState } from '../../Types/OrganizerTypes';
import { GetOrganizerList } from '../../Actions/OrganizerActions';
import { Container, Row } from 'react-bootstrap';
import { DataGrid } from '@material-ui/data-grid';
import Dialog from './AddOrganizerDialog';
const OrganizerList = () => {
    const dispatch = useDispatch();
    const organizerState:OrganizerState = useSelector((state: RootState ) => state.Organizer);
    
    React.useEffect( () => {
        FetchData()
    }, []);

    const FetchData = () => {
        dispatch(GetOrganizerList())
    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'firstName', headerName: 'First Name', width: 130 },
        { field: 'lastName', headerName: 'Last Name', width: 130 },
        { field: 'affiliation', headerName: 'Affiliation', width: 130 },
        { field: 'company', headerName: 'Company', width: 130 },
        { field: 'contact', headerName: 'Contact', width: 130 }
      ];

    const ShowData = () => {
        if (!_.isEmpty(organizerState.data)){
            return (
                <>
                <Container>
                    <Row>
                    <div style={{ height: 400, width: '100%' }}>
                    <DataGrid autoHeight rows={organizerState.data} columns={columns} pageSize={5} checkboxSelection />
                    </div> 
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
            return <p> loading... </p>
        }

        if (organizerState.errorMsg !== ""){
            return <p>{organizerState.errorMsg}</p>
        }

        return <p> unable to do shit </p>
    }
    
    return(
        <div> {ShowData()}</div>
    )
};

export default OrganizerList;