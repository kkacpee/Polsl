import React from 'react'
import { DataGrid, RowData } from '@material-ui/data-grid';
import { PointOfInterest } from '../../Types/PointOfInterestTypes';
import { useStyles, CustomPagination } from './GridStyles';
import _ from 'lodash';
import { apiClient } from '../../Actions/ApiClient';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'address', headerName: 'Address', width: 130 },
    { field: 'contact', headerName: 'Contact', width: 130 },
    { field: 'description', headerName: 'Description', width: 130 },
    { field: 'pointOfInterestTypeName', headerName: 'Type', width: 130 }
  ];

  interface GridProps {
      data: PointOfInterest[],
      setSelection?: React.Dispatch<React.SetStateAction<(string | number)[] | undefined>>
  }

const PointOfInterestDataGrid = ({data, setSelection}:GridProps) => {
    const classes = useStyles();

    const [place, setPlace] = React.useState("");

    function photo(){
        apiClient
            .get(
                '/api/PointOfInterest/PointOfInterestIcon/get/2',
                { responseType: 'arraybuffer' },
            )
            .then(response => {
                const base64 = btoa(
                  new Uint8Array(response.data).reduce(
                    (data, byte) => data + String.fromCharCode(byte),
                    '',
                  ),
                );
                setPlace( "data:;base64," + base64 );
              });
    }


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

export default PointOfInterestDataGrid;

