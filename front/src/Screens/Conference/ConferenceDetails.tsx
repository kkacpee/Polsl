import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, Button, Container, createStyles, Divider, Grid, makeStyles, Theme, Typography } from '@material-ui/core';
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
import { RowData } from '@material-ui/data-grid';
import { setAlert } from '../../Actions/AlertActions';
import AddConferenceSponsorDialog from './ConferenceMiscDialogs/AddConferenceSponsorDialog';
import AddConferenceEmergencyNumberDialog from './ConferenceMiscDialogs/AddConferenceEmergencyNumber';
import AddConferenceOrganizerDialog from './ConferenceMiscDialogs/AddConferenceOrganizer';
import AddConferencePointOfInterestDialog from './ConferenceMiscDialogs/AddConferencePointOfInterest';

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
  }),
);

const ConferenceDetails = () => {
    const { id } = useParams();
    const classes = useStyles();
    const dispatch = useDispatch();
    const Conference:ConferenceState = useSelector((state: RootState ) => state.Conference);
    const [accommodationRows, setAccommodationRows] = useState<RowData[]>();
    const [organizerRows, setOrganizerRows] = useState<RowData[]>();
    const [emergencyNumberRows, setEmergencyNumberRows] = useState<RowData[]>();
    const [pointOfInterestRows, setPointOfInterestRows] = useState<RowData[]>();
    const [sponsorRows, setSponsorRows] = useState<RowData[]>();

    async function handleDelete(rows: RowData[] | undefined, requestType: requestType){
        let array = Array<number>();
        rows?.forEach(element => {
            array.push(parseInt(element.id.toString(), 10))
        });
    
        await dispatch(DeleteFromConference({conferenceID: id, arrayOfIDs: array}, requestType))
        dispatch(setAlert(true, "success", "Deleted successfully"));
        FetchData();
        }

    React.useEffect( () => {
        FetchData()
    },[]);

    async function FetchData(){
       await dispatch(GetConferenceDetails(id))
    }
    const ShowData = () => {
        if (!_.isEmpty(Conference.details)){
                return(
                    <Container>
                    <Grid container direction="column" justify='center' alignItems='stretch' >
                        <Details details={Conference.details!}></Details>
                        <Accordion>
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
                            <Button size="small" color="primary">
                                Add
                            </Button>
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
                                <AccommodationDataGrid data={Conference.details!.accommodations} setSelection={setAccommodationRows} />
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
                                <BuildingPlanDataGrid type='noId' dataNoConferenceId={Conference.details!.buildingPlans} />
                            </AccordionDetails>
                            <Divider />
                            <AccordionActions>
                                <Button size="small">Delete selected</Button>
                                <Button size="small" color="secondary">
                                    Add
                                </Button>
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
                                <EmergencyNumberDataGrid data={Conference.details!.emergencyNumbers} setSelection={setEmergencyNumberRows} />
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
                                <OrganizerDataGrid data={Conference.details!.organizers} setSelection={setOrganizerRows} />
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
                                <PointOfInterestDataGrid data={Conference.details!.pointsOfInterest} setSelection={setPointOfInterestRows} />
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
                            <SponsorDataGrid data={Conference.details!.sponsors} setSelection={setSponsorRows} />
                        </AccordionDetails>
                        <Divider />
                            <AccordionActions>
                                <Button size="small" onClick={() => {handleDelete(sponsorRows, "Sponsor")}}>Delete selected</Button>
                                <AddConferenceSponsorDialog id={id} dialogTitle="Add Sponsor" fetch={() => {FetchData()}} />
                            </AccordionActions>
                    </Accordion>
                    </Grid>
                    </Container>
            )
        }
        if (Conference.loading){
            return <p> loading... </p>
        }

        if (Conference.errorMsg !== ""){
        console.log(Conference.errorMsg)
        }
    }

    return(
        <div>
        {ShowData()}
        </div>
    )
};

export default ConferenceDetails;