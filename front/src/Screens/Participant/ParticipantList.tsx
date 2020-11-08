import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { RootState } from '../../Reducers/rootReducer'
import _ from 'lodash';
import { ParticipantState } from '../../Types/ParticipantTypes';
import { GetParticipantList } from '../../Actions/ParticipantActions';
import { Container, Row } from 'react-bootstrap';
import Dialog from './AddParticipantDialog';
import ParticipantDataGrid from '../../Components/DataGrids/ParticipantDataGrid';
import { CircularProgress } from '@material-ui/core';

const ParticipantList = () => {
    const dispatch = useDispatch();
    const participantState:ParticipantState = useSelector((state: RootState ) => state.Participant);
    
    React.useEffect( () => {
        FetchData()
    }, []);

    const FetchData = () => {
        dispatch(GetParticipantList())
    }

    const ShowData = () => {
        if (!_.isEmpty(participantState.data)){
            return (
                <>
                <Container>
                    <Row>
                    <ParticipantDataGrid data={participantState.data} />
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
            return <CircularProgress />
        }

        if (participantState.errorMsg !== ""){
            return <p>{participantState.errorMsg}</p>
        }
    }
    
    return(
        <div> {ShowData()}</div>
    )
};

export default ParticipantList;