import { Box, Button, Grid } from "@material-ui/core"
import React from "react"
import { ConferenceDetails } from "../Types/ConferenceTypes"
import { default as EditDialog } from "../Screens/Conference/EditConferenceDialog"

interface Props {
    details: ConferenceDetails,
    fetch: () => void
}
const options = {
    year: 'numeric', month: 'numeric', day: 'numeric',
    hour: 'numeric', minute: 'numeric', second: 'numeric',
    hour12: false,
    timeZone: 'America/Los_Angeles' 
  };
const Details = ({details, fetch}:Props) => {
    return (
        <Box  border='1px solid black' padding='0'>
            <Grid container direction="row" justify='center' alignItems='center'> 
                <Box width='29%' justifyContent='center' >        
                    <img src="https://via.placeholder.com/300" style={{justifySelf:'center', alignSelf:'center'}}/>
                </Box>
                <Box width='70%' height='100%' border='1px solid black'>
                    <Grid container direction="row" justify='flex-end' alignItems='flex-start'>
                        <EditDialog dialogTitle="Edit Conference" details={details} fetch={fetch}/>
                    </Grid>
                    <Grid container direction="column" justify='space-between' alignItems='stretch' >
                        <Grid container direction="row" justify='center' alignItems='stretch' >
                            <Box component='h2'>
                                {details.title}
                            </Box>
                        </Grid>
                        <Grid container direction="row" justify='space-evenly' alignItems='stretch' >
                            <Box component='h6'>
                            From: {new Intl.DateTimeFormat('en-US', options).format(new Date(details.startDate))}
                            </Box>
                            <Box component='h6'>
                            To: {new Intl.DateTimeFormat('en-US', options).format(new Date(details.endDate))}
                            </Box>
                        </Grid>
                        <Grid container direction="row" justify='space-evenly' alignItems='stretch' >
                            <Box component='h4'>
                                Address: {details.address}
                            </Box>
                            <Box component='h4'>
                                Country: {details.country}
                            </Box>
                        </Grid>
                        <Grid container direction="row" justify='center' alignItems='stretch' >
                            <Box component='h4'>
                                {details.description}
                            </Box>
                        </Grid>
                        <Grid container direction="row" justify='flex-end' alignItems='stretch' >
                            <Box component='h4'>
                                {details.socialMedia}
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Grid>
        </Box>
    )
}

export default Details;