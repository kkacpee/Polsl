import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { RootState } from '../../Reducers/rootReducer'
import { PresentationState } from '../../Types/PresentationTypes';
import { GetPresentationTypes } from '../../Actions/PresentationActions';
import { Container, Grid } from '@material-ui/core';
import Dialog from './PresentationDialogs/AddPresentationTypeDialog';
import PresentationTypeDataGrid from '../../Components/DataGrids/PresentationTypeDataGrid';

const PresentationTypeList = () => {
    const dispatch = useDispatch();
    const presentationState:PresentationState = useSelector((state: RootState ) => state.Presentation);

    React.useEffect( () => {
        FetchData()
    }, []);

    async function FetchData () {
       await dispatch(GetPresentationTypes())
    }

    const ShowData = () => {
        
        if (presentationState.errorMsg !== ""){
            return <p>{presentationState.errorMsg}</p>
        }

        if (presentationState.loading){
            return <p> loading... </p>
        }

        return (
            <Container style={{padding: 20}}>
                <Grid container direction="row" justify='space-evenly' alignItems='flex-start' >
                <PresentationTypeDataGrid data={presentationState.types} fetch={() => {FetchData()}} />
                </Grid>
                <Grid container direction="row" justify='center' alignItems='flex-end' >
                    <div>
                    <Dialog dialogTitle="Add new Presentation type" fetch={() => {FetchData()}}></Dialog> 
                    </div>
                </Grid>
            </Container>
        )
    }

    return(
    <div> {ShowData()} </div>
    )
};

export default PresentationTypeList;