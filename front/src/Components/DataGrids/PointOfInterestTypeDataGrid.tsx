import React from 'react'
import { DataGrid, RowData, ValueFormatterParams } from '@material-ui/data-grid';
import { PointOfInterestType } from '../../Types/PointOfInterestTypes';
import { useStyles, CustomPagination } from './GridStyles';
import _ from 'lodash';
import { Box } from '@material-ui/core';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'path', headerName: 'Image', width: 130,  renderCell: (params: ValueFormatterParams) => (
        // <Link to={`/presentation/${params.data.id}`}>
        <Box>
            <img src={params.value as string} style={{maxWidth:'100%', maxHeight:'100%'}}/>
        </Box>
        )}
  ];

  interface GridProps {
      data: PointOfInterestType[],
      setSelection?: React.Dispatch<React.SetStateAction<(string | number)[] | undefined>>
  }

const PointOfInterestTypeDataGrid = ({data, setSelection}:GridProps) => {
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
            <DataGrid className={classes.root} rowsPerPageOptions={[5, 10, 20, 40]} disableSelectionOnClick
            autoHeight rows={data} columns={columns} pageSize={5} checkboxSelection 
            onSelectionChange={(newSelection) => {setSelection(newSelection.rowIds);}}/>
            </div> 
        )
    }
}

export default PointOfInterestTypeDataGrid;

