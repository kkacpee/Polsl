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
import { AddAccommodation } from '../../Actions/AccommodationActions';
import { AddAccommodationRequest } from '../../Types/AccommodationTypes';
import Add from '@material-ui/icons/Add';

interface DialogProps {
  dialogTitle: string,
  fetch: () => void
}

const initial:AddAccommodationRequest = {
    name: '',
    number: '',
    address: '',
    website: ''
}

const FormDialog = (props:DialogProps) => {
    const {dialogTitle, fetch} = props;
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState(initial.name);
  const [number, setNumber] = React.useState(initial.number);
  const [address, setAddress] = React.useState(initial.address);
  const [website, setWebsite] = React.useState(initial.website);

  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function handleSubmit(){
    const request:AddAccommodationRequest = {
        name: name,
        number: number,
        address: address,
        website: website
    }
    await dispatch(AddAccommodation(request));  
    dispatch(setAlert(true, "success", "Added conference successfully"));
    setOpen(false);
  }
  return (
    <div>
        <FloatingContainer>
        <FloatingButton
                tooltip="Add new accommodation"
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
            <TextField
            required
            fullWidth
            style={{ marginBottom: 8 }}
            id="address"
            label="Address"
            variant="outlined"
            value={address} 
            onChange={(e) => setAddress(e.target.value)}
            />
            <TextField
            required
            fullWidth
            style={{ marginBottom: 8 }}
            id="website"
            label="Website"
            variant="outlined"
            value={website} 
            onChange={(e) => setWebsite(e.target.value)}
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