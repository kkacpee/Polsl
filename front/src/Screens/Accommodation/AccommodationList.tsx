import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { RootState } from '../../Reducers/rootReducer'
import _ from 'lodash';
import { AccommodationState } from '../../Types/AccommodationTypes';
import { GetAccommodationList } from '../../Actions/AccommodationActions';
import { Container, Row } from 'react-bootstrap';
import Dialog from './AddAccommodationDialog';
import AccommodationDataGrid from '../../Components/DataGrids/AccommodationDataGrid';
import { CircularProgress } from '@material-ui/core';

const AccommodationList = () => {
    const dispatch = useDispatch();
    const accommodationList:AccommodationState = useSelector((state: RootState ) => state.Accommodation);
    
    React.useEffect( () => {
        FetchData()
    }, []);

    const FetchData = () => {
        dispatch(GetAccommodationList())
    }

    const ShowData = () => {
        if (!_.isEmpty(accommodationList.data)){
            return (
                <>
                <Container>
                    <Row>
                    <AccommodationDataGrid data={accommodationList.data} />
                    </Row>
                    <Row>
                        <div>
                        <Dialog dialogTitle="Add new Accommodation" fetch={() => {FetchData()}}></Dialog>
                        </div>
                    </Row>
                </Container>
                </>
            )
        }
        if (accommodationList.loading){
            return <CircularProgress />
        }

        if (accommodationList.errorMsg !== ""){
            return <p>{accommodationList.errorMsg}</p>
        }
    }
    
    return(
        <div> {ShowData()}</div>
    )
};

export default AccommodationList;