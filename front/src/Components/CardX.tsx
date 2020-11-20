import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Delete from '@material-ui/icons/Delete';
import { Conference } from '../Types/ConferenceTypes';
import { useDispatch } from 'react-redux';
import { DeleteConference } from '../Actions/ConferenceActions';
import { setAlert } from '../Actions/AlertActions';
import { Link } from 'react-router-dom';
import {default as MyTheme} from '../Styles/ThemeProvider'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({ 
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shortest,
        }),
      },
      expandOpen: {
        transform: 'rotate(180deg)',
      }
  }),
);
  interface Props {
      data: Conference;
      onRowClick: () => void;
  }
  const options = {
    year: 'numeric', month: 'numeric', day: 'numeric',
    hour: 'numeric', minute: 'numeric', second: 'numeric',
    hour12: false,
    timeZone: 'America/Los_Angeles' 
  };

const CustomCard = ({data, onRowClick}: Props) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const dispatch = useDispatch();
  
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  async function handleDelete(key:number){
    await dispatch(DeleteConference(key));  
    onRowClick();
  }


  const SubHeader = () => {
    return (
        <>
        <p>Start Date: {new Intl.DateTimeFormat('en-US', options).format(new Date(data.startDate))}
        <br/>
        End Date: {new Intl.DateTimeFormat('en-US', options).format(new Date(data.endDate))}</p>
        </>
    )
  }

  return (
      //className={classes.root}
    <Card color={MyTheme.palette.secondary.main}>
      <CardHeader
        action={
          <IconButton aria-label="settings" onClick={() => handleDelete(data.id)}>
            <Delete />
          </IconButton>
        }
        title={data.title}
        subheader={SubHeader()}
      />
      <CardMedia
        image="https://images.unsplash.com/photo-1580953870233-4c7f485628d8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
        title="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {data.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Link to={`/conference/${data.id}`}>
            <IconButton aria-label="See details">
                Details
            </IconButton>
        </Link>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>More Info:</Typography>
          <Typography paragraph>
            Address: {data.address}
          </Typography>
          <Typography paragraph>
            Country: {data.country}
          </Typography>
          <Typography>
            Social Media: {data.socialMedia}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default CustomCard;