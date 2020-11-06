import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { RootState } from '../../Reducers/rootReducer'
import _ from 'lodash';
import { SponsorState } from '../../Types/SponsorTypes';
import { GetSponsorList } from '../../Actions/SponsorActions';
import { Container, Row } from 'react-bootstrap';
import { DataGrid } from '@material-ui/data-grid';
import Dialog from './AddSponsorDialog';

const SponsorList = () => {
    const dispatch = useDispatch();
    const sponsorState:SponsorState = useSelector((state: RootState ) => state.Sponsor);
    
    React.useEffect( () => {
        FetchData()
    }, []);

    const FetchData = () => {
        dispatch(GetSponsorList())
    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Name', width: 130 },
        { field: 'country', headerName: 'Country', width: 130 },
        { field: 'description', headerName: 'Description', width: 130 },
        { field: 'logoPath', headerName: 'Logopath', width: 130 },
        { field: 'website', headerName: 'Website', width: 130 },
      ];

    const ShowData = () => {
        if (!_.isEmpty(sponsorState.data)){
            return (
                <>
                <Container>
                    <Row>
                    <div style={{ height: 400, width: '100%' }}>
                    <DataGrid autoHeight rows={sponsorState.data} columns={columns} pageSize={5} checkboxSelection />
                    </div> 
                    </Row>
                    <Row>
                        <div>
                        <Dialog dialogTitle="Add new Emergency Number" fetch={() => {FetchData()}}></Dialog>
                        </div>
                    </Row>
                </Container>
                </>
            )
        }
        if (sponsorState.loading){
            return <p> loading... </p>
        }

        if (sponsorState.errorMsg !== ""){
            return <p>{sponsorState.errorMsg}</p>
        }

        return <p> unable to do shit </p>
    }
    
    return(
        <div> {ShowData()}</div>
    )
};

export default SponsorList;