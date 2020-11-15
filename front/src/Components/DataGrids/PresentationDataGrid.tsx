import React from 'react'
import { DataGrid } from '@material-ui/data-grid';
import { useStyles, CustomPagination } from './GridStyles';
import { Presentation } from '../../Types/PresentationTypes';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'startDate', headerName: 'Start Date', width: 130 },
    { field: 'endDate', headerName: 'End Date', width: 130 },
    { field: 'place', headerName: 'Place', width: 130 },
    { field: 'authors', headerName: 'Authors', width: 130 },
    { field: 'title', headerName: 'Title', width: 130 },
    { field: 'description', headerName: 'Desription', width: 130 },
    { field: 'presentationTypeName', headerName: 'Type', width: 130 }
  ];

  interface GridProps {
      data: Presentation[]
  }

const PresentationDataGrid = ({data}:GridProps) => {
    const classes = useStyles();
    return (
        <div style={{ height: 400, width: '100%' }}>
        <DataGrid className={classes.root} components={{pagination: CustomPagination}} disableSelectionOnClick
        autoHeight rows={data} columns={columns} pageSize={5} checkboxSelection />
        </div> 
    )
}

export default PresentationDataGrid;

