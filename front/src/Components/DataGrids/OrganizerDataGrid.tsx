import React from 'react'
import { DataGrid } from '@material-ui/data-grid';
import { Organizer } from '../../Types/OrganizerTypes';
import { useStyles, CustomPagination } from './GridStyles';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First Name', width: 130 },
    { field: 'lastName', headerName: 'Last Name', width: 130 },
    { field: 'affiliation', headerName: 'Affiliation', width: 130 },
    { field: 'company', headerName: 'Company', width: 130 },
    { field: 'contact', headerName: 'Contact', width: 130 }
  ];

  interface GridProps {
      data: Organizer[]
  }

const OrganizerDataGrid = ({data}:GridProps) => {
    const classes = useStyles();
    return (
        <div style={{ height: 400, width: '100%' }}>
        <DataGrid className={classes.root} components={{pagination: CustomPagination}} disableSelectionOnClick
        autoHeight rows={data} columns={columns} pageSize={5} checkboxSelection />
        </div> 
    )
}

export default OrganizerDataGrid;

