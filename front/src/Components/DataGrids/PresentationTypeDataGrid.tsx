import React from 'react'
import { DataGrid, ValueFormatterParams } from '@material-ui/data-grid';
import { PresentationType } from '../../Types/PresentationTypes';
import { useStyles, CustomPagination } from './GridStyles';
import _ from 'lodash';
import EditPresentationTypeDialog from '../../Screens/Presentation/PresentationDialogs/EditPresentationTypeDialog';
import DeletePresentationTypeDialog from '../../Screens/Presentation/PresentationDialogs/DeletePresentationTypeDialog';

  interface GridProps {
      data: PresentationType[],
      fetch: () => void,
      setSelection?: React.Dispatch<React.SetStateAction<(string | number)[] | undefined>>
  }

const PresentationTypeDataGrid = ({data, fetch, setSelection}:GridProps) => {
    const classes = useStyles();
    if(_.isUndefined(setSelection)){
        const columns = [
            { field: 'id', headerName: 'ID', width: 70 },
            { field: 'name', headerName: 'Name', flex: 1 },
            { field: 'id', headerName: 'Edit', width: 100,
            renderCell: (params: ValueFormatterParams) => {
                const data:PresentationType = {
                    id:Number(params.row.id),
                    name: params.row.name
                }
                return(
                    <EditPresentationTypeDialog dialogTitle="Edit accommodation" fetch={fetch} data={data}/>
                )}},
            { field: 'id', headerName: 'Delete', width: 80,
            renderCell: (params:ValueFormatterParams) => (
                <DeletePresentationTypeDialog fetch={fetch} id={Number(params.row.id)} />
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
            { field: 'name', headerName: 'Name', flex: 1 }
          ];

        return (
            <div style={{ height: 400, width: '100%' }}>
            <DataGrid className={classes.root} components={{pagination: CustomPagination}} disableSelectionOnClick
            autoHeight rows={data} columns={columns} pageSize={5} checkboxSelection 
            onSelectionChange={(newSelection) => {setSelection(newSelection.rowIds);}}/>
            </div> 
        )
    }
}

export default PresentationTypeDataGrid;

