import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, Backdrop, Button, CircularProgress, Container, createStyles, Divider, Grid, makeStyles, Theme, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { ConferenceState, requestType } from '../../Types/ConferenceTypes';
import { useSelector } from 'react-redux';
import { DeleteFromConference, GetConferenceDetails } from '../../Actions/ConferenceActions';
import { RootState } from '../../Reducers/rootReducer';
import { useDispatch } from 'react-redux';
import _ from 'lodash';
import AccommodationDataGrid from '../../Components/DataGrids/AccommodationDataGrid';
import BuildingPlanDataGrid from '../../Components/DataGrids/BuildingPlanDataGrid';
import EmergencyNumberDataGrid from '../../Components/DataGrids/EmergencyNumberDataGrid';
import PointOfInterestDataGrid from '../../Components/DataGrids/PointOfInterestDataGrid';
import SponsorDataGrid from '../../Components/DataGrids/SponsorDataGrid';
import OrganizerDataGrid from '../../Components/DataGrids/OrganizerDataGrid';
import PresentationDataGrid from '../../Components/DataGrids/PresentationDataGrid';
import Details from '../../Components/Details';
import AddConferenceAccommodationDialog from './ConferenceMiscDialogs/AddConferenceAccommodationDialog';
import AddConferenceSponsorDialog from './ConferenceMiscDialogs/AddConferenceSponsorDialog';
import AddConferenceEmergencyNumberDialog from './ConferenceMiscDialogs/AddConferenceEmergencyNumber';
import AddConferenceOrganizerDialog from './ConferenceMiscDialogs/AddConferenceOrganizer';
import AddConferencePointOfInterestDialog from './ConferenceMiscDialogs/AddConferencePointOfInterest';
import AddBuildingPlanDialog from './ConferenceMiscDialogs/AddBuildingPlanDialog';
import AddPresentationDialog from '../Presentation/PresentationDialogs/AddPresentationDialog';
import RateDataGrid from '../../Components/DataGrids/RateDataGrid';
import AddRateDialog from '../Rate/RateDialogs/AddRateDialog';

//import { Details } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#000',
        },
  }),
);

const ConferenceDetails = () => {
    const { id } = useParams();
    const classes = useStyles();
    const dispatch = useDispatch();
    const Conference:ConferenceState = useSelector((state: RootState ) => state.Conference);
    const [accommodationRows, setAccommodationRows] = useState<(string | number)[]>();
    const [organizerRows, setOrganizerRows] = useState<(string | number)[]>();
    const [emergencyNumberRows, setEmergencyNumberRows] = useState<(string | number)[]>();
    const [pointOfInterestRows, setPointOfInterestRows] = useState<(string | number)[]>();
    const [sponsorRows, setSponsorRows] = useState<(string | number)[]>();
    const [rateRows, setRateRows] = useState<(string | number)[]>();

    async function handleDelete(rows: (string | number)[] | undefined, requestType: requestType){
        let array = Array<number>();
        rows?.forEach(element => {
            array.push(Number(element))
        });
    
        await dispatch(DeleteFromConference({conferenceID: id, arrayOfIDs: array}, requestType))
        FetchData();
        }

    React.useEffect( () => {
        FetchData()
    },[]);

    async function FetchData(){
       await dispatch(GetConferenceDetails(id))
    }
    
    const ShowData = () => {         
    return( (!_.isEmpty(Conference.details)) ?
            <>
            <Backdrop className={classes.backdrop} open={Conference.loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <Container style={{marginTop: 10, marginBottom: 20}}>
            <Grid container direction="column" justify='center' alignItems='stretch' >
                <Details details={Conference.details!} fetch={() => {FetchData()}}></Details>
                <Accordion style={{marginTop: 10}}>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="presentations-header"
                >
                    <Typography className={classes.heading}>Presentations</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <PresentationDataGrid data={Conference.details!.presentations} />
                </AccordionDetails>
                <Divider />
                <AccordionActions>
                    <Button size="small" >Delete selected</Button>
                    <AddPresentationDialog id={id} dialogTitle="Add Presentation" fetch={() => {FetchData()}} />
                </AccordionActions>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="accommodations-header"
                    >
                        <Typography className={classes.heading}>Accommodations</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <AccommodationDataGrid data={Conference.details!.accommodations} fetch={() => {FetchData()}} setSelection={setAccommodationRows} />
                    </AccordionDetails>
                    <Divider />
                    <AccordionActions>
                        <Button size="small" onClick={() => {handleDelete(accommodationRows, "Accommodation")}}>Delete selected</Button>
                        <AddConferenceAccommodationDialog id={id} dialogTitle="Add Accommodation" fetch={() => {FetchData()}} />
                    </AccordionActions>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="buildingPlans-content"
                    id="panel2a-header"
                    >
                        <Typography className={classes.heading}>Building Plans</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <BuildingPlanDataGrid type='noId' dataNoConferenceId={Conference.details!.buildingPlans} id={id} fetch={() => {FetchData()}} />
                    </AccordionDetails>
                    <Divider />
                    <AccordionActions>
                        <Button size="small">Delete selected</Button>
                        <AddBuildingPlanDialog id={id} dialogTitle="Add Emergency Number" fetch={() => {FetchData()}} />
                    </AccordionActions>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="emergencyNumbers-header"
                    >
                        <Typography className={classes.heading}>Emergency Numbers</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <EmergencyNumberDataGrid data={Conference.details!.emergencyNumbers} fetch={() => {FetchData()}} setSelection={setEmergencyNumberRows} />
                    </AccordionDetails>
                    <Divider />
                    <AccordionActions>
                        <Button size="small" onClick={() => {handleDelete(emergencyNumberRows, "EmergencyNumber")}}>Delete selected</Button>
                        <AddConferenceEmergencyNumberDialog id={id} dialogTitle="Add Emergency Number" fetch={() => {FetchData()}} />
                    </AccordionActions>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="organizer-header"
                    >
                        <Typography className={classes.heading}>Organizer</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <OrganizerDataGrid data={Conference.details!.organizers} fetch={() => {FetchData()}} setSelection={setOrganizerRows} />
                    </AccordionDetails>
                    <Divider />
                    <AccordionActions>
                        <Button size="small" onClick={() => {handleDelete(organizerRows, "Organizer")}}>Delete selected</Button>
                        <AddConferenceOrganizerDialog id={id} dialogTitle="Add Organizer" fetch={() => {FetchData()}} />
                    </AccordionActions>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="pointsOfInterest-header"
                    >
                        <Typography className={classes.heading}>Points Of Interest</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <PointOfInterestDataGrid data={Conference.details!.pointsOfInterest} fetch={() => {FetchData()}} setSelection={setPointOfInterestRows} />
                    </AccordionDetails>
                    <Divider />
                    <AccordionActions>
                        <Button size="small" onClick={() => {handleDelete(pointOfInterestRows, "PointOfInterest")}}>Delete selected</Button>
                        <AddConferencePointOfInterestDialog id={id} dialogTitle="Add Point Of Interest" fetch={() => {FetchData()}} />
                    </AccordionActions>
                </Accordion>
                <Accordion>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="sponsor-header"
                >
                    <Typography className={classes.heading}>Sponsor</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <SponsorDataGrid data={Conference.details!.sponsors} fetch={() => {FetchData()}} setSelection={setSponsorRows} />
                </AccordionDetails>
                <Divider />
                    <AccordionActions>
                        <Button size="small" onClick={() => {handleDelete(sponsorRows, "Sponsor")}}>Delete selected</Button>
                        <AddConferenceSponsorDialog id={id} dialogTitle="Add Sponsor" fetch={() => {FetchData()}} />
                    </AccordionActions>
            </Accordion>
            <Accordion>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="sponsor-header"
                >
                    <Typography className={classes.heading}>Rates</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <RateDataGrid data={Conference.details!.rates} fetch={() => {FetchData()}} setSelection={setRateRows}/>
                </AccordionDetails>
                <Divider />
                    <AccordionActions>
                        <AddRateDialog id={id} dialogTitle="Add Rate" fetch={() => {FetchData()}} isConferenceRate={true} />
                    </AccordionActions>
            </Accordion>
            </Grid>
            </Container>
            </> : 
            <Backdrop className={classes.backdrop} open={Conference.loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
        )        
    }

    return(
        <div>
        {ShowData()}
        </div>
    )
};

export default ConferenceDetails;