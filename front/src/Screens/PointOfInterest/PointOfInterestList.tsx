import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { RootState } from '../../Reducers/rootReducer'
import _ from 'lodash';
import { PointOfInterestState } from '../../Types/PointOfInterestTypes';
import { GetPointOfInterestList } from '../../Actions/PointOfInterestActions';
import { Container, Row } from 'react-bootstrap';
import { DataGrid } from '@material-ui/data-grid';
import Dialog from './AddPointOfInterestDialog';

const PointOfInterestList = () => {
    const dispatch = useDispatch();
    const pointOfInterestState:PointOfInterestState = useSelector((state: RootState ) => state.PointOfInterest);
    
    React.useEffect( () => {
        FetchData()
    }, []);

    const FetchData = () => {
        dispatch(GetPointOfInterestList())
    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Name', width: 130 },
        { field: 'address', headerName: 'Address', width: 130 },
        { field: 'contact', headerName: 'Contact', width: 130 },
        { field: 'description', headerName: 'Description', width: 130 },
        { field: 'pointOfInterestTypeID', headerName: 'Type ID', width: 130 },
      ];

    const ShowData = () => {
        if (!_.isEmpty(pointOfInterestState.data)){
            return (
                <>
                <Container>
                    <Row>
                    <div style={{ height: 400, width: '100%' }}>
                    <DataGrid autoHeight rows={pointOfInterestState.data} columns={columns} pageSize={5} checkboxSelection />
                    </div> 
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