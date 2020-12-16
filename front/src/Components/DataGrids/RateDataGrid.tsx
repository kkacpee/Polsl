import React from 'react'
import { DataGrid, ValueFormatterParams } from '@material-ui/data-grid';
import { useStyles } from './GridStyles';
import _ from 'lodash';
import { Rate } from '../../Types/RateTypes';
import EditRateDialog from '../../Screens/Rate/RateDialogs/EditRateDialog';
import DeleteRateDialog from '../../Screens/Rate/RateDialogs/DeleteRateDialog';

  interface GridProps {
      data: Rate[] | {id: number,
        description: string,
        value: number,
        mobileUserID: number,
        rateCriterionID: number}[],
      fetch: () => void,
      setSelection?: React.Dispatch<React.SetStateAction<(string | number)[] | undefined>>
  }

const RateDataGrid = ({data, fetch, setSelection}:GridProps) => {
    const classes = useStyles();

    if(_.isUndefined(setSelection)){
        const columns = [
            { field: 'id', headerName: 'ID', width: 70 },
            { field: 'mobileUserID', headerName: 'Mobile User ID', flex: 1 },
            { field: 'value', headerName: 'Value', flex: 1 },
            { field: 'rateCriterionName', headerName: 'Criterion', flex: 1 },
            { field: 'description', headerName: 'Description', flex: 1},
            { field: 'conferenceName', headerName: 'Conference', flex: 1 ,
            renderCell: (params: ValueFormatterParams) => (
                <>
                {(params.value !== null ? params.value : '-')}
                </>
            ) },
            { field: 'presentationName', headerName: 'Presentation', flex: 1,
            renderCell: (params: ValueFormatterParams) => (
                <>
                {(params.value !== null ? params.value : '-')}
                </>
            ) },
            { field: 'id', headerName: 'Edit', width: 100,
            renderCell: (params: ValueFormatterParams) => {
                const data:Rate = {
                    id: Number(params.row.id),
                    value: params.row.value,
                    mobileUserID: params.row.mobileUserID,
                    description: params.row.description,
                    rateCriterionID: params.row.rateCriterionID,
                    rateCriterionName: params.row.rateCriterionName,
                    conferenceID: params.row.conferenceID,
                    conferenceName: params.row.conferenceName,
                    presentationID: params.row.presentationID,
                    presentationName: params.row.presentationName,
                }
                return(
                    <EditRateDialog dialogTitle="Edit point of interest" fetch={fetch} data={data}/>
                )}},
            { field: 'id', headerName: 'Delete', width: 80,
            renderCell: (params:ValueFormatterParams) => (
                <DeleteRateDialog fetch={fetch} id={Number(params.row.id)} />
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
            { field: 'mobileUserID', headerName: 'Mobile User ID', flex: 1 },
            { field: 'value', headerName: 'Value', flex: 1 },
            { field: 'rateCriterionName', headerName: 'Criterion', flex: 1 },
            { field: 'description', headerName: 'Description', flex: 1},
            { field: 'id', headerName: 'Delete', width: 80,
            renderCell: (params:ValueFormatterParams) => (
                <DeleteRateDialog fetch={fetch} id={Number(params.row.id)} />
            )}
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

export default RateDataGrid;

