import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { RootState } from '../../Reducers/rootReducer'
import { SponsorState } from '../../Types/SponsorTypes';
import { GetSponsorList } from '../../Actions/SponsorActions';
import { Container, Grid } from '@material-ui/core';
import Dialog from './AddSponsorDialog';
import SponsorDataGrid from '../../Components/DataGrids/SponsorDataGrid';

const SponsorList = () => {
    const dispatch = useDispatch();
    const sponsorState:SponsorState = useSelector((state: RootState ) => state.Sponsor);
    
    React.useEffect( () => {
        FetchData()
    }, []);

    const FetchData = () => {
        dispatch(GetSponsorList())
    }

    const ShowData = () => {
        if (sponsorState.errorMsg !== ""){
            return <p>{sponsorState.errorMsg}</p>
        }

        if (sponsorState.loading){
            return <p> loading... </p>
        }

        return (
            <Container style={{padding: 20}}>
                <Grid container direction="row" justify='space-evenly' alignItems='flex-start' >
                <SponsorDataGrid data={sponsorState.data} />
                </Grid>
                <Grid container direction="row" justify='center' alignItems='flex-end' >
                    <div>
                    <Dialog dialogTitle="Add new Emergency Number" fetch={() => {FetchData()}}></Dialog>
                    </div>
                </Grid>
            </Container>
        )
    }
    
    return(
        <>
         {ShowData()}
        </>
    )
};

export default SponsorList;