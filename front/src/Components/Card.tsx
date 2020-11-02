import React from 'react';
import BsCard from 'react-bootstrap/Card';
import _ from 'lodash';

type Props<DataItem> = {
    name: string
    data: DataItem;
    dates?: Date[];
    onRowClick: (item: DataItem) => void;
  };
  const options = {
    year: 'numeric', month: 'numeric', day: 'numeric',
    hour: 'numeric', minute: 'numeric', second: 'numeric',
    hour12: false,
    timeZone: 'America/Los_Angeles' 
  };

const Card = <DataItem extends object>({ name, data, dates, onRowClick }: Props<DataItem>) => {
    if(_.isEmpty(dates)){
        return (
            <BsCard border="dark" className="my-3">
            <BsCard.Header as="h5">{name}</BsCard.Header>
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
            <BsCard.Header as="h5">{name}</BsCard.Header>
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
            </BsCard>
        )
    }

}

export default Card;