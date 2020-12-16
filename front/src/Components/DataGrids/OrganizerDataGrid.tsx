import React from 'react'
import { DataGrid, ValueFormatterParams } from '@material-ui/data-grid';
import { Organizer } from '../../Types/OrganizerTypes';
import { useStyles } from './GridStyles';
import _ from 'lodash';
import EditOrganizerDialog from '../../Screens/Organizer/EditOrganizerDialog';
import DeleteOrganizerDialog from '../../Screens/Organizer/DeleteOrganizerDialog';

  interface GridProps {
      data: Organizer[],
      fetch: () => void,
      setSelection?: React.Dispatch<React.SetStateAction<(string | number)[] | undefined>>
  }

const OrganizerDataGrid = ({data, fetch, setSelection}:GridProps) => {
    const classes = useStyles();
    if(_.isUndefined(setSelection)){
        const columns = [
            { field: 'id', headerName: 'ID', width: 70 },
            { field: 'firstName', headerName: 'First Name', flex: 1 },
            { field: 'lastName', headerName: 'Last Name', flex: 1 },
            { field: 'affiliation', headerName: 'Affiliation', flex: 1 },
            { field: 'company', headerName: 'Company', flex: 1 },
            { field: 'contact', headerName: 'Contact', flex: 1 },
            { field: 'id', headerName: 'Edit', width: 100,
            renderCell: (params: ValueFormatterParams) => {
                const data:Organizer = {
                    id:Number(params.row.id),
                    firstName: params.row.firstName,
                    lastName: params.row.lastName,
                    affiliation: params.row.affiliation,
                    company: params.row.company,
                    contact: params.row.contact
                }
                return(
                    <EditOrganizerDialog dialogTitle="Edit accommodation" fetch={fetch} data={data}/>
                )}},
            { field: 'id', headerName: 'Delete', width: 80,
            renderCell: (params:ValueFormatterParams) => (
                <DeleteOrganizerDialog fetch={fetch} id={Number(params.row.id)} />
            )}
          ];

        return (
            <div style={{ height: 400, width: '100%' }}>
            <DataGrid className={classes.root} rowsPerPageOptions={[5, 10, 20, 40]} disableSelectionOnClick
            autoHeight rows={data} columns={columns} pageSize={5}/>
            </div> 
        )
    }
    else {
        const columns = [
            { field: 'id', headerName: 'ID', width: 70 },
            { field: 'firstName', headerName: 'First Name', flex: 1 },
            { field: 'lastName', headerName: 'Last Name', flex: 1 },
            { field: 'affiliation', headerName: 'Affiliation', flex: 1 },
            { field: 'company', headerName: 'Company', flex: 1 },
            { field: 'contact', headerName: 'Contact', flex: 1 }
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

export default OrganizerDataGrid;

