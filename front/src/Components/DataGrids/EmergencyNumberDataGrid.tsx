import React from 'react'
import { Columns, DataGrid, ValueFormatterParams } from '@material-ui/data-grid';
import { EmergencyNumber } from '../../Types/EmergencyNumberTypes';
import { useStyles } from './GridStyles';
import _ from 'lodash';
import EditEmergencyNumberDialog from '../../Screens/EmergencyNumber/EditEmergencyNumberDialog';
import DeleteEmergencyNumberDialog from '../../Screens/EmergencyNumber/DeleteEmergencyNumberDialog';

interface GridProps {
    data: EmergencyNumber[],
    fetch: () => void,
    setSelection?: React.Dispatch<React.SetStateAction<(string | number)[] | undefined>>
  }

const EmergencyNumberDataGrid = ({data, fetch, setSelection}:GridProps) => {

  const classes = useStyles();
    if(_.isUndefined(setSelection)){
      const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Name', flex: 1 },
        { field: 'number', headerName: 'Number', flex: 1 },
        { field: 'id', headerName: 'Edit', width: 100,
            renderCell: (params: ValueFormatterParams) => {
                const data:EmergencyNumber = {
                    id:Number(params.row.id),
                    name:params.row.name,
                    number:params.row.number,
                }
                return(
                    <EditEmergencyNumberDialog dialogTitle="Edit emergency number" fetch={fetch} data={data}/>
                )}},
            { field: 'id', headerName: 'Delete', width: 80,
            renderCell: (params:ValueFormatterParams) => (
                <DeleteEmergencyNumberDialog fetch={fetch} id={Number(params.row.id)} />
            )}
      ];

      return (
        <div style={{ height: 400, width: '100%' }}>
        <DataGrid className={classes.root} rowsPerPageOptions={[5, 10, 20, 40]} disableSelectionOnClick
        autoHeight rows={data} columns={columns} pageSize={5} key={`emergencyNumber`}/>
        </div> 
      )
    }
    else{
      const columns: Columns = [
        { field: 'id', headerName: 'ID', width: 70,  },
        { field: 'name', headerName: 'Name', flex: 1 },
        { field: 'number', headerName: 'Number', flex: 1 }
      ];

      return (
        <div style={{ height: 400, width: '100%' }}>
        <DataGrid className={classes.root} rowsPerPageOptions={[5, 10, 20, 40]} disableSelectionOnClick
        autoHeight rows={data} columns={columns} pageSize={5} checkboxSelection
        onSelectionChange={(newSelection) => {setSelection(newSelection.rowIds);}} key={`emergencyNumber`}/>
        </div> 
      )
    }

}

export default EmergencyNumberDataGrid;

