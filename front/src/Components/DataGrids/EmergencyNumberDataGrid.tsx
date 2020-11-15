import React from 'react'
import { DataGrid } from '@material-ui/data-grid';
import { EmergencyNumber } from '../../Types/EmergencyNumberTypes';
import { useStyles, CustomPagination } from './GridStyles';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'number', headerName: 'Number', width: 130 }
  ];

interface GridProps {
    data: EmergencyNumber[]
  }

const EmergencyNumberDataGrid = ({data}:GridProps) => {
  const classes = useStyles();
    return (
        <div style={{ height: 400, width: '100%' }}>
        <DataGrid className={classes.root} components={{pagination: CustomPagination}} disableSelectionOnClick
        autoHeight rows={data} columns={columns} pageSize={5} checkboxSelection />
        </div> 
    )
}

export default EmergencyNumberDataGrid;

