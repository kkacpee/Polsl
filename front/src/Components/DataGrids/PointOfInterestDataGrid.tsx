import React from 'react'
import { DataGrid } from '@material-ui/data-grid';
import { PointOfInterest } from '../../Types/PointOfInterestTypes';
import { useStyles, CustomPagination } from './GridStyles';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'address', headerName: 'Address', width: 130 },
    { field: 'contact', headerName: 'Contact', width: 130 },
    { field: 'description', headerName: 'Description', width: 130 },
    { field: 'pointOfInterestTypeName', headerName: 'Type', width: 130 },
  ];

  interface GridProps {
      data: PointOfInterest[]
  }

const PointOfInterestDataGrid = ({data}:GridProps) => {
    const classes = useStyles();
    return (
        <div style={{ height: 400, width: '100%' }}>
        <DataGrid className={classes.root} components={{pagination: CustomPagination}} disableSelectionOnClick
        autoHeight rows={data} columns={columns} pageSize={5} checkboxSelection />
        </div> 
    )
}

export default PointOfInterestDataGrid;

