import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { RootState } from '../../Reducers/rootReducer'
import _ from 'lodash';
import { ConferenceState } from '../../Types/ConferenceTypes';
import { GetConferenceList } from '../../Actions/ConferenceActions';
import{ default as Card} from '../../Components/Card';
import Dialog from "./AddConferenceDialog"
import { Backdrop, CircularProgress, Container, createStyles, Grid, makeStyles, Theme } from '@material-ui/core';

const ConferenceList = () => {
    const dispatch = useDispatch();
    const ConferenceList:ConferenceState = useSelector((state: RootState ) => state.Conference);

    React.useEffect( () => {
        FetchData()
    },[]);

    async function FetchData () {
       await dispatch(GetConferenceList())
    }
    const useStyles = makeStyles((theme: Theme) =>
    createStyles({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#000',
        },
    }),
);

const ShowData = () => {
    return (
        <>
        <Backdrop className={useStyles().backdrop} open={ConferenceList.loading}>
            <CircularProgress color="inherit" />
        </Backdrop>
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
            </>
        )
    }

    return(
        <div> {ShowData()}</div>
    )
};

export default ConferenceList;