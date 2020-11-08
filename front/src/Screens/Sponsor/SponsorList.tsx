import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { RootState } from '../../Reducers/rootReducer'
import _ from 'lodash';
import { SponsorState } from '../../Types/SponsorTypes';
import { GetSponsorList } from '../../Actions/SponsorActions';
import { Container, Row } from 'react-bootstrap';
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
        if (!_.isEmpty(sponsorState.data)){
            return (
                <>
                <Container>
                    <Row>
                    <SponsorDataGrid data={sponsorState.data} />
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