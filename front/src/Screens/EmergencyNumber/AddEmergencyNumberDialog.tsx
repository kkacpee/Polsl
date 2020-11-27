import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Container as FloatingContainer, Button as FloatingButton} from 'react-floating-action-button';
import { useDispatch } from 'react-redux';
import { setAlert } from '../../Actions/AlertActions';
import { AddEmergencyNumber } from '../../Actions/EmergencyNumberActions';
import { AddEmergencyNumberRequest } from '../../Types/EmergencyNumberTypes';
import { Add } from '@material-ui/icons';

interface DialogProps {
  dialogTitle: string,
  fetch: () => void
}

const initial:AddEmergencyNumberRequest = {
    name: '',
    number: ''
}

const FormDialog = (props:DialogProps) => {
    const {dialogTitle, fetch} = props;
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState(initial.name);
  const [number, setNumber] = React.useState(initial.number);

  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function handleSubmit(){
    const request:AddEmergencyNumberRequest = {
        name: name,
        number: number
    }
    await dispatch(AddEmergencyNumber(request));  
    dispatch(setAlert(true, "success", "Added conference successfully"));
    setOpen(false);
  }
  return (
    <div>
        <FloatingContainer>
        <FloatingButton
                tooltip="Add new emergency number"
                onClick={handleClickOpen}> <Add /> </FloatingButton>
        </FloatingContainer>
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
            <TextField
            required
            fullWidth
            style={{ marginBottom: 8 }}
            id="number"
            label="Number"
            variant="outlined"
            value={number} 
            onChange={(e) => setNumber(e.target.value)}
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

export default FormDialog;