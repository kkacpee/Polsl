import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { RootState } from '../../Reducers/rootReducer'
import _ from 'lodash';
import { AccomodationState } from '../../Types/AccommodationTypes';
import { GetAccommodationList } from '../../Actions/AccommodationActions';
import { Container, Row } from 'react-bootstrap';
import { DataGrid } from '@material-ui/data-grid';

const AccommodationList = () => {
    const dispatch = useDispatch();
    const accommodationList:AccomodationState = useSelector((state: RootState ) => state.AccommodationList);
    
    React.useEffect( () => {
        FetchData()
    }, []);

    const FetchData = () => {
        dispatch(GetAccommodationList())
    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Name', width: 130 },
        { field: 'address', headerName: 'Address', width: 130 },
        {
          field: 'number',
          headerName: 'Number',
          width: 130,
        },
        {
            field: 'website',
            headerName: 'Website',
            width: 130,
        }
      ];

    const ShowData = () => {
        if (!_.isEmpty(accommodationList.data)){
            return (
                <>
                <Container>
                    <Row>
                    <div style={{ height: 400, width: '100%' }}>
                    <DataGrid autoHeight rows={accommodationList.data} columns={columns} pageSize={5} checkboxSelection />
                    </div> 
                    </Row>
                    <Row>
                        <div>
                            {/* place for dialog */}
                        </div>
                    </Row>
                </Container>
                </>
            )
        }
        if (accommodationList.loading){
            return <p> loading... </p>
        }

        if (accommodationList.errorMsg !== ""){
            return <p>{accommodationList.errorMsg}</p>
        }

        return <p> unable to do shit </p>
    }
    
    return(
        <div> {ShowData()}</div>
    )
};

export default AccommodationList;