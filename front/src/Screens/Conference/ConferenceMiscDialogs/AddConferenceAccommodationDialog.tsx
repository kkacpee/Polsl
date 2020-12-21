import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useDispatch } from 'react-redux';
import AccommodationDataGrid from '../../../Components/DataGrids/AccommodationDataGrid';
import { AccommodationState } from '../../../Types/AccommodationTypes';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Reducers/rootReducer';
import { GetAccommodationsForConferenceList } from '../../../Actions/AccommodationActions';
import { CircularProgress} from '@material-ui/core';
import _ from 'lodash';
import { AddToConference } from '../../../Actions/ConferenceActions';

interface DialogProps {
  dialogTitle: string,
  id: number
  fetch: () => void
}

const AddConferenceAccommodationDialog = (props:DialogProps) => {
    const {dialogTitle, id, fetch} = props;
    const [open, setOpen] = React.useState(false);
    const accommodation:AccommodationState = useSelector((state: RootState ) => state.Accommodation);
    const dispatch = useDispatch();
    const [rows, setRows] = useState<(string | number)[] | undefined>();

  async function handleSubmit(){
    let array = Array<number>();
    rows?.forEach(element => {
        array.push(Number(element))
    });

    await dispatch(AddToConference({conferenceID: id, arrayOfIDs: array}, "Accommodation"))
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
        dispatch(GetAccommodationsForConferenceList(id))
    }

    const ShowData = () => {
        if (!_.isEmpty(accommodation.data)){
            return (
                <>
                    <AccommodationDataGrid data={accommodation.data} fetch={fetch} setSelection={setRows}/>
                </>
            )
        }
        if (accommodation.loading){
            return <CircularProgress />
        }

        if (accommodation.errorMsg !== ""){
            return <p>{accommodation.errorMsg}</p>
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

export default AddConferenceAccommodationDialog;