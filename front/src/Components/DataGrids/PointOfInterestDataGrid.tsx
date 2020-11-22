import React from 'react'
import { DataGrid, RowData } from '@material-ui/data-grid';
import { PointOfInterest } from '../../Types/PointOfInterestTypes';
import { useStyles, CustomPagination } from './GridStyles';
import _ from 'lodash';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'address', headerName: 'Address', width: 130 },
    { field: 'contact', headerName: 'Contact', width: 130 },
    { field: 'description', headerName: 'Description', width: 130 },
    { field: 'pointOfInterestTypeName', headerName: 'Type', width: 130 },
  ];

  interface GridProps {
      data: PointOfInterest[],
      setSelection?: React.Dispatch<React.SetStateAction<RowData[] | undefined>>
  }

const PointOfInterestDataGrid = ({data, setSelection}:GridProps) => {
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

export default PointOfInterestDataGrid;

