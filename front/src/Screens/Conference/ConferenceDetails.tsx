import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, Box, Button, Card, CardHeader, CardMedia, Container, createStyles, Divider, Grid, makeStyles, Paper, Theme, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { ConferenceState } from '../../Types/ConferenceTypes';
import { useSelector } from 'react-redux';
import { GetConferenceDetails } from '../../Actions/ConferenceActions';
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
    const [rows, setRows] = useState<RowData[]>();
    
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
                                <AccommodationDataGrid data={Conference.details!.accommodations} setSelection={setRows} />
                            </AccordionDetails>
                            <Divider />
                            <AccordionActions>
                                <Button size="small" >Delete selected</Button>
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
                                <EmergencyNumberDataGrid data={Conference.details!.emergencyNumbers} />
                            </AccordionDetails>
                            <Divider />
                            <AccordionActions>
                                <Button size="small">Delete selected</Button>
                                <Button size="small" color="primary">
                                    Add
                                </Button>
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
                                <OrganizerDataGrid data={Conference.details!.organizers} />
                            </AccordionDetails>
                            <Divider />
                            <AccordionActions>
                                <Button size="small">Delete selected</Button>
                                <Button size="small" color="primary">
                                    Add
                                </Button>
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
                                <PointOfInterestDataGrid data={Conference.details!.pointsOfInterest} />
                            </AccordionDetails>
                            <Divider />
                            <AccordionActions>
                                <Button size="small">Delete selected</Button>
                                <Button size="small" color="primary">
                                    Add
                                </Button>
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
                            <SponsorDataGrid data={Conference.details!.sponsors} />
                        </AccordionDetails>
                        <Divider />
                            <AccordionActions>
                                <Button size="small">Delete selected</Button>
                                <Button size="small" color="primary">
                                    Add
                                </Button>
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