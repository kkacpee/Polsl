import React from 'react'
import { DataGrid } from '@material-ui/data-grid';
import { EmergencyNumber } from '../../Types/EmergencyNumberTypes';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'number', headerName: 'Number', width: 130 }
  ];

interface GridProps {
    data: EmergencyNumber[]
  }

const EmergencyNumberDataGrid = ({data}:GridProps) => {
    return (
        <div style={{ height: 400, width: '100%' }}>
        <DataGrid autoHeight rows={data} columns={columns} pageSize={5} checkboxSelection />
        </div> 
    )
}

export default EmergencyNumberDataGrid;

