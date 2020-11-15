// import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, Box, Button, Card, CardHeader, CardMedia, Container, createStyles, Divider, Grid, makeStyles, Paper, Theme, Typography } from '@material-ui/core';
// import React from 'react';
// import { useParams } from 'react-router-dom';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import { PresentationState } from '../../Types/PresentationTypes';
// import { useSelector } from 'react-redux';
// import { GetPresentationDetails } from '../../Actions/PresentationActions';
// import { RootState } from '../../Reducers/rootReducer';
// import { useDispatch } from 'react-redux';
// import _ from 'lodash';
// import AccommodationDataGrid from '../../Components/DataGrids/AccommodationDataGrid';
// import BuildingPlanDataGrid from '../../Components/DataGrids/BuildingPlanDataGrid';
// import EmergencyNumberDataGrid from '../../Components/DataGrids/EmergencyNumberDataGrid';
// import PointOfInterestDataGrid from '../../Components/DataGrids/PointOfInterestDataGrid';
// import SponsorDataGrid from '../../Components/DataGrids/SponsorDataGrid';
// import OrganizerDataGrid from '../../Components/DataGrids/OrganizerDataGrid';
// import PresentationDataGrid from '../../Components/DataGrids/PresentationDataGrid';
// import Details from '../../Components/Details';
// import AddPresentationAccommodationDialog from './PresentationMiscDialogs/AddPresentationAccommodationDialog';

// //import { Details } from '@material-ui/icons';

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     root: {
//       width: '100%',
//     },
//     heading: {
//       fontSize: theme.typography.pxToRem(15),
//       fontWeight: theme.typography.fontWeightRegular,
//     },
//   }),
// );

// const PresentationDetails = () => {
//     const { id } = useParams();
//     const classes = useStyles();
//     const dispatch = useDispatch();
//     const Presentation:PresentationState = useSelector((state: RootState ) => state.Presentation);

//     React.useEffect( () => {
//         FetchData()
//     },[]);

//     async function FetchData(){
//        await dispatch(GetPresentationDetails(id))
//     }
//     const ShowData = () => {
//         if (!_.isEmpty(Presentation.details)){
//                 return(
//                     <Container>
//                     <Grid container direction="column" justify='center' alignItems='stretch' >
//                         <Details details={Presentation.details!}></Details>
//                         <Accordion>
//                         <AccordionSummary
//                         expandIcon={<ExpandMoreIcon />}
//                         aria-controls="panel2a-content"
//                         id="presentations-header"
//                         >
//                             <Typography className={classes.heading}>Presentations</Typography>
//                         </AccordionSummary>
//                         <AccordionDetails>
//                             <PresentationDataGrid data={Presentation.details!.presentations} />
//                         </AccordionDetails>
//                         <Divider />
//                         <AccordionActions>
//                             <Button size="small" >Delete selected</Button>
//                             <Button size="small" color="primary">
//                                 Add
//                             </Button>
//                         </AccordionActions>
//                         </Accordion>
//                         <Accordion>
//                             <AccordionSummary
//                             expandIcon={<ExpandMoreIcon />}
//                             aria-controls="panel2a-content"
//                             id="accommodations-header"
//                             >
//                                 <Typography className={classes.heading}>Accommodations</Typography>
//                             </AccordionSummary>
//                             <AccordionDetails>
//                                 <AccommodationDataGrid data={Presentation.details!.accommodations} />
//                             </AccordionDetails>
//                             <Divider />
//                             <AccordionActions>
//                                 <Button size="small" >Delete selected</Button>
//                                 <AddPresentationAccommodationDialog dialogTitle="Add Accommodation" fetch={() => {FetchData()}} />
//                             </AccordionActions>
//                         </Accordion>
//                         <Accordion>
//                             <AccordionSummary
//                             expandIcon={<ExpandMoreIcon />}
//                             aria-controls="buildingPlans-content"
//                             id="panel2a-header"
//                             >
//                                 <Typography className={classes.heading}>Building Plans</Typography>
//                             </AccordionSummary>
//                             <AccordionDetails>
//                                 <BuildingPlanDataGrid type='noId' dataNoPresentationId={Presentation.details!.buildingPlans} />
//                             </AccordionDetails>
//                             <Divider />
//                             <AccordionActions>
//                                 <Button size="small">Delete selected</Button>
//                                 <Button size="small" color="primary">
//                                     Add
//                                 </Button>
//                             </AccordionActions>
//                         </Accordion>
//                         <Accordion>
//                             <AccordionSummary
//                             expandIcon={<ExpandMoreIcon />}
//                             aria-controls="panel2a-content"
//                             id="emergencyNumbers-header"
//                             >
//                                 <Typography className={classes.heading}>Emergency Numbers</Typography>
//                             </AccordionSummary>
//                             <AccordionDetails>
//                                 <EmergencyNumberDataGrid data={Presentation.details!.emergencyNumbers} />
//                             </AccordionDetails>
//                             <Divider />
//                             <AccordionActions>
//                                 <Button size="small">Delete selected</Button>
//                                 <Button size="small" color="primary">
//                                     Add
//                                 </Button>
//                             </AccordionActions>
//                         </Accordion>
//                         <Accordion>
//                             <AccordionSummary
//                             expandIcon={<ExpandMoreIcon />}
//                             aria-controls="panel2a-content"
//                             id="organizer-header"
//                             >
//                                 <Typography className={classes.heading}>Organizer</Typography>
//                             </AccordionSummary>
//                             <AccordionDetails>
//                                 <OrganizerDataGrid data={Presentation.details!.organizers} />
//                             </AccordionDetails>
//                             <Divider />
//                             <AccordionActions>
//                                 <Button size="small">Delete selected</Button>
//                                 <Button size="small" color="primary">
//                                     Add
//                                 </Button>
//                             </AccordionActions>
//                         </Accordion>
//                         <Accordion>
//                             <AccordionSummary
//                             expandIcon={<ExpandMoreIcon />}
//                             aria-controls="panel2a-content"
//                             id="pointsOfInterest-header"
//                             >
//                                 <Typography className={classes.heading}>Points Of Interest</Typography>
//                             </AccordionSummary>
//                             <AccordionDetails>
//                                 <PointOfInterestDataGrid data={Presentation.details!.pointsOfInterest} />
//                             </AccordionDetails>
//                             <Divider />
//                             <AccordionActions>
//                                 <Button size="small">Delete selected</Button>
//                                 <Button size="small" color="primary">
//                                     Add
//                                 </Button>
//                             </AccordionActions>
//                         </Accordion>
//                         <Accordion>
//                         <AccordionSummary
//                         expandIcon={<ExpandMoreIcon />}
//                         aria-controls="panel2a-content"
//                         id="sponsor-header"
//                         >
//                             <Typography className={classes.heading}>Sponsor</Typography>
//                         </AccordionSummary>
//                         <AccordionDetails>
//                             <SponsorDataGrid data={Presentation.details!.sponsors} />
//                         </AccordionDetails>
//                         <Divider />
//                             <AccordionActions>
//                                 <Button size="small">Delete selected</Button>
//                                 <Button size="small" color="primary">
//                                     Add
//                                 </Button>
//                             </AccordionActions>
//                     </Accordion>
//                     </Grid>
//                     </Container>
//             )
//         }
//         if (Presentation.loading){
//             return <p> loading... </p>
//         }

//         if (Presentation.errorMsg !== ""){
//         console.log(Presentation.errorMsg)
//         }
//     }

//     return(
//         <div>
//         {ShowData()}
//         </div>
//     )
// };

// export default PresentationDetails;