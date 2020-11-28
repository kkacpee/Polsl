import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useDispatch } from 'react-redux';
import ParticipantDataGrid from '../../../Components/DataGrids/ParticipantDataGrid';
import { ParticipantState } from '../../../Types/ParticipantTypes';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Reducers/rootReducer';
import { GetParticipantsForPresentationList } from '../../../Actions/ParticipantActions';
import { CircularProgress} from '@material-ui/core';
import _ from 'lodash';
import { RowData } from '@material-ui/data-grid';
import { AddToPresentation } from '../../../Actions/PresentationActions';
import { setAlert } from '../../../Actions/AlertActions';

interface DialogProps {
  dialogTitle: string,
  id: number
  fetch: () => void
}

const AddPresentationParticipantDialog = (props:DialogProps) => {
    const {dialogTitle, id, fetch} = props;
    const [open, setOpen] = React.useState(false);
    const Participant:ParticipantState = useSelector((state: RootState ) => state.Participant);
    const dispatch = useDispatch();
    const [rows, setRows] = useState<(string | number)[] | undefined>();

    async function handleSubmit(){
    let array = Array<number>();
    rows?.forEach(element => {
        array.push(Number(element))
    });

    await dispatch(AddToPresentation({presentationID: id, arrayOfIDs: array}, "Participant"))
    dispatch(setAlert(true, "success", "Added Participant to Presentation successfully"));
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
        dispatch(GetParticipantsForPresentationList(id))
    }

    const ShowData = () => {
        if (!_.isEmpty(Participant.data)){
            return (
                <>
                    <ParticipantDataGrid data={Participant.data} fetch={fetch} setSelection={setRows}/>
                </>
            )
        }
        if (Participant.loading){
            return <CircularProgress />
        }

        if (Participant.errorMsg !== ""){
            return <p>{Participant.errorMsg}</p>
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

export default AddPresentationParticipantDialog;