import React from 'react'
import { DataGrid, ValueFormatterParams } from '@material-ui/data-grid';
import { BuildingPlan, ConferenceBuildngPlan } from '../../Types/BuildingPlanTypes';
import { useStyles, CustomPagination } from './GridStyles';

  interface GridProps {
      data?: BuildingPlan[]
      dataNoConferenceId?: ConferenceBuildngPlan[],
      type: 'id' | 'noId'
  }

const BuildingPlanDataGrid = ({data, dataNoConferenceId, type}:GridProps) => {
    const classes = useStyles();
    const RenderTable = () => {
        if (type === 'id'){
            const columns = [
                { field: 'id', headerName: 'ID', width: 70 },
                { field: 'name', headerName: 'Name', width: 130 },
                { field: 'path', headerName: 'Path', width: 130 },
                { field: 'description', headerName: 'Description', width: 130 },
                { field: 'conferenceID', headerName: 'Conference ID', width: 130 },
                // { field: 'id', headerName: 'Edit', width: 100,
                // renderCell: (params: ValueFormatterParams) => {
                //     const data:BuildingPlan = {
                //         id:Number(params.data.id),
                //         name:params.data.name,
                //         path: params.data.path,
                //         description: params.data.description,
                //         conferenceId: params.data.conferenceID
                //     }
                //     return(
                //         <EditAccommodationDialog dialogTitle="Edit accommodation" fetch={fetch} data={data}/>
                //     )}},
                // { field: 'id', headerName: 'Delete', width: 80,
                // renderCell: (params:ValueFormatterParams) => (
                //     <DeleteAccommodationDialog fetch={fetch} id={Number(params.data.id)} />
                // )}
              ];

            return(
                <div style={{ height: 400, width: '100%' }}>
                <DataGrid className={classes.root} rowsPerPageOptions={[5, 10, 20, 40]} disableSelectionOnClick
                autoHeight rows={data!} columns={columns} pageSize={5} />
                </div>
            )
        }
        else if (type === 'noId') {
            const columns = [
                { field: 'id', headerName: 'ID', width: 70 },
                { field: 'name', headerName: 'Name', width: 130 },
                { field: 'path', headerName: 'Path', width: 130 },
                { field: 'description', headerName: 'Description', width: 130 }
              ];

            return(
                <div style={{ height: 400, width: '100%' }}>
                <DataGrid className={classes.root} rowsPerPageOptions={[5, 10, 20, 40]}
                autoHeight rows={dataNoConferenceId!} columns={columns} pageSize={5} />
                </div>
            )
        }
    }
    return (
        <>
            {RenderTable()}
        </>
    )
}

export default BuildingPlanDataGrid;

