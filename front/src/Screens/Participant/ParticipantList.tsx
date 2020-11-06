import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { RootState } from '../../Reducers/rootReducer'
import _ from 'lodash';
import { ParticipantState } from '../../Types/ParticipantTypes';
import { GetParticipantList } from '../../Actions/ParticipantActions';
import { Container, Row } from 'react-bootstrap';
import { DataGrid } from '@material-ui/data-grid';
import Dialog from './AddParticipantDialog';

const ParticipantList = () => {
    const dispatch = useDispatch();
    const participantState:ParticipantState = useSelector((state: RootState ) => state.Participant);
    
    React.useEffect( () => {
        FetchData()
    }, []);

    const FetchData = () => {
        dispatch(GetParticipantList())
    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'firstName', headerName: 'First Name', width: 130 },
        { field: 'lastName', headerName: 'Last Name', width: 130 },
        { field: 'affiliation', headerName: 'Affiliation', width: 130 },
        { field: 'company', headerName: 'Company', width: 130 },
        { field: 'country', headerName: 'Country', width: 130 },
        { field: 'description', headerName: 'Desription', width: 130 }
      ];

    const ShowData = () => {
        if (!_.isEmpty(participantState.data)){
            return (
                <>
                <Container>
                    <Row>
                    <div style={{ height: 400, width: '100%' }}>
                    <DataGrid autoHeight rows={participantState.data} columns={columns} pageSize={5} checkboxSelection />
                    </div> 
                    </Row>
                    <Row>
                        <div>
                        <Dialog dialogTitle="Add new Participant" fetch={() => {FetchData()}}></Dialog>
                        </div>
                    </Row>
                </Container>
                </>
            )
        }
        if (participantState.loading){
            return <p> loading... </p>
        }

        if (participantState.errorMsg !== ""){
            return <p>{participantState.errorMsg}</p>
        }

        return <p> unable to do shit </p>
    }
    
    return(
        <div> {ShowData()}</div>
    )
};

export default ParticipantList;