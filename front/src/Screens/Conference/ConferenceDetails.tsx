import { Accordion, AccordionDetails, AccordionSummary, createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import React from 'react';
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

    React.useEffect( () => {
        FetchData()
    },[]);

    async function FetchData(){
       await dispatch(GetConferenceDetails(id))
    }
    const ShowData = () => {
        if (!_.isEmpty(Conference.data)){
            console.log(Conference.details)
                return(
                    <>
                    <div>
                        
                    </div>
                    <Accordion>
                            <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2a-content"
                            id="accommodations-header"
                            >
                                <Typography className={classes.heading}>Accommodations</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <AccommodationDataGrid data={Conference.details!.accommodations} />
                            </AccordionDetails>
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
                        </Accordion>
                    </>
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
        <div> Conference {id} Details
        {ShowData()}

        </div>
    )
};

export default ConferenceDetails;