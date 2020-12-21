import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { RootState } from '../../Reducers/rootReducer'
import { PointOfInterestState } from '../../Types/PointOfInterestTypes';
import { GetPointOfInterestIconList, GetPointOfInterestTypeList } from '../../Actions/PointOfInterestActions';
import { Backdrop, CircularProgress, Container, createStyles, Grid, makeStyles, Theme } from '@material-ui/core';
import Dialog from './PointOfInterestDialogs/AddPointOfInterestIconDialog';
import AddPointOfInterestTypeDialog from './PointOfInterestDialogs/AddPointOfInterestTypeDialog'
import PointOfInterestTypeDataGrid from '../../Components/DataGrids/PointOfInterestTypeDataGrid';
import { Container as FloatingContainer, Button as FloatingButton} from 'react-floating-action-button';
import More from '@material-ui/icons/MoreVert'
import PointOfInterestIconsGrid from './PointOfInterestDialogs/PointOfInterestIconsGridDialog';

const PointOfInterestTypeList = () => {
    const dispatch = useDispatch();
    const pointOfInterestState:PointOfInterestState = useSelector((state: RootState ) => state.PointOfInterest);

    React.useEffect( () => {
        FetchData()
    }, []);

    async function FetchData () {
       await dispatch(GetPointOfInterestTypeList());
       await dispatch(GetPointOfInterestIconList());
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
            <Backdrop className={useStyles().backdrop} open={pointOfInterestState.loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <Container style={{padding: 20}}>
                <Grid container direction="row" justify='space-evenly' alignItems='flex-start' >
                <PointOfInterestTypeDataGrid data={pointOfInterestState.types!} icons={pointOfInterestState.icons} fetch={() => {FetchData()}}/>
                </Grid>
                <Grid container direction="row" justify='space-between' alignItems='flex-end' >
                    <FloatingContainer>
                    <FloatingButton>
                        <PointOfInterestIconsGrid dialogTitle="Icons" fetch={() => {FetchData()}} photos={pointOfInterestState.icons}/>
                    </FloatingButton>

                    <FloatingButton tooltip="Icon">
                        <Dialog dialogTitle="Add new Point Of Interest icon" fetch={() => {FetchData()}} />
                    </FloatingButton>
                    
                    <FloatingButton tooltip="Type">                    
                        <AddPointOfInterestTypeDialog dialogTitle="Add new Point Of Interest type" fetch={() => {FetchData()}} />
                    </FloatingButton>
                    
                    
                    <FloatingButton> <More /></FloatingButton>
                    </FloatingContainer>
                </Grid>
            </Container>
            </>
        )
    }

    return(
    <div> {ShowData()} </div>
    )
};

export default PointOfInterestTypeList;