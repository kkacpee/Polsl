import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { RootState } from '../../Reducers/rootReducer'
import _ from 'lodash';
import { PointOfInterestState } from '../../Types/PointOfInterestTypes';
import { GetPointOfInterestList } from '../../Actions/PointOfInterestActions';
import { Container, Row } from 'react-bootstrap';
import Dialog from './AddPointOfInterestDialog';
import PointOfInterestDataGrid from '../../Components/DataGrids/PointOfInterestDataGrid';

const PointOfInterestList = () => {
    const dispatch = useDispatch();
    const pointOfInterestState:PointOfInterestState = useSelector((state: RootState ) => state.PointOfInterest);
    
    React.useEffect( () => {
        FetchData()
    }, []);

    const FetchData = () => {
        dispatch(GetPointOfInterestList())
    }

    const ShowData = () => {
        if (!_.isEmpty(pointOfInterestState.data)){
            return (
                <>
                <Container>
                    <Row>
                    <PointOfInterestDataGrid data={pointOfInterestState.data} />
                    </Row>
                    <Row>
                        <div>
                        <Dialog dialogTitle="Add new Point Of Interest" fetch={() => {FetchData()}}></Dialog>
                        </div>
                    </Row>
                </Container>
                </>
            )
        }
        if (pointOfInterestState.loading){
            return <p> loading... </p>
        }

        if (pointOfInterestState.errorMsg !== ""){
            return <p>{pointOfInterestState.errorMsg}</p>
        }

        return <p> unable to do shit </p>
    }
    
    return(
        <div> {ShowData()}</div>
    )
};

export default PointOfInterestList;