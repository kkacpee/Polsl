import React from 'react'
import { DataGrid } from '@material-ui/data-grid';
import { Accommodation } from '../../Types/AccommodationTypes';
import { useStyles, CustomPagination } from './GridStyles';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'address', headerName: 'Address', width: 130 },
    { field: 'number', headerName: 'Number', width: 130 },
    { field: 'website', headerName: 'Website', width: 130 }
  ];

  interface GridProps {
      data: Accommodation[]
  }

const AccommodationDataGrid = ({data}:GridProps) => {
    const classes = useStyles();
    return (
        <div style={{ height: 400, width: '100%' }}>
        <DataGrid className={classes.root} components={{pagination: CustomPagination}} disableSelectionOnClick
        autoHeight rows={data} columns={columns} pageSize={5} checkboxSelection />
        </div> 
    )
}

export default AccommodationDataGrid;

