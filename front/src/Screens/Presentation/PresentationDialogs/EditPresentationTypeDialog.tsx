import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useDispatch } from 'react-redux';
import { setAlert } from '../../../Actions/AlertActions';
import { PresentationType } from '../../../Types/PresentationTypes';
import { EditPresentationType } from '../../../Actions/PresentationActions';

interface DialogProps {
  dialogTitle: string,
  data: PresentationType,
  fetch: () => void
}

const EditPresentationTypeDialog = (props:DialogProps) => {
    const {dialogTitle, data, fetch} = props;
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState('');

  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setName(data.name);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function handleSubmit(){
    const request:PresentationType = {
        id: data.id,
        name: name
    }
    await dispatch(EditPresentationType(request));  
    dispatch(setAlert(true, "success", "Edited presentation type successfully"));
    setOpen(false);
  }
  return (
    <div>
        <Button
        onClick={handleClickOpen}> 
            Edit 
        </Button>
        <Dialog open={open} onClose={handleClose} onExit={fetch} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{dialogTitle}</DialogTitle>
        <form>
        <DialogContent>
            <TextField
            required
            fullWidth
            style={{ marginBottom: 8 }}
            id="name"
            label="Name"
            variant="outlined"
            value={name} 
            onChange={(e) => setName(e.target.value)}
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose} >
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

export default EditPresentationTypeDialog;