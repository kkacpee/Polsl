import React from 'react'
import { DataGrid, RowData } from '@material-ui/data-grid';
import { EmergencyNumber } from '../../Types/EmergencyNumberTypes';
import { useStyles, CustomPagination } from './GridStyles';
import _ from 'lodash';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'number', headerName: 'Number', width: 130 }
  ];

interface GridProps {
    data: EmergencyNumber[],
    setSelection?: React.Dispatch<React.SetStateAction<(string | number)[] | undefined>>
  }

const EmergencyNumberDataGrid = ({data, setSelection}:GridProps) => {

  const classes = useStyles();
    if(_.isUndefined(setSelection)){
      return (
        <div style={{ height: 400, width: '100%' }}>
        <DataGrid className={classes.root} rowsPerPageOptions={[5, 10, 20, 40]} disableSelectionOnClick
        autoHeight rows={data} columns={columns} pageSize={5}/>
        </div> 
      )
    }
    else{
      return (
        <div style={{ height: 400, width: '100%' }}>
        <DataGrid className={classes.root} rowsPerPageOptions={[5, 10, 20, 40]} disableSelectionOnClick
        autoHeight rows={data} columns={columns} pageSize={5} checkboxSelection
        onSelectionChange={(newSelection) => {setSelection(newSelection.rowIds);}}/>
        </div> 
      )
    }

}

export default EmergencyNumberDataGrid;

