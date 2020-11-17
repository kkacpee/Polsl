import React from 'react';
import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, Box, Button, Card, CardHeader, CardMedia, Container, createStyles, Divider, Grid, makeStyles, Paper, Theme, Typography } from '@material-ui/core';
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

const PresentationDetails = () => {
    const { id } = useParams();
    const classes = useStyles();
    const dispatch = useDispatch();
    const Presentation:PresentationState = useSelector((state: RootState ) => state.Presentation);

    React.useEffect( () => {
        FetchData()
    },[]);

    async function FetchData(){
       await dispatch(GetPresentationDetails(id))
    }
    const ShowData = () => {
        if (!_.isEmpty(Presentation.details)){
                return(
                    <Container>
                    <Grid container direction="column" justify='center' alignItems='stretch' >
                        
                        <Details details={Presentation.details!}></Details>
                        <Divider />
                        <Accordion>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="presentations-header"
                        >
                            <Typography className={classes.heading}>Participants</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <ParticipantDataGrid data={Presentation.details!.participants} />
                        </AccordionDetails>
                        <Divider />
                        <AccordionActions>
                            <Button size="small" >Delete selected</Button>
                            <Button size="small" color="primary">
                                Add
                            </Button>
                        </AccordionActions>
                        </Accordion>
                    </Grid>
                    </Container>
            )
        }
        if (Presentation.loading){
            return <p> loading... </p>
        }

        if (Presentation.errorMsg !== ""){
        console.log(Presentation.errorMsg)
        }
    }

    return(
        <div>
        {ShowData()}
        </div>
    )
};

export default PresentationDetails;