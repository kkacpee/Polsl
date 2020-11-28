import React from 'react'
import { DataGrid, RowData, ValueFormatterParams } from '@material-ui/data-grid';
import { Sponsor } from '../../Types/SponsorTypes';
import { useStyles, CustomPagination } from './GridStyles';
import _ from 'lodash';
import EditSponsorDialog from '../../Screens/Sponsor/EditSponsorDialog';
import DeleteSponsorDialog from '../../Screens/Sponsor/DeleteSponsorDialog';

  interface GridProps {
      data: Sponsor[],
      fetch: () => void,
      setSelection?: React.Dispatch<React.SetStateAction<(string | number)[] | undefined>>
  }

const SponsorDataGrid = ({data, fetch, setSelection}:GridProps) => {
    const classes = useStyles();
    if(_.isUndefined(setSelection)){
        const columns = [
            { field: 'id', headerName: 'ID', width: 70 },
            { field: 'name', headerName: 'Name', flex: 1 },
            { field: 'country', headerName: 'Country', flex: 1 },
            { field: 'description', headerName: 'Description', flex: 1 },
            { field: 'logoPath', headerName: 'Logopath', flex: 1 },
            { field: 'website', headerName: 'Website', flex: 1 },
            { field: 'id', headerName: 'Edit', width: 100,
            renderCell: (params: ValueFormatterParams) => {
                const data:Sponsor = {
                    id:Number(params.data.id),
                    name:params.data.name,
                    country:params.data.country,
                    description:params.data.description,
                    logoPath:params.data.logoPath,
                    website:params.data.website
                }
                return(
                    <EditSponsorDialog dialogTitle="Edit sponsor" fetch={fetch} data={data}/>
                )}},
            { field: 'id', headerName: 'Delete', width: 80,
            renderCell: (params:ValueFormatterParams) => (
                <DeleteSponsorDialog fetch={fetch} id={Number(params.data.id)} />
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
            { field: 'name', headerName: 'Name', flex: 1 },
            { field: 'country', headerName: 'Country', flex: 1 },
            { field: 'description', headerName: 'Description', flex: 1 },
            { field: 'logoPath', headerName: 'Logopath', flex: 1 },
            { field: 'website', headerName: 'Website', flex: 1 }
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

export default SponsorDataGrid;

