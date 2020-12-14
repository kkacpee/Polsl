import React from 'react'
import { DataGrid, ValueFormatterParams } from '@material-ui/data-grid';
import { PointOfInterestIcon, PointOfInterestType } from '../../Types/PointOfInterestTypes';
import { useStyles, CustomPagination } from './GridStyles';
import _ from 'lodash';
import { Box } from '@material-ui/core';
import EditPointOfInterestTypeDialog from '../../Screens/PointOfInterest/PointOfInterestDialogs/EditPoinOfInterestTypeDialog';
import { DeletePointOfInterestType } from '../../Actions/PointOfInterestActions';
import DeletePointOfInterestTypeDialog from '../../Screens/PointOfInterest/PointOfInterestDialogs/DeletePointOfInterestTypeDialog';



  interface GridProps {
      data: PointOfInterestType[],
      icons: PointOfInterestIcon[],
      setSelection?: React.Dispatch<React.SetStateAction<(string | number)[] | undefined>>,
      fetch: () => void
  }

const PointOfInterestTypeDataGrid = ({data, icons, fetch, setSelection}:GridProps) => {
    const classes = useStyles();



    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Name', flex: 1 },
        { field: 'pointOfInterestIconID', headerName: 'Image', width: 100,  renderCell: (params: ValueFormatterParams) => (
            <Box>
                <img src={`${process.env.REACT_APP_SERVER_RESOURCE_URI as string}${icons.find(x => x.id == params.value)?.path}`} style={{maxWidth:'100%', maxHeight:'100%', marginTop: 10}}/>
            </Box>
            )},
            { field: 'id', headerName: 'Edit', width: 100,
            renderCell: (params: ValueFormatterParams) => {
                const data:PointOfInterestType = {
                    id: Number(params.row.id),
                    name: params.row.name,
                    pointOfInterestIconID: params.row.pointOfInterestIconID
                }
                return(
                    <EditPointOfInterestTypeDialog dialogTitle="Edit point of interest" fetch={fetch} data={data}/>
                )}},
            { field: 'id', headerName: 'Delete', width: 80,
            renderCell: (params:ValueFormatterParams) => (
                <DeletePointOfInterestTypeDialog fetch={fetch} id={Number(params.row.id)} />
            )}
      ];

    if(_.isUndefined(setSelection)){
        return (
            <div style={{ height: 400, width: '100%' }}>
            <DataGrid className={classes.root} rowsPerPageOptions={[5, 10, 20, 40]} disableSelectionOnClick
            autoHeight rows={data} columns={columns} pageSize={5} rowHeight={80}/>
            </div> 
        )
    }
    else{
        return (
            <div style={{ height: 400, width: '100%' }}>
            <DataGrid className={classes.root} rowsPerPageOptions={[5, 10, 20, 40]} disableSelectionOnClick
            autoHeight rows={data} columns={columns} pageSize={5} checkboxSelection 
            onSelectionChange={(newSelection) => {setSelection(newSelection.rowIds);}}/>
            </div> 
        )
    }
}

export default PointOfInterestTypeDataGrid;

