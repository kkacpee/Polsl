import React from 'react'
import { DataGrid, ValueFormatterParams } from '@material-ui/data-grid';
import { useStyles } from './GridStyles';
import _ from 'lodash';
import { RateCriterionType } from '../../Types/RateTypes';
import EditRateCriterionTypeDialog from '../../Screens/Rate/RateDialogs/EditRateCriterionTypeDialog';
import DeleteRateCriterionTypeDialog from '../../Screens/Rate/RateDialogs/DeleteRateCriterionType';

  interface GridProps {
      data: RateCriterionType[],
      fetch: () => void
  }

const RateCriterionTypeDataGrid = ({data, fetch}:GridProps) => {
    const classes = useStyles();

        const columns = [
            { field: 'id', headerName: 'ID', width: 70 },
            { field: 'name', headerName: 'Name', flex: 1 },
            { field: 'id', headerName: 'Edit', width: 100,
            renderCell: (params: ValueFormatterParams) => {
                const data:RateCriterionType = {
                    id: Number(params.row.id),
                    name: params.row.name
                }
                return(
                    <EditRateCriterionTypeDialog dialogTitle="Edit rate criterion type" fetch={fetch} data={data}/>
                )}},
            { field: 'id', headerName: 'Delete', width: 80,
            renderCell: (params:ValueFormatterParams) => (
                <DeleteRateCriterionTypeDialog fetch={fetch} id={Number(params.row.id)} />
            )}
          ];

        return (
            <div style={{ height: 400, width: '100%' }}>
            <DataGrid className={classes.root} rowsPerPageOptions={[5, 10, 20, 40]} disableSelectionOnClick
            autoHeight rows={data} columns={columns} pageSize={5} />
            </div> 
        )
}

export default RateCriterionTypeDataGrid;

