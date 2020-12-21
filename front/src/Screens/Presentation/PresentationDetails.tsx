import React, { useState } from 'react';
import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, Backdrop, Button, CircularProgress, Container, createStyles, Divider, Grid, makeStyles, Theme, Typography } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { PresentationState } from '../../Types/PresentationTypes';
import { useSelector } from 'react-redux';
import { GetPresentationDetails } from '../../Actions/PresentationActions';
import { RootState } from '../../Reducers/rootReducer';
import { useDispatch } from 'react-redux';
import _ from 'lodash';
import Details from '../../Components/PresentationDetails';
import ParticipantDataGrid from '../../Components/DataGrids/ParticipantDataGrid';
import AddPresentationParticipantDialog from './PresentationDialogs/AddPresentationParticipantDialog';
import AddRateDialog from '../Rate/RateDialogs/AddRateDialog';
import RateDataGrid from '../../Components/DataGrids/RateDataGrid';

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

const PresentationDetails = () => {
    const { id } = useParams();
    const classes = useStyles();
    const dispatch = useDispatch();
    const Presentation:PresentationState = useSelector((state: RootState ) => state.Presentation);
    const [rateRows, setRateRows] = useState<(string | number)[]>();
    
    React.useEffect( () => {
        FetchData()
    },[]);

    async function FetchData(){
       await dispatch(GetPresentationDetails(id))
    }

    const ShowData = () => {
                return( (!_.isEmpty(Presentation.details)) ? 
                    <>
                    <Backdrop className={classes.backdrop} open={Presentation.loading}>
                        <CircularProgress color="inherit" />
                    </Backdrop>
                    <Container style={{marginTop: 10, marginBottom: 20}}>
                    <Grid container direction="column" justify='center' alignItems='stretch' >
                        
                        <Details details={Presentation.details!} fetch={() => {FetchData()}}></Details>
                        <Accordion style={{marginTop: 10}}>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="presentations-header"
                        >
                            <Typography className={classes.heading}>Participants</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <ParticipantDataGrid data={Presentation.details!.participants} fetch={() => {FetchData()}}/>
                        </AccordionDetails>
                        <Divider />
                        <AccordionActions>
                            <Button size="small" >Delete selected</Button>
                            <AddPresentationParticipantDialog id={id} dialogTitle="Add Participant" fetch={() => {FetchData()}} />
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
                            <RateDataGrid data={Presentation.details!.rates} fetch={() => {FetchData()}} setSelection={setRateRows} />
                        </AccordionDetails>
                        <Divider />
                            <AccordionActions>
                                <AddRateDialog id={id} dialogTitle="Add Sponsor" fetch={() => {FetchData()}} isConferenceRate={false} />
                            </AccordionActions>
                    </Accordion>
                    </Grid>
                    </Container>
                    </>
                    : 
                    <Backdrop className={classes.backdrop} open={Presentation.loading}>
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

export default PresentationDetails;