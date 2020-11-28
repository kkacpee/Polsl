import React from 'react'
import { DataGrid, ValueFormatterParams } from '@material-ui/data-grid';
import { Accommodation } from '../../Types/AccommodationTypes';
import { useStyles } from './GridStyles';
import _ from 'lodash';
import EditAccommodationDialog from '../../Screens/Accommodation/EditAccommodationDialog';
import DeleteAccommodationDialog from '../../Screens/Accommodation/DeleteAccommodationDialog';




  interface GridProps {
      data: Accommodation[],
      fetch: () => void,
      setSelection?: React.Dispatch<React.SetStateAction<(string | number)[] | undefined>>
  }

const AccommodationDataGrid = ({data, fetch, setSelection}:GridProps) => {
    const classes = useStyles();



    if(_.isUndefined(setSelection)){
        const columns = [
            { field: 'id', headerName: 'ID', width: 70},
            { field: 'name', headerName: 'Name', flex: 1},
            { field: 'address', headerName: 'Address', flex: 1},
            { field: 'number', headerName: 'Number', width: 150},
            { field: 'website', headerName: 'Website', flex: 1},
            { field: 'id', headerName: 'Edit', width: 100,
            renderCell: (params: ValueFormatterParams) => {
                const data:Accommodation = {
                    id:Number(params.data.id),
                    name:params.data.name,
                    address:params.data.address,
                    number:params.data.number,
                    website:params.data.website
                }
                return(
                    <EditAccommodationDialog dialogTitle="Edit accommodation" fetch={fetch} data={data}/>
                )}},
            { field: 'id', headerName: 'Delete', width: 80,
            renderCell: (params:ValueFormatterParams) => (
                <DeleteAccommodationDialog fetch={fetch} id={Number(params.data.id)} />
            )}
          ];

        return (
            <div style={{ height: 400, width: '100%' }}>
            <DataGrid className={classes.root} rowsPerPageOptions={[5, 10, 20, 40]} disableSelectionOnClick
            autoHeight rows={data} columns={columns} pageSize={5} />
            </div> 
        )
    }
    else{
        const columns = [
            { field: 'id', headerName: 'ID', width: 70},
            { field: 'name', headerName: 'Name', flex: 1},
            { field: 'address', headerName: 'Address', flex: 1},
            { field: 'number', headerName: 'Number', width: 150},
            { field: 'website', headerName: 'Website', flex: 1},
          ];

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

