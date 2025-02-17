import React from 'react'
import { DataGrid, ValueFormatterParams } from '@material-ui/data-grid';
import { useStyles } from './GridStyles';
import _ from 'lodash';
import { RateCriterionType } from '../../Types/RateTypes';

  interface GridProps {
      data: RateCriterionType[],
      fetch: () => void,
      setSelection?: React.Dispatch<React.SetStateAction<(string | number)[] | undefined>>
  }

  const options = {
    year: 'numeric', month: 'numeric', day: 'numeric',
    hour: 'numeric', minute: 'numeric', second: 'numeric',
    hour12: false,
    timeZone: 'America/Los_Angeles' 
  };


const MessageDataGrid = ({data, fetch, setSelection}:GridProps) => {
    const classes = useStyles();

    if(_.isUndefined(setSelection)){
        const columns = [
            { field: 'id', headerName: 'ID', width: 70 },
            { field: 'mobieUserID', headerName: 'Mobile User ID', flex: 1 },
            { field: 'sentDate', headerName: 'Sent Date', width: 160,
            renderCell: (params: ValueFormatterParams) => (
                <>
                {new Intl.DateTimeFormat('en-US', options).format(new Date(params.value as string))}
                </>
            ) },
            { field: 'content', headerName: 'Content', flex: 1 },
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
            { field: 'mobieUserID', headerName: 'Mobile User ID', flex: 1 },
            { field: 'sentDate', headerName: 'Sent Date', width: 160,
            renderCell: (params: ValueFormatterParams) => (
                <>
                {new Intl.DateTimeFormat('en-US', options).format(new Date(params.value as string))}
                </>
            ) },
            { field: 'content', headerName: 'Content', flex: 1 }
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

export default MessageDataGrid;

