import React from 'react'
import { DataGrid, ValueFormatterParams } from '@material-ui/data-grid';
import { Participant } from '../../Types/ParticipantTypes';
import { useStyles } from './GridStyles';
import _ from 'lodash';
import EditParticipantDialog from '../../Screens/Participant/EditParticipantDialog';
import DeleteParticipantDialog from '../../Screens/Participant/DeleteParticipantDialog';

  interface GridProps {
      data: Participant[],
      fetch: () => void,
      setSelection?: React.Dispatch<React.SetStateAction<(string | number)[] | undefined>>
  }

const ParticipantDataGrid = ({data, fetch, setSelection}:GridProps) => {
    const classes = useStyles();
    if(_.isUndefined(setSelection)){
        const columns = [
            { field: 'id', headerName: 'ID', width: 70 },
            { field: 'firstName', headerName: 'First Name', flex: 1 },
            { field: 'lastName', headerName: 'Last Name', flex: 1 },
            { field: 'affiliation', headerName: 'Affiliation', flex: 1 },
            { field: 'company', headerName: 'Company', flex: 1 },
            { field: 'country', headerName: 'Country', flex: 1 },
            { field: 'description', headerName: 'Desription', flex: 1 },
            { field: 'id', headerName: 'Edit', width: 100,
            renderCell: (params: ValueFormatterParams) => {
                const data:Participant = {
                    id:Number(params.data.id),
                    firstName: params.data.firstName,
                    lastName: params.data.lastName,
                    affiliation: params.data.affiliation,
                    company: params.data.company,
                    country: params.data.country,
                    description: params.data.description
                }
                return(
                    <EditParticipantDialog dialogTitle="Edit accommodation" fetch={fetch} data={data}/>
                )}},
            { field: 'id', headerName: 'Delete', width: 80,
            renderCell: (params:ValueFormatterParams) => (
                <DeleteParticipantDialog fetch={fetch} id={Number(params.data.id)} />
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
            { field: 'id', headerName: 'ID', width: 70 },
            { field: 'firstName', headerName: 'First Name', flex: 1 },
            { field: 'lastName', headerName: 'Last Name', flex: 1 },
            { field: 'affiliation', headerName: 'Affiliation', flex: 1 },
            { field: 'company', headerName: 'Company', flex: 1 },
            { field: 'country', headerName: 'Country', flex: 1 },
            { field: 'description', headerName: 'Desription', flex: 1 }
          ];

        return (
            <div style={{ height: 400, width: '100%' }}>
            <DataGrid className={classes.root} rowsPerPageOptions={[5, 10, 20, 40]} disableSelectionOnClick
            autoHeight rows={data} columns={columns} pageSize={5} checkboxSelection 
            onSelectionChange={(newSelection) => {setSelection(newSelection.rowIds);}}/>
            </div> 
        )
    }
}

export default ParticipantDataGrid;

