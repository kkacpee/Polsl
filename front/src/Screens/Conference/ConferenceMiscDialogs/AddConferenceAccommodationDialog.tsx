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
import { RowData } from '@material-ui/data-grid';
import { AddToConference } from '../../../Actions/ConferenceActions';
import { setAlert } from '../../../Actions/AlertActions';

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
    const [rows, setRows] = useState<RowData[]>();

  async function handleSubmit(){
    let array = Array<number>();
    rows?.forEach(element => {
        array.push(parseInt(element.id.toString(), 10))
    });

    await dispatch(AddToConference({conferenceID: id, arrayOfIDs: array}, "Accommodation"))
    dispatch(setAlert(true, "success", "Added accommodation to conference successfully"));
    setOpen(false);
    }

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };
    
    React.useEffect( () => {
        FetchData()
    }, []);

    const FetchData = () => {
        dispatch(GetAccommodationsForConferenceList(id))
    }

    const ShowData = () => {
        if (!_.isEmpty(accommodation.data)){
            return (
                <>
                    <AccommodationDataGrid data={accommodation.data} setSelection={setRows}/>
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