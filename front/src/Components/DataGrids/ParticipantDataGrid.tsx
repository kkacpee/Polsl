import React from 'react'
import { DataGrid, RowData } from '@material-ui/data-grid';
import { Participant } from '../../Types/ParticipantTypes';
import { useStyles, CustomPagination } from './GridStyles';
import _ from 'lodash';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First Name', width: 130 },
    { field: 'lastName', headerName: 'Last Name', width: 130 },
    { field: 'affiliation', headerName: 'Affiliation', width: 130 },
    { field: 'company', headerName: 'Company', width: 130 },
    { field: 'country', headerName: 'Country', width: 130 },
    { field: 'description', headerName: 'Desription', width: 130 }
  ];

  interface GridProps {
      data: Participant[],
      setSelection?: React.Dispatch<React.SetStateAction<RowData[] | undefined>>
  }

const ParticipantDataGrid = ({data, setSelection}:GridProps) => {
    const classes = useStyles();
    if(_.isUndefined(setSelection)){
        return (
            <div style={{ height: 400, width: '100%' }}>
            <DataGrid className={classes.root} components={{pagination: CustomPagination}} disableSelectionOnClick
            autoHeight rows={data} columns={columns} pageSize={5} />
            </div> 
        )
    }
    else{
        return (
            <div style={{ height: 400, width: '100%' }}>
            <DataGrid className={classes.root} components={{pagination: CustomPagination}} disableSelectionOnClick
            autoHeight rows={data} columns={columns} pageSize={5} checkboxSelection 
            onSelectionChange={(newSelection) => {setSelection(newSelection.rows);}}/>
            </div> 
        )
    }
}

export default ParticipantDataGrid;

