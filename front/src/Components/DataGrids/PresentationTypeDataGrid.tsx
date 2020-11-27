import React from 'react'
import { DataGrid, RowData } from '@material-ui/data-grid';
import { PresentationType } from '../../Types/PresentationTypes';
import { useStyles, CustomPagination } from './GridStyles';
import _ from 'lodash';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 130 }
  ];

  interface GridProps {
      data: PresentationType[],
      setSelection?: React.Dispatch<React.SetStateAction<(string | number)[] | undefined>>
  }

const PresentationTypeDataGrid = ({data, setSelection}:GridProps) => {
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
            <DataGrid className={classes.root} components={{pagination: CustomPagination}} disableSelectionOnClick
            autoHeight rows={data} columns={columns} pageSize={5} checkboxSelection 
            onSelectionChange={(newSelection) => {setSelection(newSelection.rowIds);}}/>
            </div> 
        )
    }
}

export default PresentationTypeDataGrid;

