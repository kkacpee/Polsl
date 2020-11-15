import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { RootState } from '../../Reducers/rootReducer'
import _ from 'lodash';
import { ConferenceState } from '../../Types/ConferenceTypes';
import { GetConferenceList } from '../../Actions/ConferenceActions';
import{ default as Card} from '../../Components/CardX';
import Dialog from "./AddConferenceDialog"
import { CircularProgress, Container, Grid } from '@material-ui/core';

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
                <Container style={{padding: 20}}>
                    <Grid container direction="row" justify='space-evenly' alignItems='flex-start' >
                    {ConferenceList.data.map((data) => {
                    return (
                        <Card key={data.id} data={data} onRowClick={() => {FetchData()}}></Card>
                    )
                    })}
                    </Grid>
                    <Grid container direction="row" justify='center' alignItems='flex-end' >
                        <div>
                        <Dialog dialogTitle="Add new conference" fetch={() => {FetchData()}}></Dialog>
                        </div>
                    </Grid>
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