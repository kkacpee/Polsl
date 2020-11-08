import React from 'react'
import { DataGrid } from '@material-ui/data-grid';
import { BuildingPlan, ConferenceBuildngPlan } from '../../Types/BuildingPlanTypes';

const columns = [
    { field: 'id', headerName: 'ID', width: 10 },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'path', headerName: 'Path', width: 130 },
    { field: 'description', headerName: 'Description', width: 130 },
    { field: 'conferenceID', headerName: 'Conference ID', width: 130 }
  ];

  const columnsNoID = [
    { field: 'id', headerName: 'ID', width: 10 },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'path', headerName: 'Path', width: 130 },
    { field: 'description', headerName: 'Description', width: 130 }
  ];

  interface GridProps {
      data?: BuildingPlan[]
      dataNoConferenceId?: ConferenceBuildngPlan[],
      type: 'id' | 'noId'
  }

const BuildingPlanDataGrid = ({data, dataNoConferenceId, type}:GridProps) => {
    const RenderTable = () => {
        if (type === 'id'){
            return(
                <div style={{ height: 400, width: '100%' }}>
                <DataGrid autoHeight rows={data!} columns={columns} pageSize={5} checkboxSelection />
                </div>
            )
        }
        else if (type === 'noId') {
            return(
                <div style={{ height: 400, width: '100%' }}>
                <DataGrid autoHeight rows={dataNoConferenceId!} columns={columnsNoID} pageSize={5} checkboxSelection />
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

