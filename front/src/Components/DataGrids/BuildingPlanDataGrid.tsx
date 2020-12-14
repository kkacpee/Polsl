import React from 'react'
import { DataGrid, ValueFormatterParams } from '@material-ui/data-grid';
import { BuildingPlan, ConferenceBuildngPlan } from '../../Types/BuildingPlanTypes';
import { useStyles, CustomPagination } from './GridStyles';
import EditBuildingPlanDialog from '../../Screens/BuildingPlan/EditBuildingPlanDialog';
import DeleteBuildingPlanDialog from '../../Screens/BuildingPlan/DeleteBuildingPlanDialog';
import { Button } from '@material-ui/core';

  interface GridProps {
      data?: BuildingPlan[]
      dataNoConferenceId?: ConferenceBuildngPlan[],
      type: 'id' | 'noId',
      id?: number,
      fetch: () => void,
  }

const BuildingPlanDataGrid = ({data, dataNoConferenceId, id, type, fetch}:GridProps) => {
    const classes = useStyles();
    const RenderTable = () => {
        if (type === 'id'){
            const columns = [
                { field: 'id', headerName: 'ID', width: 70 },
                { field: 'name', headerName: 'Name', flex: 1 },
                { field: 'description', headerName: 'Description', flex: 1 },
                { field: 'conferenceID', headerName: 'Conference ID', flex: 1 },
                { field: 'id', headerName: 'Edit', width: 100,
                renderCell: (params: ValueFormatterParams) => {
                    const data:BuildingPlan = {
                        id:Number(params.row.id),
                        name:params.row.name,
                        path: params.row.path,
                        description: params.row.description,
                        conferenceId: Number(params.row.conferenceID)
                    }
                    return(
                        <EditBuildingPlanDialog dialogTitle="Edit accommodation" fetch={fetch} data={data}/>
                    )}},
                { field: 'id', headerName: 'Delete', width: 80,
                renderCell: (params:ValueFormatterParams) => (
                    <DeleteBuildingPlanDialog fetch={fetch} id={Number(params.row.id)} />
                )},
                { field: 'id', headerName: 'File', width: 100,
                renderCell: (params: ValueFormatterParams) => (
                    <Button href= {`${process.env.REACT_APP_SERVER_RESOURCE_URI as string}${params.row.path}`} target = "_blank" color="primary">
                        Show
                    </Button>
                )}
              ];

            return(
                <div style={{ height: 400, width: '100%' }}>
                <DataGrid className={classes.root} rowsPerPageOptions={[5, 10, 20, 40]} disableSelectionOnClick
                autoHeight rows={data!} columns={columns} pageSize={5} key={`buildingPlan`}/>
                </div>
            )
        }
        else if (type === 'noId') {
            const columns = [
                { field: 'id', headerName: 'ID', width: 70 },
                { field: 'name', headerName: 'Name', flex: 1 },
                { field: 'description', headerName: 'Description', flex: 1 },
                { field: 'id', headerName: 'Edit', width: 100,
                renderCell: (params: ValueFormatterParams) => {
                    const data:BuildingPlan = {
                        id:Number(params.row.id),
                        name:params.row.name,
                        path: params.row.path,
                        description: params.row.description,
                        conferenceId: Number(id!)
                    }
                    return(
                        <EditBuildingPlanDialog dialogTitle="Edit accommodation" fetch={fetch} data={data}/>
                    )}},
                { field: 'id', headerName: 'Delete', width: 80,
                renderCell: (params:ValueFormatterParams) => (
                    <DeleteBuildingPlanDialog fetch={fetch} id={Number(params.row.id)} />
                )},
                { field: 'id', headerName: 'File', width: 100,
                renderCell: (params: ValueFormatterParams) => (
                    <Button href= {`${process.env.REACT_APP_SERVER_RESOURCE_URI as string}${params.row.path}`} target = "_blank" color="primary">
                        Show
                    </Button>
                )}
              ];

            return(
                <div style={{ height: 400, width: '100%' }}>
                <DataGrid className={classes.root} rowsPerPageOptions={[5, 10, 20, 40]}
                autoHeight rows={dataNoConferenceId!} columns={columns} pageSize={5} key={`buildingPlan`}/>
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

