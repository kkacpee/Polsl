import { Box, Divider, Grid } from "@material-ui/core"
import React from "react"
import { ConferenceDetails } from "../Types/ConferenceTypes"
import { default as EditDialog } from "../Screens/Conference/EditConferenceDialog"
import Image from 'material-ui-image';
import ShowConferencePhotoDialog from "../Screens/Conference/ConferenceMiscDialogs/ShowConferencePhotosDialog";
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
    const getMain = () => {
       return details.photos.find(x => x.isMain == true);
    }
    return (
        <Grid container direction="row" justify='center' alignItems='center'> 
        <Box width="50%" boxSizing="border-box" flex>        
        <Image
            src={`${process.env.REACT_APP_SERVER_RESOURCE_URI as string}${getMain()?.path}`}
        />  
        </Box>
        <Box height='100%' width="50%" boxSizing="border-box" paddingLeft='10px'>
            <Grid container direction="row" justify='flex-end' alignItems='flex-start'>
                <ShowConferencePhotoDialog dialogTitle="Conference Photos" photos={details.photos} id={details.id} fetch={fetch}/>
                <EditDialog dialogTitle="Edit Conference" details={details} fetch={fetch}/>
            </Grid>
                <Grid container direction="column" justify='space-between' alignItems='stretch' >
                    <Box component='h2'>
                    Title: {details.title}
                    </Box>
                    <Divider orientation="horizontal" flexItem style={{background: "#000", height: 1}}/>
                    <Box component='h4'>
                    From: {new Intl.DateTimeFormat('en-US', options).format(new Date(details.startDate))}
                    </Box>
                    <Box component='h4'>
                    To: {new Intl.DateTimeFormat('en-US', options).format(new Date(details.endDate))}
                    </Box>
                    <Box component='h4'>
                        Address: {details.address}
                    </Box>
                    <Box component='h4'>
                        Country: {details.country}
                    </Box>
                    <Box component='h4'>
                        Description: {details.description}
                    </Box>
                    <Box component='h4'>
                        Social media: {details.socialMedia}
                    </Box>
                </Grid>
            </Box>
        </Grid> 
    )
}

export default Details;