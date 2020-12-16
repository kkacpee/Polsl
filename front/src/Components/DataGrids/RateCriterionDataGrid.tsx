import React from 'react'
import { DataGrid, ValueFormatterParams } from '@material-ui/data-grid';
import { useStyles } from './GridStyles';
import { RateCriterion } from '../../Types/RateTypes';
import EditRateCriterionDialog from '../../Screens/Rate/RateDialogs/EditRateCriterionDialog';
import DeleteRateCriterionDialog from '../../Screens/Rate/RateDialogs/DeleteRateCriterionDialog';

  interface GridProps {
      data: RateCriterion[],
      fetch: () => void,
  }

const RateCriterionDataGrid = ({data, fetch}:GridProps) => {
    const classes = useStyles();
        const columns = [
            { field: 'id', headerName: 'ID', width: 70 },
            { field: 'name', headerName: 'Name', flex: 1 },
            { field: 'rateCriterionTypeName', headerName: 'Criterion Type', flex: 1 },
            { field: 'id', headerName: 'Edit', width: 100,
            renderCell: (params: ValueFormatterParams) => {
                const data:RateCriterion = {
                    id: Number(params.row.id),
                    name: params.row.name,
                    rateCriterionTypeID: params.row.rateCriterionTypeID,
                    rateCriterionTypeName: params.row.rateCriterionTypeName
                }
                return(
                    <EditRateCriterionDialog dialogTitle="Edit point of interest" fetch={fetch} data={data}/>
                )}},
            { field: 'id', headerName: 'Delete', width: 80,
            renderCell: (params:ValueFormatterParams) => (
                <DeleteRateCriterionDialog fetch={fetch} id={Number(params.row.id)} />
            )}
          ];

        return (
            <div style={{ height: 400, width: '100%' }}>
            <DataGrid className={classes.root} rowsPerPageOptions={[5, 10, 20, 40]} disableSelectionOnClick
            autoHeight rows={data} columns={columns} pageSize={5} />
            </div> 
        )
}

export default RateCriterionDataGrid;

