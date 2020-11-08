import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { RootState } from '../../Reducers/rootReducer'
import _ from 'lodash';
import { ConferenceState } from '../../Types/ConferenceTypes';
import { GetConferenceList } from '../../Actions/ConferenceActions';
import Card from '../../Components/Card';
import { Col, Container, Row } from 'react-bootstrap';
import Dialog from "./AddConferenceDialog"
import { CircularProgress } from '@material-ui/core';

const ConferenceList = () => {
    const dispatch = useDispatch();
    const ConferenceList:ConferenceState = useSelector((state: RootState ) => state.Conference);

    React.useEffect( () => {
        FetchData()
    },[]);

    const FetchData = () => {
        dispatch(GetConferenceList())
    }

    const ShowData = () => {
        if (!_.isEmpty(ConferenceList.data)){
            return (
                <Container>
                    <Row>
                    {ConferenceList.data.map(({id, title, startDate, endDate,...rest}) => {
                    return (
                        <Col md={4}>
                        <Card key={id} id={id} name={title} data={rest} dates={[startDate, endDate]} onRowClick={() => {FetchData()}}></Card>
                        </Col>
                    )
                    })}
                    </Row>
                    <Row>
                        <div>
                        <Dialog dialogTitle="Add new conference" fetch={() => {FetchData()}}></Dialog>
                        </div>
                    </Row>
                </Container>
            )
        }
        if (ConferenceList.loading){
            return <CircularProgress />
        }

        if (ConferenceList.errorMsg !== ""){
        console.log(ConferenceList.errorMsg)
        }
    }

    return(
        <div> {ShowData()}
        </div>
    )
};

export default ConferenceList;