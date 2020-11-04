import React from 'react';
import BsCard from 'react-bootstrap/Card';
import _ from 'lodash';
import { Button, IconButton, Tooltip } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { useDispatch } from 'react-redux';
import { setAlert } from '../Actions/AlertActions';
import { DeleteConference } from '../Actions/ConferenceActions';
import { Link } from 'react-router-dom';

type Props<DataItem> = {
    id: number;
    name: string;
    data: DataItem;
    dates?: Date[];
    onRowClick: () => void;
  };
  const options = {
    year: 'numeric', month: 'numeric', day: 'numeric',
    hour: 'numeric', minute: 'numeric', second: 'numeric',
    hour12: false,
    timeZone: 'America/Los_Angeles' 
  };

const Card = <DataItem extends object>({id, name, data, dates, onRowClick }: Props<DataItem>) => {

    const dispatch = useDispatch();

    async function handleDelete(key:number){
        await dispatch(DeleteConference(key));  
        dispatch(setAlert(true, "success", "Deleted conference successfully"));
        onRowClick();
      }

    if(_.isEmpty(dates)){
        return (
            <BsCard border="dark" className="my-3">
            <BsCard.Header as="h5">{name}
                
            </BsCard.Header>
            <BsCard.Body>
                    {(Object.keys(data) as Array<keyof DataItem>).map(key => {
                       return (
                        <BsCard.Text key={key.toString()}>
                        {data[key]}</BsCard.Text>
                       )   
                    })}
                    
            </BsCard.Body>
            </BsCard>
        )
    }
    else{
        return (
        <BsCard border="dark" className="my-3">
            <BsCard.Header as="h5">{name}
                <Tooltip title="Delete">
                    <IconButton aria-label="delete" style={{alignSelf:'end'}} onClick={() => handleDelete(id)}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            </BsCard.Header>
            <BsCard.Body>
                    {(Object.keys(data) as Array<keyof DataItem>).map((key, idx) => {
                       return (
                        <BsCard.Text key={idx}>
                        {data[key]}</BsCard.Text>
                       )   
                    })}
                    {dates!.map((date, idx) => {
                       return (
                        <BsCard.Text key={idx}>
                        {new Intl.DateTimeFormat('en-US', options).format(new Date(date))}
                        </BsCard.Text>
                       )   
                    })}
            </BsCard.Body>
            <BsCard.Footer>
                <Link to={`/conference/${id}`}>
                    <Button variant="outlined" color="primary">
                        Primary
                    </Button>
                </Link>
            </BsCard.Footer>
            </BsCard>
        )
    }

}

export default Card;