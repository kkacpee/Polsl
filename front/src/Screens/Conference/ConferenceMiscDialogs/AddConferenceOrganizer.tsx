import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useDispatch } from 'react-redux';
import OrganizerDataGrid from '../../../Components/DataGrids/OrganizerDataGrid';
import { OrganizerState } from '../../../Types/OrganizerTypes';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Reducers/rootReducer';
import { GetOrganizersForConferenceList } from '../../../Actions/OrganizerActions';
import { CircularProgress} from '@material-ui/core';
import _ from 'lodash';
import { RowData } from '@material-ui/data-grid';
import { AddToConference } from '../../../Actions/ConferenceActions';
import { setAlert } from '../../../Actions/AlertActions';

interface DialogProps {
  dialogTitle: string,
  id: number
  fetch: () => void
}

const AddConferenceOrganizerDialog = (props:DialogProps) => {
    const {dialogTitle, id, fetch} = props;
    const [open, setOpen] = React.useState(false);
    const Organizer:OrganizerState = useSelector((state: RootState ) => state.Organizer);
    const dispatch = useDispatch();
    const [rows, setRows] = useState<RowData[]>();

  async function handleSubmit(){
    let array = Array<number>();
    rows?.forEach(element => {
        array.push(parseInt(element.id.toString(), 10))
    });

    await dispatch(AddToConference({conferenceID: id, arrayOfIDs: array}, "Organizer"))
    dispatch(setAlert(true, "success", "Added Organizer to conference successfully"));
    setOpen(false);
    }

    const handleClickOpen = () => {
      FetchData();
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };
    
    const FetchData = () => {
        dispatch(GetOrganizersForConferenceList(id))
    }

    const ShowData = () => {
        if (!_.isEmpty(Organizer.data)){
            return (
                <>
                    <OrganizerDataGrid data={Organizer.data} setSelection={setRows}/>
                </>
            )
        }
        if (Organizer.loading){
            return <CircularProgress />
        }

        if (Organizer.errorMsg !== ""){
            return <p>{Organizer.errorMsg}</p>
        }
    }

  return (
    <div>
        <Button size="small" color="secondary" onClick={handleClickOpen} >
            Add
        </Button>
        <Dialog open={open} onClose={handleClose} onExit={fetch} 
        fullWidth={true} maxWidth='md' aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{dialogTitle}</DialogTitle>
        <form>
        <DialogContent>
           {ShowData()}
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>
            Cancel
            </Button>
            <Button onClick={handleSubmit} color="secondary">
            Submit
            </Button>
        </DialogActions>
        </form>
        </Dialog>
    </div>
    );
}

export default AddConferenceOrganizerDialog;