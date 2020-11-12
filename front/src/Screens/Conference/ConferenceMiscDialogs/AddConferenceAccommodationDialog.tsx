import React from 'react';
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
import { GetAccommodationList } from '../../../Actions/AccommodationActions';
import { CircularProgress} from '@material-ui/core';
import _ from 'lodash';

interface DialogProps {
  dialogTitle: string,
  fetch: () => void
}

const AddConferenceAccommodationDialog = (props:DialogProps) => {
    const {dialogTitle, fetch} = props;
    const [open, setOpen] = React.useState(false);
    const accommodation:AccommodationState = useSelector((state: RootState ) => state.Accommodation);
    const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function handleSubmit(){

    //await dispatch(AddConference(request));  
  //  dispatch(setAlert(true, "success", "Added conference successfully"));
  //  setOpen(false);
  }
    
    
    React.useEffect( () => {
        FetchData()
    }, []);

    const FetchData = () => {
        dispatch(GetAccommodationList())
    }

    const ShowData = () => {
        if (!_.isEmpty(accommodation.data)){
            return (
                <>
                    <AccommodationDataGrid data={accommodation.data} />
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
        <Button size="small" color="primary" onClick={handleClickOpen} >
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
            <Button onClick={handleClose} color="primary">
            Cancel
            </Button>
            <Button onClick={handleSubmit} color="primary">
            Submit
            </Button>
        </DialogActions>
        </form>
        </Dialog>
    </div>
    );
}

export default AddConferenceAccommodationDialog;