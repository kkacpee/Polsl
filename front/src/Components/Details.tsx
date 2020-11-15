import { Box, Grid, Paper } from "@material-ui/core"
import React from "react"
import { ConferenceDetails } from "../Types/ConferenceTypes"

interface Props {
    details: ConferenceDetails;
}
const options = {
    year: 'numeric', month: 'numeric', day: 'numeric',
    hour: 'numeric', minute: 'numeric', second: 'numeric',
    hour12: false,
    timeZone: 'America/Los_Angeles' 
  };
const Details = ({details}:Props) => {
    return (
        <Box height='300px'>
            <Grid container direction="row" justify='space-evenly' alignItems='center' >
                    <Paper >
                    <img src="https://via.placeholder.com/150" />
                    </Paper>
                <Box width='70%'>
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