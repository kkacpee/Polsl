import React from 'react'
import { DataGrid, ValueFormatterParams } from '@material-ui/data-grid';
import { PointOfInterest } from '../../Types/PointOfInterestTypes';
import { useStyles } from './GridStyles';
import _ from 'lodash';
import EditPointOfInterestDialog from '../../Screens/PointOfInterest/PointOfInterestDialogs/EditPointOfInterestDialog';
import DeletePointOfInterestDialog from '../../Screens/PointOfInterest/PointOfInterestDialogs/DeletePointOfInterestDialog';
import { Rate } from '../../Types/RateTypes';

  interface GridProps {
      data: Rate[],
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
            // { field: 'id', headerName: 'Edit', width: 100,
            // renderCell: (params: ValueFormatterParams) => {
            //     const data:PointOfInterest = {
            //         id: Number(params.row.id),
            //         name: params.row.name,
            //         address: params.row.address,
            //         description: params.row.description,
            //         contact: params.row.contact,
            //         pointOfInterestTypeID: params.row.pointOfInterestTypeID,
            //         pointOfInterestTypeName: params.row.pointOfInterestTypeName
            //     }
            //     return(
            //         <EditPointOfInterestDialog dialogTitle="Edit point of interest" fetch={fetch} data={data}/>
            //     )}},
            // { field: 'id', headerName: 'Delete', width: 80,
            // renderCell: (params:ValueFormatterParams) => (
            //     <DeletePointOfInterestDialog fetch={fetch} id={Number(params.row.id)} />
            // )}
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
            { field: 'conferenceName', headerName: 'Conference', flex: 1 },
            { field: 'presentationName', headerName: 'Presentation', flex: 1,
            renderCell: (params: ValueFormatterParams) => (
                <>
                {(params.row.presentationID !== null ? params.value : '--')}
                </>
            ) },
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

