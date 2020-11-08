import React from 'react'
import { DataGrid } from '@material-ui/data-grid';
import { Sponsor } from '../../Types/SponsorTypes';


const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'country', headerName: 'Country', width: 130 },
    { field: 'description', headerName: 'Description', width: 130 },
    { field: 'logoPath', headerName: 'Logopath', width: 130 },
    { field: 'website', headerName: 'Website', width: 130 },
  ];

  interface GridProps {
      data: Sponsor[]
  }

const SponsorDataGrid = ({data}:GridProps) => {
    return (
        <div style={{ height: 400, width: '100%' }}>
        <DataGrid autoHeight rows={data} columns={columns} pageSize={5} checkboxSelection />
        </div> 
    )
}

export default SponsorDataGrid;

