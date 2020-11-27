import React from 'react'
import { DataGrid, PageChangeParams, RowData } from '@material-ui/data-grid';
import { Accommodation } from '../../Types/AccommodationTypes';
import { useStyles, CustomPagination } from './GridStyles';
import _ from 'lodash';

const columns = [
    { field: 'id', headerName: 'ID', width: 70},
    { field: 'name', headerName: 'Name', flex: 1},
    { field: 'address', headerName: 'Address', flex: 1},
    { field: 'number', headerName: 'Number', width: 150},
    { field: 'website', headerName: 'Website', flex: 1}
  ];

  interface GridProps {
      data: Accommodation[]
      setSelection?: React.Dispatch<React.SetStateAction<(string | number)[] | undefined>>
  }

const AccommodationDataGrid = ({data, setSelection}:GridProps) => {
    const classes = useStyles();

    if(_.isUndefined(setSelection)){
        return (
            <div style={{ height: 400, width: '100%' }}>
            <DataGrid className={classes.root} rowsPerPageOptions={[5, 10, 20, 40]} disableSelectionOnClick
            autoHeight rows={data} columns={columns} pageSize={5} />
            </div> 
        )
    }
    else{
        return (
            <div style={{ height: 400, width: '100%' }}>
            <DataGrid className={classes.root} disableSelectionOnClick
            autoHeight rows={data} columns={columns} pageSize={5} checkboxSelection 
            onSelectionChange={(newSelection) => {setSelection(newSelection.rowIds);}}/>
            </div> 
        )
    }
}

export default AccommodationDataGrid;

