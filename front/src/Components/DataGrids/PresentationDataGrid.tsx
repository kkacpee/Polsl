import React from 'react'
import { DataGrid, ValueFormatterParams } from '@material-ui/data-grid';
import { useStyles } from './GridStyles';
import { Presentation } from '../../Types/PresentationTypes';
import { IconButton } from '@material-ui/core';
import { Link } from 'react-router-dom';

const options = {
    year: 'numeric', month: 'numeric', day: 'numeric',
    hour: 'numeric', minute: 'numeric', second: 'numeric',
    hour12: false,
    timeZone: 'America/Los_Angeles' 
  };

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'startDate', headerName: 'Start Date', width: 160,
    renderCell: (params: ValueFormatterParams) => (
        <>
        {new Intl.DateTimeFormat('en-US', options).format(new Date(params.value as string))}
        </>
    ) },
    { field: 'endDate', headerName: 'End Date', width: 160,
    renderCell: (params: ValueFormatterParams) => (
        <>
        {new Intl.DateTimeFormat('en-US', options).format(new Date(params.value as string))}
        </>
    ) },
    { field: 'place', headerName: 'Place', flex: 1 },
    { field: 'authors', headerName: 'Authors', flex: 1 },
    { field: 'title', headerName: 'Title', flex: 1 },
    { field: 'description', headerName: 'Desription', flex: 1 },
    { field: 'presentationTypeName', headerName: 'Type', flex: 1 },
    { field: 'id', headerName: 'Details', width: 100, 
    renderCell: (params: ValueFormatterParams) => (
     <Link to={`/presentation/${params.row.id}`}>
        <IconButton aria-label="See details" size='small'>
            Details
        </IconButton>
    </Link>)}
  ];

  interface GridProps {
      data: Presentation[]
  }

const PresentationDataGrid = ({data}:GridProps) => {
    const classes = useStyles();
    return (
        <div style={{ height: 400, width: '100%' }}>
        <DataGrid className={classes.root} rowsPerPageOptions={[5, 10, 20, 40]} disableSelectionOnClick
        autoHeight rows={data} columns={columns} pageSize={5} />
        </div> 
    )
}

export default PresentationDataGrid;

