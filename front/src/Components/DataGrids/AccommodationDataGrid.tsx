import React from 'react'
import { DataGrid, RowData } from '@material-ui/data-grid';
import { Accommodation } from '../../Types/AccommodationTypes';
import { useStyles, CustomPagination } from './GridStyles';
import _ from 'lodash';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'address', headerName: 'Address', width: 130 },
    { field: 'number', headerName: 'Number', width: 130 },
    { field: 'website', headerName: 'Website', width: 130 }
  ];

  interface GridProps {
      data: Accommodation[]
      setSelection?: React.Dispatch<React.SetStateAction<RowData[] | undefined>>
  }

const AccommodationDataGrid = ({data, setSelection}:GridProps) => {
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

export default AccommodationDataGrid;

