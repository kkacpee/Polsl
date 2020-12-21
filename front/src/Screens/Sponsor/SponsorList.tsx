import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { RootState } from '../../Reducers/rootReducer'
import { SponsorState } from '../../Types/SponsorTypes';
import { GetSponsorList } from '../../Actions/SponsorActions';
import { Backdrop, CircularProgress, Container, createStyles, Grid, makeStyles, Theme } from '@material-ui/core';
import Dialog from './AddSponsorDialog';
import SponsorDataGrid from '../../Components/DataGrids/SponsorDataGrid';

const SponsorList = () => {
    const dispatch = useDispatch();
    const sponsorState:SponsorState = useSelector((state: RootState ) => state.Sponsor);
    
    React.useEffect( () => {
        FetchData()
    }, []);

    async function FetchData () {
       await dispatch(GetSponsorList())
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
            <Backdrop className={useStyles().backdrop} open={sponsorState.loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <Container style={{padding: 20}}>
                <Grid container direction="row" justify='space-evenly' alignItems='flex-start' >
                <SponsorDataGrid data={sponsorState.data} fetch={() => {FetchData()}} />
                </Grid>
                <Grid container direction="row" justify='center' alignItems='flex-end' >
                    <div>
                    <Dialog dialogTitle="Add new Emergency Number" fetch={() => {FetchData()}}></Dialog>
                    </div>
                </Grid>
            </Container>
            </>
        )
    }
    
    return(
        <>
         {ShowData()}
        </>
    )
};

export default SponsorList;